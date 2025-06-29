import React, { useState } from 'react';
import { TroubleTicket, Route, MaterialUsage } from '../../types';
import { 
  Calendar, Clock, User, MapPin, AlertTriangle, 
  CheckCircle, PlayCircle, XCircle, Eye, Filter,
  Search, Package, Cable, Wrench, Image, 
  DollarSign, FileText, ChevronDown, ChevronRight
} from 'lucide-react';
import TroubleTicketDetail from './TroubleTicketDetail';

interface TroubleTicketManagementProps {
  tickets: TroubleTicket[];
  routes: Route[];
  onUpdateTicket: (ticketId: string, updates: Partial<TroubleTicket>) => void;
}

export default function TroubleTicketManagement({ 
  tickets, 
  routes, 
  onUpdateTicket 
}: TroubleTicketManagementProps) {
  const [selectedTicket, setSelectedTicket] = useState<TroubleTicket | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [routeFilter, setRouteFilter] = useState<string>('all');
  const [expandedRoutes, setExpandedRoutes] = useState<Set<string>>(new Set());

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return AlertTriangle;
      case 'in-progress': return PlayCircle;
      case 'resolved': return CheckCircle;
      case 'closed': return XCircle;
      default: return AlertTriangle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'in-progress': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'resolved': return 'text-green-600 bg-green-50 border-green-200';
      case 'closed': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-700 bg-green-100';
      case 'medium': return 'text-yellow-700 bg-yellow-100';
      case 'high': return 'text-orange-700 bg-orange-100';
      case 'critical': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getRepairTypeColor = (repairType: string) => {
    return repairType === 'permanent' 
      ? 'text-green-700 bg-green-100' 
      : 'text-orange-700 bg-orange-100';
  };

  const getRouteName = (routeId: string) => {
    const route = routes.find(r => r.id === routeId);
    return route ? route.name : 'Unknown Route';
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const calculateMaterialCost = (materials: MaterialUsage[]) => {
    return materials.reduce((total, material) => total + material.totalCost, 0);
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = searchTerm === '' || 
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesRoute = routeFilter === 'all' || ticket.routeId === routeFilter;
    
    return matchesSearch && matchesStatus && matchesRoute;
  });

  // Group tickets by route
  const ticketsByRoute = filteredTickets.reduce((acc, ticket) => {
    const routeId = ticket.routeId;
    if (!acc[routeId]) {
      acc[routeId] = [];
    }
    acc[routeId].push(ticket);
    return acc;
  }, {} as Record<string, TroubleTicket[]>);

  const toggleRouteExpansion = (routeId: string) => {
    const newExpanded = new Set(expandedRoutes);
    if (newExpanded.has(routeId)) {
      newExpanded.delete(routeId);
    } else {
      newExpanded.add(routeId);
    }
    setExpandedRoutes(newExpanded);
  };

  if (selectedTicket) {
    return (
      <TroubleTicketDetail 
        ticket={selectedTicket} 
        routes={routes.map(r => ({ id: r.id, name: r.name }))}
        onBack={() => setSelectedTicket(null)}
        onUpdate={onUpdateTicket}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Trouble Ticket Management</h2>
            <p className="text-gray-600">Detailed tracking of network issues and material usage</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Tickets</p>
            <p className="text-2xl font-bold text-gray-900">{filteredTickets.length}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <select
            value={routeFilter}
            onChange={(e) => setRouteFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Routes</option>
            {routes.map((route) => (
              <option key={route.id} value={route.id}>{route.name}</option>
            ))}
          </select>

          <div className="ml-auto text-sm text-gray-500">
            {filteredTickets.length} of {tickets.length} tickets
          </div>
        </div>
      </div>

      {/* Tickets Grouped by Route */}
      <div className="space-y-6">
        {Object.entries(ticketsByRoute).map(([routeId, routeTickets]) => {
          const isExpanded = expandedRoutes.has(routeId);
          const routeName = getRouteName(routeId);
          const totalMaterialCost = routeTickets.reduce((total, ticket) => 
            total + calculateMaterialCost(ticket.materialUsage), 0
          );

          return (
            <div key={routeId} className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Route Header */}
              <div 
                className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleRouteExpansion(routeId)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                    <h3 className="text-lg font-semibold text-gray-900">{routeName}</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {routeTickets.length} tickets
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">
                        Total Cost: Rp {totalMaterialCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Route Tickets */}
              {isExpanded && (
                <div className="divide-y divide-gray-100">
                  {routeTickets.map((ticket) => {
                    const StatusIcon = getStatusIcon(ticket.status);
                    const statusColor = getStatusColor(ticket.status);
                    const priorityColor = getPriorityColor(ticket.priority);
                    const repairTypeColor = getRepairTypeColor(ticket.repairType);
                    const materialCost = calculateMaterialCost(ticket.materialUsage);

                    return (
                      <div key={ticket.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-lg font-medium text-gray-900">{ticket.title}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColor}`}>
                                {ticket.priority}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${repairTypeColor}`}>
                                {ticket.repairType}
                              </span>
                            </div>

                            <p className="text-gray-600 mb-3">{ticket.description}</p>

                            {/* Ticket Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center space-x-2 mb-1">
                                  <FileText className="h-4 w-4 text-gray-400" />
                                  <span className="text-xs font-medium text-gray-700">Ticket Info</span>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{ticket.ticketNumber}</p>
                                <p className="text-xs text-gray-600">
                                  Created: {new Date(ticket.createdAt).toLocaleDateString()}
                                </p>
                                {ticket.resolvedAt && (
                                  <p className="text-xs text-gray-600">
                                    Resolved: {new Date(ticket.resolvedAt).toLocaleDateString()}
                                  </p>
                                )}
                              </div>

                              <div className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center space-x-2 mb-1">
                                  <Clock className="h-4 w-4 text-gray-400" />
                                  <span className="text-xs font-medium text-gray-700">Duration & Cores</span>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                  {formatDuration(ticket.totalDuration)}
                                </p>
                                <p className="text-xs text-gray-600">
                                  Cores Spliced: {ticket.coresSpliced}
                                </p>
                              </div>

                              <div className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center space-x-2 mb-1">
                                  <MapPin className="h-4 w-4 text-gray-400" />
                                  <span className="text-xs font-medium text-gray-700">Location</span>
                                </div>
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {ticket.location.address}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {ticket.problemCoordinates.latitude.toFixed(4)}, {ticket.problemCoordinates.longitude.toFixed(4)}
                                </p>
                              </div>

                              <div className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center space-x-2 mb-1">
                                  <Package className="h-4 w-4 text-gray-400" />
                                  <span className="text-xs font-medium text-gray-700">Materials & Photos</span>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                  Rp {materialCost.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {ticket.materialUsage.length} items, {ticket.photos.length} photos
                                </p>
                              </div>
                            </div>

                            {/* Root Cause & Traffic Impact */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <h5 className="text-sm font-medium text-gray-700 mb-1">Root Cause</h5>
                                <p className="text-sm text-gray-900 bg-red-50 p-2 rounded">
                                  {ticket.rootCause}
                                </p>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-gray-700 mb-1">Traffic Impacted</h5>
                                <p className="text-sm text-gray-900 bg-orange-50 p-2 rounded">
                                  {ticket.trafficImpacted}
                                </p>
                              </div>
                            </div>

                            {/* Photos Preview */}
                            {ticket.photos.length > 0 && (
                              <div className="mb-4">
                                <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                  <Image className="h-4 w-4 mr-1" />
                                  Photos ({ticket.photos.length})
                                </h5>
                                <div className="flex space-x-2 overflow-x-auto">
                                  {ticket.photos.slice(0, 4).map((photo) => (
                                    <div key={photo.id} className="flex-shrink-0">
                                      <img
                                        src={photo.url}
                                        alt={photo.caption}
                                        className="w-16 h-16 object-cover rounded border border-gray-200"
                                      />
                                    </div>
                                  ))}
                                  {ticket.photos.length > 4 && (
                                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                                      <span className="text-xs text-gray-600">+{ticket.photos.length - 4}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="ml-4 flex flex-col items-end space-y-2">
                            <div className={`px-3 py-1 rounded-full border flex items-center space-x-1 ${statusColor}`}>
                              <StatusIcon className="h-4 w-4" />
                              <span className="text-sm font-medium capitalize">
                                {ticket.status.replace('-', ' ')}
                              </span>
                            </div>
                            
                            <button
                              onClick={() => setSelectedTicket(ticket)}
                              className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                              <span>View Details</span>
                            </button>
                          </div>
                        </div>

                        {/* Material Usage Table */}
                        {ticket.materialUsage.length > 0 && (
                          <div className="mt-4 border-t border-gray-100 pt-4">
                            <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                              <Package className="h-4 w-4 mr-1" />
                              Material Usage
                            </h5>
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Material
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Quantity
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Unit Cost
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Total Cost
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Supplier
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {ticket.materialUsage.map((material) => (
                                    <tr key={material.id} className="hover:bg-gray-50">
                                      <td className="px-3 py-2 whitespace-nowrap">
                                        <div>
                                          <div className="text-sm font-medium text-gray-900">
                                            {material.materialName}
                                          </div>
                                          <div className="text-xs text-gray-500">
                                            {material.partNumber}
                                          </div>
                                        </div>
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                        {material.quantity} {material.unit}
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                        Rp {material.unitCost.toLocaleString()}
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Rp {material.totalCost.toLocaleString()}
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                        {material.supplier}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot className="bg-gray-50">
                                  <tr>
                                    <td colSpan={3} className="px-3 py-2 text-sm font-medium text-gray-900 text-right">
                                      Total Material Cost:
                                    </td>
                                    <td className="px-3 py-2 text-sm font-bold text-gray-900">
                                      Rp {materialCost.toLocaleString()}
                                    </td>
                                    <td></td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredTickets.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No trouble tickets found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}