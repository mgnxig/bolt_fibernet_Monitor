import React from 'react';
import { CheckCircle, AlertCircle, PenTool as Tool, Ticket } from 'lucide-react';

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
  const stats = [
    {
      name: 'Operational Routes',
      value: operationalRoutes,
      total: totalRoutes,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
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
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.name}
            className={`bg-white rounded-xl border p-6 ${stat.borderColor} ${stat.bgColor}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}{stat.suffix || ''}
                  {stat.total && (
                    <span className="text-lg font-medium text-gray-400">
                      /{stat.total}
                    </span>
                  )}
                </p>
              </div>
              <Icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}