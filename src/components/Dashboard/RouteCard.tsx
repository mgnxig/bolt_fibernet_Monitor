import React from 'react';
import { Route } from '../../types';
import { MapPin, Calendar, Zap, Signal, AlertCircle, TrendingUp, BarChart3, Building2, Boxes, Link as JCIcon } from 'lucide-react';

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
    if (loss <= 15) return 'text-green-600';
    if (loss <= 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getLossStatus = (loss: number) => {
    if (loss <= 15) return 'Good';
    if (loss <= 25) return 'Acceptable';
    return 'High';
  };

  const totalLength = route.links.reduce((sum, link) => sum + link.length, 0);
  const totalLoss = route.links.reduce((sum, link) => sum + link.totalLoss, 0);
  
  // Mock data for tickets this week vs last week
  const ticketsThisWeek = Math.floor(route.troubleTickets * 0.6); // 60% of total tickets are from this week
  const ticketsLastWeek = route.troubleTickets - ticketsThisWeek;
  
  // Mock Average SLA in hours (based on route status)
  const averageSLAHours = route.status === 'operational' ? 2.1 :
                         route.status === 'warning' ? 4.8 :
                         route.status === 'maintenance' ? 8.5 :
                         15.2; // critical

  const getSLAColor = (hours: number) => {
    if (hours <= 4) return 'text-green-600';
    if (hours <= 8) return 'text-yellow-600';
    if (hours <= 12) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300"
    >
      {/* Header with Route Name and Status */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{route.name}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(route.status)}`}>
          {getStatusText(route.status)}
        </span>
      </div>

      {/* Start - End Location */}
      <div className="flex items-center justify-between mb-3 p-2 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">{route.location.start}</span>
        </div>
        <span className="text-gray-400">→</span>
        <span className="text-sm text-gray-600">{route.location.end}</span>
      </div>

      {/* Assets Detail */}
      <div className="mb-3">
        <h4 className="text-xs font-medium text-gray-500 mb-2">Assets</h4>
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center p-2 bg-blue-50 rounded">
            <Building2 className="h-4 w-4 text-blue-600 mx-auto mb-1" />
            <p className="text-xs text-blue-600 font-medium">HH</p>
            <p className="text-sm font-bold text-blue-700">{route.assets.handhole}</p>
          </div>
          <div className="text-center p-2 bg-green-50 rounded">
            <Boxes className="h-4 w-4 text-green-600 mx-auto mb-1" />
            <p className="text-xs text-green-600 font-medium">ODC</p>
            <p className="text-sm font-bold text-green-700">{route.assets.odc}</p>
          </div>
          <div className="text-center p-2 bg-orange-50 rounded">
            <Zap className="h-4 w-4 text-orange-600 mx-auto mb-1" />
            <p className="text-xs text-orange-600 font-medium">Pole</p>
            <p className="text-sm font-bold text-orange-700">{route.assets.pole}</p>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded">
            <JCIcon className="h-4 w-4 text-purple-600 mx-auto mb-1" />
            <p className="text-xs text-purple-600 font-medium">JC</p>
            <p className="text-sm font-bold text-purple-700">{route.assets.jc}</p>
          </div>
        </div>
      </div>

      {/* Links Detail */}
      <div className="mb-3">
        <h4 className="text-xs font-medium text-gray-500 mb-2">Links ({route.links.length})</h4>
        <div className="space-y-1">
          {route.links.map((link) => (
            <div key={link.id} className="flex items-center justify-between text-xs bg-gray-50 rounded p-2">
              <span className="font-medium text-gray-700">{link.name}</span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">{link.length}km</span>
                <span className={`font-medium ${getLossColor(link.totalLoss)}`}>
                  {link.totalLoss}dB
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Total Loss */}
        <div className="text-center p-2 bg-gray-50 rounded">
          <div className="flex items-center justify-center mb-1">
            <Signal className={`h-4 w-4 ${getLossColor(totalLoss)}`} />
          </div>
          <p className="text-xs text-gray-600 font-medium">Total Loss</p>
          <p className={`text-sm font-bold ${getLossColor(totalLoss)}`}>
            {totalLoss.toFixed(1)} dB
          </p>
          <span className={`text-xs px-1 py-0.5 rounded ${
            totalLoss <= 15 ? 'bg-green-100 text-green-700' :
            totalLoss <= 25 ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {getLossStatus(totalLoss)}
          </span>
        </div>

        {/* Average SLA */}
        <div className="text-center p-2 bg-green-50 rounded">
          <div className="flex items-center justify-center mb-1">
            <TrendingUp className={`h-4 w-4 ${getSLAColor(averageSLAHours)}`} />
          </div>
          <p className="text-xs text-green-600 font-medium">Avg SLA</p>
          <p className={`text-sm font-bold ${getSLAColor(averageSLAHours)}`}>
            {averageSLAHours.toFixed(1)}h
          </p>
          <span className={`text-xs px-1 py-0.5 rounded ${
            averageSLAHours <= 4 ? 'bg-green-100 text-green-700' :
            averageSLAHours <= 8 ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {averageSLAHours <= 4 ? 'Good' : averageSLAHours <= 8 ? 'Fair' : 'Poor'}
          </span>
        </div>
      </div>

      {/* Trouble Tickets - Split */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Last Week Tickets */}
        <div className="text-center p-2 bg-blue-50 rounded">
          <div className="flex items-center justify-center mb-1">
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </div>
          <p className="text-xs text-blue-600 font-medium">Last Week</p>
          <p className="text-sm font-bold text-blue-700">{ticketsLastWeek}</p>
          <p className="text-xs text-blue-500">tickets</p>
        </div>

        {/* This Week Tickets */}
        <div className="text-center p-2 bg-orange-50 rounded">
          <div className="flex items-center justify-center mb-1">
            <AlertCircle className={`h-4 w-4 ${getTroubleTicketColor(ticketsThisWeek)}`} />
          </div>
          <p className="text-xs text-orange-600 font-medium">This Week</p>
          <p className={`text-sm font-bold ${getTroubleTicketColor(ticketsThisWeek)}`}>
            {ticketsThisWeek}
          </p>
          <p className="text-xs text-orange-500">tickets</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-2 gap-3 text-xs border-t border-gray-100 pt-2">
        <div className="text-center">
          <p className="text-gray-500">Length</p>
          <p className="font-medium text-gray-900">{totalLength.toFixed(1)} km</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">Fibers</p>
          <p className="font-medium text-gray-900">{route.fiberCount}</p>
        </div>
      </div>

      {/* Next Maintenance */}
      <div className="border-t border-gray-100 pt-2 mt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-500">
              Next: {new Date(route.nextMaintenance).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}