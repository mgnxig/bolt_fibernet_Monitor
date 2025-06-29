import React from 'react';
import { Route, Alert, SLAData, SLATarget } from '../../types';
import RouteCard from './RouteCard';
import StatsOverview from './StatsOverview';
import SLAChart from './SLAChart';
import SLAKanban from './SLAKanban';

interface DashboardProps {
  routes: Route[];
  alerts: Alert[];
  slaData: SLAData[];
  slaTargets: SLATarget[];
  onRouteSelect: (route: Route) => void;
}

export default function Dashboard({ routes, alerts, slaData, slaTargets, onRouteSelect }: DashboardProps) {
  const operationalRoutes = routes.filter(r => r.status === 'operational').length;
  const criticalRoutes = routes.filter(r => r.status === 'critical').length;
  const maintenanceRoutes = routes.filter(r => r.status === 'maintenance').length;
  const totalTroubleTickets = routes.reduce((sum, route) => sum + route.troubleTickets, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Network Overview</h2>
        <p className="text-sm sm:text-base text-gray-600">Monitor the health and status of all fiber optic routes</p>
      </div>

      {/* SLA Monitoring Section */}
      <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
        <SLAChart data={slaData} />
        <SLAKanban targets={slaTargets} />
      </div>

      <StatsOverview
        totalRoutes={routes.length}
        operationalRoutes={operationalRoutes}
        criticalRoutes={criticalRoutes}
        maintenanceRoutes={maintenanceRoutes}
        totalTroubleTickets={totalTroubleTickets}
      />

      {/* Route Status Grid - 3 Cards Per Row */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Route Status</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {routes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              onClick={() => onRouteSelect(route)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}