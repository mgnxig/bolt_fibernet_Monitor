import React from 'react';
import { Route } from '../../types';
import { MapPin, Calendar, Zap, Signal, AlertCircle, TrendingUp, BarChart3 } from 'lucide-react';

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
  const totalAssets = route.assets.handhole + route.assets.odc + route.assets.pole + route.assets.jc;
  
  // Mock data for tickets this week vs last week
  const ticketsThisWeek = Math.floor(route.troubleTickets * 0.6); // 60% of total tickets are from this week
  const ticketsLastWeek = route.troubleTickets - ticketsThisWeek;
  
  // Mock SLA percentage (based on route status)
  const averageSLA = route.status === 'operational' ? 99.2 :
                    route.status === 'warning' ? 97.8 :
                    route.status === 'maintenance' ? 95.5 :
                    92.1; // critical

  const getSLAColor = (sla: number) => {
    if (sla >= 99) return 'text-green-600';
    if (sla >= 97) return 'text-yellow-600';
    if (sla >= 95) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300"
    >
      {/* Header with Route Name and Status */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{route.name}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(route.status)}`}>
          {getStatusText(route.status)}
        </span>
      </div>

      {/* Start - End Location */}
      <div className="flex items-center justify-between mb-4 p-2 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">{route.location.start}</span>
        </div>
        <span className="text-gray-400">→</span>
        <span className="text-sm text-gray-600">{route.location.end}</span>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Total Assets */}
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </div>
          <p className="text-xs text-blue-600 font-medium">Total Assets</p>
          <p className="text-lg font-bold text-blue-700">{totalAssets}</p>
        </div>

        {/* Total Loss */}
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <Signal className={`h-4 w-4 ${getLossColor(totalLoss)}`} />
          </div>
          <p className="text-xs text-gray-600 font-medium">Total Loss</p>
          <div className="flex items-center justify-center space-x-1">
            <p className={`text-lg font-bold ${getLossColor(totalLoss)}`}>
              {totalLoss.toFixed(1)} dB
            </p>
          </div>
          <span className={`text-xs px-1 py-0.5 rounded ${
            totalLoss <= 15 ? 'bg-green-100 text-green-700' :
            totalLoss <= 25 ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {getLossStatus(totalLoss)}
          </span>
        </div>

        {/* Average SLA */}
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <TrendingUp className={`h-4 w-4 ${getSLAColor(averageSLA)}`} />
          </div>
          <p className="text-xs text-green-600 font-medium">Average SLA</p>
          <p className={`text-lg font-bold ${getSLAColor(averageSLA)}`}>
            {averageSLA.toFixed(1)}%
          </p>
        </div>

        {/* Trouble Tickets Comparison */}
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <AlertCircle className={`h-4 w-4 ${getTroubleTicketColor(route.troubleTickets)}`} />
          </div>
          <p className="text-xs text-orange-600 font-medium">Tickets</p>
          <div className="flex items-center justify-center space-x-1">
            <span className="text-sm text-gray-500">{ticketsLastWeek}</span>
            <span className="text-xs text-gray-400">→</span>
            <span className={`text-lg font-bold ${getTroubleTicketColor(ticketsThisWeek)}`}>
              {ticketsThisWeek}
            </span>
          </div>
          <p className="text-xs text-gray-500">Last → This Week</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-3 gap-3 text-sm border-t border-gray-100 pt-3">
        <div className="text-center">
          <p className="text-gray-500">Links</p>
          <p className="font-medium text-gray-900">{route.links.length}</p>
        </div>
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
      <div className="border-t border-gray-100 pt-3 mt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-500">
              Next Maintenance: {new Date(route.nextMaintenance).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}