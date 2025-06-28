import React from 'react';
import { Route } from '../../types';
import { MapPin, Calendar, Zap, Link, Signal, AlertCircle } from 'lucide-react';

interface RouteCardProps {
  route: Route;
  onClick: () => void;
}

export default function RouteCard({ route, onClick }: RouteCardProps) {
  const getStatusColor = (status: Route['status']) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'maintenance':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: Route['status']) => {
    switch (status) {
      case 'operational':
        return 'Operational';
      case 'warning':
        return 'Warning';
      case 'maintenance':
        return 'Under Maintenance';
      case 'critical':
        return 'Critical Issue';
      default:
        return 'Unknown';
    }
  };

  const getTroubleTicketColor = (count: number) => {
    if (count === 0) return 'text-green-600';
    if (count <= 3) return 'text-yellow-600';
    if (count <= 7) return 'text-orange-600';
    return 'text-red-600';
  };

  const getLossColor = (loss: number) => {
    if (loss <= 3) return 'text-green-600';
    if (loss <= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getLossStatus = (loss: number) => {
    if (loss <= 3) return 'Good';
    if (loss <= 5) return 'Acceptable';
    return 'High';
  };

  const totalLength = route.links.reduce((sum, link) => sum + link.length, 0);
  const averageLoss = route.links.reduce((sum, link) => sum + link.totalLoss, 0) / route.links.length;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{route.name}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(route.status)}`}>
          {getStatusText(route.status)}
        </span>
      </div>

      {/* Links Summary */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Link className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">
              {route.links.length} Link{route.links.length > 1 ? 's' : ''}
            </span>
          </div>
          <span className="text-xs text-gray-500">Total: {totalLength.toFixed(1)} km</span>
        </div>
        <div className="space-y-1">
          {route.links.map((link) => (
            <div key={link.id} className="flex items-center justify-between text-xs">
              <span className="text-gray-600">{link.name}</span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">{link.length} km</span>
                <span className={`font-medium ${getLossColor(link.totalLoss)}`}>
                  {link.totalLoss} dB
                </span>
                <span className={`px-1 py-0.5 rounded text-xs ${
                  link.status === 'operational' ? 'bg-green-100 text-green-700' :
                  link.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                  link.status === 'critical' ? 'bg-red-100 text-red-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {link.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className={`h-4 w-4 ${getTroubleTicketColor(route.troubleTickets)}`} />
          <div>
            <p className="text-xs text-gray-500">Trouble Tickets</p>
            <p className={`text-sm font-medium ${getTroubleTicketColor(route.troubleTickets)}`}>
              {route.troubleTickets} Open
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Fiber Count</p>
            <p className="text-sm font-medium text-gray-900">{route.fiberCount}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Signal className={`h-4 w-4 ${getLossColor(averageLoss)}`} />
          <div>
            <p className="text-xs text-gray-500">Avg Loss</p>
            <div className="flex items-center space-x-1">
              <p className={`text-sm font-medium ${getLossColor(averageLoss)}`}>
                {averageLoss.toFixed(1)} dB
              </p>
              <span className={`text-xs px-1 py-0.5 rounded ${
                averageLoss <= 3 ? 'bg-green-100 text-green-700' :
                averageLoss <= 5 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {getLossStatus(averageLoss)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Next Maintenance</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(route.nextMaintenance).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-3">
        <div className="flex justify-between text-xs text-gray-500">
          <span>{route.location.start}</span>
          <span>→</span>
          <span>{route.location.end}</span>
        </div>
      </div>
    </div>
  );
}