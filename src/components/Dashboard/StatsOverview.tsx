import React from 'react';
import { CheckCircle, AlertCircle, PenTool as Tool, Ticket, Package, Cable } from 'lucide-react';

interface StatsOverviewProps {
  totalRoutes: number;
  operationalRoutes: number;
  criticalRoutes: number;
  maintenanceRoutes: number;
  totalTroubleTickets: number;
}

export default function StatsOverview({
  totalRoutes,
  operationalRoutes,
  criticalRoutes,
  maintenanceRoutes,
  totalTroubleTickets
}: StatsOverviewProps) {
  // Mock data for closure and cable usage
  const totalClosuresUsed = 245; // Total closures used for trouble tickets
  const totalCableUsed = 1850; // Total cable length in meters used for trouble tickets

  const stats = [
    {
      name: 'Closure Usage',
      value: totalClosuresUsed,
      suffix: ' units',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'Total closures used for trouble tickets'
    },
    {
      name: 'Cable Usage',
      value: totalCableUsed,
      suffix: ' m',
      icon: Cable,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      description: 'Total cable length used for trouble tickets'
    },
    {
      name: 'Critical Issues',
      value: criticalRoutes,
      total: totalRoutes,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      name: 'Under Maintenance',
      value: maintenanceRoutes,
      total: totalRoutes,
      icon: Tool,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      name: 'Open Tickets',
      value: totalTroubleTickets,
      suffix: '',
      icon: Ticket,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.name}
            className={`bg-white rounded-lg border p-3 sm:p-4 ${stat.borderColor} ${stat.bgColor}`}
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate" title={stat.description || stat.name}>
                  {stat.name}
                </p>
                <p className={`text-lg sm:text-xl font-bold ${stat.color} truncate`}>
                  {stat.value}{stat.suffix || ''}
                  {stat.total && (
                    <span className="text-sm sm:text-base font-medium text-gray-400">
                      /{stat.total}
                    </span>
                  )}
                </p>
              </div>
              <Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${stat.color} flex-shrink-0 ml-2`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}