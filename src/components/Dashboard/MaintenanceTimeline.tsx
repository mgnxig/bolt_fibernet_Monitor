import React from 'react';
import { MaintenanceRecord, TroubleTicket } from '../../types';
import { 
  Calendar, Clock, User, Wrench, AlertTriangle, 
  CheckCircle, PlayCircle, XCircle, MapPin,
  Activity, Settings, Car, Shield
} from 'lucide-react';

interface MaintenanceTimelineProps {
  maintenanceRecords: MaintenanceRecord[];
  troubleTickets: TroubleTicket[];
  routes: Array<{ id: string; name: string }>;
}

export default function MaintenanceTimeline({ 
  maintenanceRecords, 
  troubleTickets, 
  routes 
}: MaintenanceTimelineProps) {
  // Get current date and calculate week ranges
  const today = new Date();
  const currentWeekStart = new Date(today);
  currentWeekStart.setDate(today.getDate() - today.getDay());
  
  const lastWeekStart = new Date(currentWeekStart);
  lastWeekStart.setDate(currentWeekStart.getDate() - 7);
  
  const nextWeekStart = new Date(currentWeekStart);
  nextWeekStart.setDate(currentWeekStart.getDate() + 7);

  const getRouteName = (routeId: string) => {
    const route = routes.find(r => r.id === routeId);
    return route ? route.name : 'Unknown Route';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'in-progress':
        return PlayCircle;
      case 'scheduled':
        return Calendar;
      case 'cancelled':
        return XCircle;
      default:
        return Calendar;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'in-progress':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'scheduled':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'cancelled':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'prepare':
        return Settings;
      case 'travel':
        return Car;
      case 'handling':
        return Wrench;
      case 'securing':
        return Shield;
      default:
        return Activity;
    }
  };

  // Mock timeline data for demonstration
  const timelineData = [
    // Last Week
    {
      week: 'Last Week',
      weekStart: lastWeekStart,
      items: [
        {
          id: 'timeline-1',
          type: 'maintenance',
          title: 'Preventive Maintenance Route A',
          description: 'Quarterly fiber inspection and cleaning',
          status: 'completed',
          date: new Date(lastWeekStart.getTime() + 2 * 24 * 60 * 60 * 1000), // Tuesday
          routeId: 'route-a',
          technician: 'John Smith',
          duration: 4
        },
        {
          id: 'timeline-2',
          type: 'patrol',
          title: 'Route Patrol - District B',
          description: 'Visual inspection of overhead cables',
          status: 'completed',
          date: new Date(lastWeekStart.getTime() + 4 * 24 * 60 * 60 * 1000), // Thursday
          routeId: 'route-b',
          technician: 'Sarah Johnson',
          duration: 6
        },
        {
          id: 'timeline-3',
          type: 'trouble',
          title: 'Signal Loss Investigation',
          description: 'Emergency repair on Route E',
          status: 'completed',
          date: new Date(lastWeekStart.getTime() + 5 * 24 * 60 * 60 * 1000), // Friday
          routeId: 'route-e',
          technician: 'Mike Wilson',
          duration: 8
        }
      ]
    },
    // This Week
    {
      week: 'This Week',
      weekStart: currentWeekStart,
      items: [
        {
          id: 'timeline-4',
          type: 'maintenance',
          title: 'Connector Cleaning Route C',
          description: 'Scheduled connector maintenance',
          status: 'in-progress',
          date: new Date(currentWeekStart.getTime() + 1 * 24 * 60 * 60 * 1000), // Monday
          routeId: 'route-c',
          technician: 'Tom Anderson',
          duration: 5
        },
        {
          id: 'timeline-5',
          type: 'patrol',
          title: 'Weekly Patrol Route F',
          description: 'Regular infrastructure inspection',
          status: 'scheduled',
          date: new Date(currentWeekStart.getTime() + 3 * 24 * 60 * 60 * 1000), // Wednesday
          routeId: 'route-f',
          technician: 'Lisa Chen',
          duration: 4
        }
      ]
    },
    // Next Week
    {
      week: 'Next Week',
      weekStart: nextWeekStart,
      items: [
        {
          id: 'timeline-6',
          type: 'maintenance',
          title: 'Quarterly Inspection Route D',
          description: 'Comprehensive route inspection',
          status: 'scheduled',
          date: new Date(nextWeekStart.getTime() + 2 * 24 * 60 * 60 * 1000), // Tuesday
          routeId: 'route-d',
          technician: 'John Smith',
          duration: 6
        },
        {
          id: 'timeline-7',
          type: 'patrol',
          title: 'Infrastructure Audit Route B',
          description: 'Monthly infrastructure audit',
          status: 'scheduled',
          date: new Date(nextWeekStart.getTime() + 4 * 24 * 60 * 60 * 1000), // Thursday
          routeId: 'route-b',
          technician: 'Sarah Johnson',
          duration: 8
        }
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'maintenance':
        return Wrench;
      case 'patrol':
        return MapPin;
      case 'trouble':
        return AlertTriangle;
      default:
        return Activity;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'maintenance':
        return 'text-blue-600 bg-blue-50';
      case 'patrol':
        return 'text-green-600 bg-green-50';
      case 'trouble':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Activity Timeline</h3>
          <p className="text-sm text-gray-600">Maintenance, patrol, and trouble ticket activities</p>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <Wrench className="h-4 w-4 text-blue-600" />
            <span className="text-gray-700">Maintenance</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-green-600" />
            <span className="text-gray-700">Patrol</span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <span className="text-gray-700">Trouble</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {timelineData.map((weekData) => (
          <div key={weekData.week}>
            <div className="flex items-center space-x-3 mb-4">
              <h4 className="text-md font-semibold text-gray-900">{weekData.week}</h4>
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-500">
                {weekData.weekStart.toLocaleDateString()} - {new Date(weekData.weekStart.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>

            <div className="space-y-3">
              {weekData.items.map((item, index) => {
                const TypeIcon = getTypeIcon(item.type);
                const StatusIcon = getStatusIcon(item.status);
                const typeColor = getTypeColor(item.type);
                const statusColor = getStatusColor(item.status);

                return (
                  <div key={item.id} className="flex space-x-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${typeColor}`}>
                      <TypeIcon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="bg-gray-50 rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-gray-900 truncate">{item.title}</h5>
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          </div>
                          <div className={`ml-4 px-3 py-1 rounded-full border flex items-center space-x-1 ${statusColor} whitespace-nowrap`}>
                            <StatusIcon className="h-4 w-4" />
                            <span className="text-sm font-medium capitalize">
                              {item.status.replace('-', ' ')}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <div>
                              <span className="text-gray-500">Date:</span>
                              <span className="ml-1 font-medium text-gray-900">
                                {item.date.toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <div>
                              <span className="text-gray-500">Route:</span>
                              <span className="ml-1 font-medium text-gray-900">
                                {getRouteName(item.routeId)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <div>
                              <span className="text-gray-500">Technician:</span>
                              <span className="ml-1 font-medium text-gray-900">{item.technician}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <div>
                              <span className="text-gray-500">Duration:</span>
                              <span className="ml-1 font-medium text-gray-900">{item.duration}h</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline connector */}
                    {index < weekData.items.length - 1 && (
                      <div className="absolute left-5 top-10 w-0.5 h-8 bg-gray-200" style={{ marginLeft: '20px' }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}