import React, { useState } from 'react';
import { Route } from '../../types';
import { 
  Plus, Edit3, Save, X, Trash2, Search, Filter,
  Signal, Activity, MapPin, Clock, AlertTriangle,
  CheckCircle, XCircle, Settings, ArrowRight,
  Download, Upload, RefreshCw, Eye, BarChart3
} from 'lucide-react';

interface TrafficData {
  id: string;
  routeId: string;
  trafficName: string;
  rsl: number;
  otdrDistance: number;
  portNumber: string;
  sourceRoute: string;
  destinationRoute: string;
  status: 'active' | 'inactive' | 'maintenance' | 'error';
  bandwidth: string;
  protocol: string;
  lastUpdate: string;
}

interface TrafficTableProps {
  route: Route;
  trafficData: TrafficData[];
  allRoutes: Route[];
  onTrafficUpdate: (updatedTraffic: TrafficData[]) => void;
}

export default function TrafficTable({ 
  route, 
  trafficData, 
  allRoutes, 
  onTrafficUpdate 
}: TrafficTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTraffic, setNewTraffic] = useState<Partial<TrafficData> | null>(null);
  const [editingData, setEditingData] = useState<TrafficData | null>(null);
  const [selectedTraffic, setSelectedTraffic] = useState<TrafficData | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'inactive': return XCircle;
      case 'maintenance': return Settings;
      case 'error': return AlertTriangle;
      default: return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'inactive': return 'text-gray-600 bg-gray-50';
      case 'maintenance': return 'text-blue-600 bg-blue-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRSLColor = (rsl: number) => {
    if (rsl > -20) return 'text-green-600';
    if (rsl > -25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRSLStatus = (rsl: number) => {
    if (rsl > -20) return 'Excellent';
    if (rsl > -25) return 'Good';
    return 'Poor';
  };

  const filteredTraffic = trafficData.filter(traffic => {
    const matchesSearch = searchTerm === '' || 
      traffic.trafficName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      traffic.portNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      traffic.sourceRoute.toLowerCase().includes(searchTerm.toLowerCase()) ||
      traffic.destinationRoute.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || traffic.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const startEditing = (traffic: TrafficData) => {
    setEditingId(traffic.id);
    setEditingData({ ...traffic });
  };

  const saveEditing = () => {
    if (editingData) {
      const updatedTraffic = trafficData.map(traffic => 
        traffic.id === editingData.id ? editingData : traffic
      );
      onTrafficUpdate(updatedTraffic);
      setEditingId(null);
      setEditingData(null);
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingData(null);
  };

  const updateEditingData = (field: string, value: any) => {
    if (editingData) {
      setEditingData({
        ...editingData,
        [field]: value
      });
    }
  };

  const deleteTraffic = (trafficId: string) => {
    const updatedTraffic = trafficData.filter(traffic => traffic.id !== trafficId);
    onTrafficUpdate(updatedTraffic);
  };

  const addNewTraffic = () => {
    setNewTraffic({
      routeId: route.id,
      trafficName: '',
      rsl: -20,
      otdrDistance: 0,
      portNumber: '',
      sourceRoute: route.name,
      destinationRoute: '',
      status: 'active',
      bandwidth: '1 Gbps',
      protocol: 'Ethernet',
      lastUpdate: new Date().toISOString()
    });
  };

  const saveNewTraffic = () => {
    if (newTraffic && newTraffic.trafficName && newTraffic.portNumber && newTraffic.destinationRoute) {
      const traffic: TrafficData = {
        id: `traffic-${Date.now()}`,
        routeId: route.id,
        trafficName: newTraffic.trafficName,
        rsl: newTraffic.rsl || -20,
        otdrDistance: newTraffic.otdrDistance || 0,
        portNumber: newTraffic.portNumber,
        sourceRoute: newTraffic.sourceRoute || route.name,
        destinationRoute: newTraffic.destinationRoute,
        status: newTraffic.status || 'active',
        bandwidth: newTraffic.bandwidth || '1 Gbps',
        protocol: newTraffic.protocol || 'Ethernet',
        lastUpdate: new Date().toISOString()
      };

      const updatedTraffic = [...trafficData, traffic];
      onTrafficUpdate(updatedTraffic);
      setNewTraffic(null);
    }
  };

  const cancelNewTraffic = () => {
    setNewTraffic(null);
  };

  const updateNewTraffic = (field: string, value: any) => {
    setNewTraffic(prev => prev ? { ...prev, [field]: value } : null);
  };

  const refreshTraffic = () => {
    // Simulate refresh with small RSL variations
    const refreshedTraffic = trafficData.map(traffic => ({
      ...traffic,
      rsl: traffic.rsl + (Math.random() - 0.5) * 0.5,
      lastUpdate: new Date().toISOString()
    }));
    onTrafficUpdate(refreshedTraffic);
  };

  const trafficStats = {
    total: trafficData.length,
    active: trafficData.filter(t => t.status === 'active').length,
    error: trafficData.filter(t => t.status === 'error').length,
    avgRSL: trafficData.length > 0 ? trafficData.reduce((sum, t) => sum + t.rsl, 0) / trafficData.length : 0,
    totalBandwidth: trafficData.reduce((sum, traffic) => {
      const bandwidth = parseFloat(traffic.bandwidth.replace(/[^\d.]/g, ''));
      return sum + bandwidth;
    }, 0)
  };

  return (
    <div className="space-y-6">
      {/* Traffic Statistics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Traffic Management - {route.name}</h3>
            <p className="text-sm text-gray-600">Manage traffic flows, RSL levels, and port assignments</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={refreshTraffic}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            {!newTraffic && (
              <button
                onClick={addNewTraffic}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Traffic</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-1">
              <Activity className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Total Traffic</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{trafficStats.total}</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Active</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{trafficStats.active}</p>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-gray-700">Errors</span>
            </div>
            <p className="text-2xl font-bold text-red-600">{trafficStats.error}</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-1">
              <Signal className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Avg RSL</span>
            </div>
            <p className={`text-2xl font-bold ${getRSLColor(trafficStats.avgRSL)}`}>
              {trafficStats.avgRSL.toFixed(1)} dBm
            </p>
          </div>

          <div className="bg-indigo-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-1">
              <BarChart3 className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium text-gray-700">Total BW</span>
            </div>
            <p className="text-2xl font-bold text-indigo-600">{trafficStats.totalBandwidth.toFixed(1)} Gbps</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search traffic..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
              <option value="error">Error</option>
            </select>
          </div>

          <div className="ml-auto text-sm text-gray-500">
            {filteredTraffic.length} of {trafficData.length} traffic flows
          </div>
        </div>
      </div>

      {/* Traffic Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Traffic Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Port Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route Path
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  RSL (dBm)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  OTDR Distance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bandwidth
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* New Traffic Form */}
              {newTraffic && (
                <tr className="bg-blue-50 border-2 border-blue-200">
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={newTraffic.trafficName || ''}
                      onChange={(e) => updateNewTraffic('trafficName', e.target.value)}
                      placeholder="Traffic name"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={newTraffic.portNumber || ''}
                      onChange={(e) => updateNewTraffic('portNumber', e.target.value)}
                      placeholder="P1-01"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{route.name}</span>
                      <ArrowRight className="h-3 w-3 text-gray-400" />
                      <select
                        value={newTraffic.destinationRoute || ''}
                        onChange={(e) => updateNewTraffic('destinationRoute', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Select destination</option>
                        {allRoutes.filter(r => r.id !== route.id).map(r => (
                          <option key={r.id} value={r.name}>{r.name}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      step="0.1"
                      value={newTraffic.rsl || -20}
                      onChange={(e) => updateNewTraffic('rsl', parseFloat(e.target.value) || -20)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      step="0.1"
                      value={newTraffic.otdrDistance || 0}
                      onChange={(e) => updateNewTraffic('otdrDistance', parseFloat(e.target.value) || 0)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={newTraffic.bandwidth || '1 Gbps'}
                      onChange={(e) => updateNewTraffic('bandwidth', e.target.value)}
                      className="w-24 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={newTraffic.status || 'active'}
                      onChange={(e) => updateNewTraffic('status', e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="error">Error</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={saveNewTraffic}
                        className="text-green-600 hover:text-green-800"
                        title="Save"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        onClick={cancelNewTraffic}
                        className="text-gray-600 hover:text-gray-800"
                        title="Cancel"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )}

              {/* Existing Traffic Rows */}
              {filteredTraffic.map((traffic) => {
                const StatusIcon = getStatusIcon(traffic.status);
                const isEditing = editingId === traffic.id;
                
                return (
                  <tr key={traffic.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editingData?.trafficName || ''}
                          onChange={(e) => updateEditingData('trafficName', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                        />
                      ) : (
                        <div>
                          <div className="text-sm font-medium text-gray-900">{traffic.trafficName}</div>
                          <div className="text-xs text-gray-500">{traffic.protocol}</div>
                        </div>
                      )}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editingData?.portNumber || ''}
                          onChange={(e) => updateEditingData('portNumber', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                        />
                      ) : (
                        <span className="text-sm font-mono text-gray-900">{traffic.portNumber}</span>
                      )}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{traffic.sourceRoute}</span>
                          <ArrowRight className="h-3 w-3 text-gray-400" />
                          <select
                            value={editingData?.destinationRoute || ''}
                            onChange={(e) => updateEditingData('destinationRoute', e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                          >
                            {allRoutes.filter(r => r.name !== traffic.sourceRoute).map(r => (
                              <option key={r.id} value={r.name}>{r.name}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-900">{traffic.sourceRoute}</span>
                          <ArrowRight className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-900">{traffic.destinationRoute}</span>
                        </div>
                      )}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.1"
                          value={editingData?.rsl || 0}
                          onChange={(e) => updateEditingData('rsl', parseFloat(e.target.value) || 0)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                        />
                      ) : (
                        <div>
                          <span className={`text-sm font-medium ${getRSLColor(traffic.rsl)}`}>
                            {traffic.rsl.toFixed(1)}
                          </span>
                          <div className={`text-xs ${getRSLColor(traffic.rsl)}`}>
                            {getRSLStatus(traffic.rsl)}
                          </div>
                        </div>
                      )}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.1"
                          value={editingData?.otdrDistance || 0}
                          onChange={(e) => updateEditingData('otdrDistance', parseFloat(e.target.value) || 0)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                        />
                      ) : (
                        <span className="text-sm text-gray-900">{traffic.otdrDistance.toFixed(1)} km</span>
                      )}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editingData?.bandwidth || ''}
                          onChange={(e) => updateEditingData('bandwidth', e.target.value)}
                          className="w-24 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                        />
                      ) : (
                        <span className="text-sm text-gray-900">{traffic.bandwidth}</span>
                      )}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <select
                          value={editingData?.status || 'active'}
                          onChange={(e) => updateEditingData('status', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="maintenance">Maintenance</option>
                          <option value="error">Error</option>
                        </select>
                      ) : (
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(traffic.status)}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {traffic.status}
                        </span>
                      )}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={saveEditing}
                              className="text-green-600 hover:text-green-800"
                              title="Save"
                            >
                              <Save className="h-4 w-4" />
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="text-gray-600 hover:text-gray-800"
                              title="Cancel"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => setSelectedTraffic(traffic)}
                              className="text-blue-600 hover:text-blue-800"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => startEditing(traffic)}
                              className="text-indigo-600 hover:text-indigo-800"
                              title="Edit"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteTraffic(traffic.id)}
                              className="text-red-600 hover:text-red-800"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredTraffic.length === 0 && !newTraffic && (
          <div className="text-center py-12">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No traffic flows found</h3>
            <p className="text-gray-500">Add traffic flows to monitor RSL and manage routing</p>
          </div>
        )}
      </div>

      {/* Traffic Detail Modal */}
      {selectedTraffic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Traffic Details</h3>
                <button
                  onClick={() => setSelectedTraffic(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Traffic Name</label>
                  <p className="text-lg font-medium text-gray-900">{selectedTraffic.trafficName}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Port Number</label>
                  <p className="text-lg font-mono text-gray-900">{selectedTraffic.portNumber}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Protocol</label>
                  <p className="text-lg text-gray-900">{selectedTraffic.protocol}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bandwidth</label>
                  <p className="text-lg text-gray-900">{selectedTraffic.bandwidth}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">RSL Level</label>
                  <div className="flex items-center space-x-2">
                    <p className={`text-lg font-medium ${getRSLColor(selectedTraffic.rsl)}`}>
                      {selectedTraffic.rsl.toFixed(1)} dBm
                    </p>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getRSLColor(selectedTraffic.rsl)} bg-opacity-20`}>
                      {getRSLStatus(selectedTraffic.rsl)}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">OTDR Distance</label>
                  <p className="text-lg text-gray-900">{selectedTraffic.otdrDistance.toFixed(1)} km</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Route Path</label>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-lg text-gray-900">{selectedTraffic.sourceRoute}</span>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                  <span className="text-lg text-gray-900">{selectedTraffic.destinationRoute}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Update</label>
                <p className="text-sm text-gray-600">
                  {new Date(selectedTraffic.lastUpdate).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}