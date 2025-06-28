import { Route, MaintenanceRecord, Alert, SLAData, SLATarget, TroubleTicket, TroubleTicketActivity, Link } from '../types';

export const routes: Route[] = [
  {
    id: 'route-a',
    name: 'Route A',
    status: 'operational',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-04-15',
    troubleTickets: 2,
    fiberCount: 144,
    location: {
      start: 'Central Hub',
      end: 'District A Terminal'
    },
    assets: {
      handhole: 15,
      odc: 3,
      pole: 28,
      jc: 12
    },
    links: [
      {
        id: 'link-a1',
        name: 'FO-LINK-CHA-01',
        length: 12.5,
        totalLoss: 2.3,
        status: 'operational'
      },
      {
        id: 'link-a2',
        name: 'FO-LINK-CHA-02',
        length: 13.0,
        totalLoss: 2.1,
        status: 'operational'
      }
    ]
  },
  {
    id: 'route-b',
    name: 'Route B',
    status: 'warning',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-04-10',
    troubleTickets: 5,
    fiberCount: 96,
    location: {
      start: 'Central Hub',
      end: 'District B Terminal'
    },
    assets: {
      handhole: 22,
      odc: 4,
      pole: 35,
      jc: 18
    },
    links: [
      {
        id: 'link-b1',
        name: 'FO-LINK-CHB-01',
        length: 16.1,
        totalLoss: 3.8,
        status: 'warning'
      },
      {
        id: 'link-b2',
        name: 'FO-LINK-CHB-02',
        length: 16.0,
        totalLoss: 3.2,
        status: 'operational'
      }
    ]
  },
  {
    id: 'route-c',
    name: 'Route C',
    status: 'maintenance',
    lastMaintenance: '2024-02-01',
    nextMaintenance: '2024-05-01',
    troubleTickets: 8,
    fiberCount: 72,
    location: {
      start: 'Central Hub',
      end: 'District C Terminal'
    },
    assets: {
      handhole: 18,
      odc: 2,
      pole: 24,
      jc: 14
    },
    links: [
      {
        id: 'link-c1',
        name: 'FO-LINK-CHC-01',
        length: 9.2,
        totalLoss: 4.2,
        status: 'maintenance'
      },
      {
        id: 'link-c2',
        name: 'FO-LINK-CHC-02',
        length: 9.5,
        totalLoss: 3.9,
        status: 'operational'
      }
    ]
  },
  {
    id: 'route-d',
    name: 'Route D',
    status: 'operational',
    lastMaintenance: '2024-01-20',
    nextMaintenance: '2024-04-20',
    troubleTickets: 1,
    fiberCount: 144,
    location: {
      start: 'Central Hub',
      end: 'District D Terminal'
    },
    assets: {
      handhole: 25,
      odc: 5,
      pole: 42,
      jc: 20
    },
    links: [
      {
        id: 'link-d1',
        name: 'FO-LINK-CHD-01',
        length: 13.8,
        totalLoss: 1.9,
        status: 'operational'
      },
      {
        id: 'link-d2',
        name: 'FO-LINK-CHD-02',
        length: 14.2,
        totalLoss: 2.0,
        status: 'operational'
      },
      {
        id: 'link-d3',
        name: 'FO-LINK-CHD-03',
        length: 13.3,
        totalLoss: 1.8,
        status: 'operational'
      }
    ]
  },
  {
    id: 'route-e',
    name: 'Route E',
    status: 'critical',
    lastMaintenance: '2024-01-08',
    nextMaintenance: '2024-04-08',
    troubleTickets: 12,
    fiberCount: 48,
    location: {
      start: 'Central Hub',
      end: 'District E Terminal'
    },
    assets: {
      handhole: 12,
      odc: 2,
      pole: 18,
      jc: 8
    },
    links: [
      {
        id: 'link-e1',
        name: 'FO-LINK-CHE-01',
        length: 14.5,
        totalLoss: 6.7,
        status: 'critical'
      },
      {
        id: 'link-e2',
        name: 'FO-LINK-CHE-02',
        length: 14.4,
        totalLoss: 5.2,
        status: 'warning'
      }
    ]
  },
  {
    id: 'route-f',
    name: 'Route F',
    status: 'operational',
    lastMaintenance: '2024-01-25',
    nextMaintenance: '2024-04-25',
    troubleTickets: 3,
    fiberCount: 96,
    location: {
      start: 'Central Hub',
      end: 'District F Terminal'
    },
    assets: {
      handhole: 20,
      odc: 3,
      pole: 32,
      jc: 16
    },
    links: [
      {
        id: 'link-f1',
        name: 'FO-LINK-CHF-01',
        length: 17.6,
        totalLoss: 2.8,
        status: 'operational'
      },
      {
        id: 'link-f2',
        name: 'FO-LINK-CHF-02',
        length: 17.6,
        totalLoss: 3.1,
        status: 'operational'
      }
    ]
  }
];

export const troubleTickets: TroubleTicket[] = [
  {
    id: 'ticket-001',
    ticketNumber: 'NOC-CGK-20240220-0915-001',
    routeId: 'route-e',
    linkId: 'link-e1',
    title: 'Critical Signal Loss on FO-LINK-CHE-01',
    description: 'Severe signal degradation detected on primary link. Customer services affected.',
    priority: 'critical',
    status: 'in-progress',
    category: 'signal-loss',
    reportedBy: 'Network Monitoring System',
    assignedTo: 'Sarah Johnson',
    personHandling: 'Sarah Johnson',
    createdAt: '2024-02-20T09:15:00Z',
    updatedAt: '2024-02-20T11:30:00Z',
    estimatedResolution: '2024-02-20T18:00:00Z',
    impact: 'critical',
    location: {
      longitude: 106.8456,
      latitude: -6.2088,
      address: 'Jl. Sudirman No. 123, Jakarta Pusat',
      landmark: 'Near Plaza Indonesia'
    },
    slaTarget: 4,
    slaStatus: 'approaching',
    activities: [
      {
        id: 'activity-001',
        ticketId: 'ticket-001',
        type: 'created',
        description: 'Ticket created automatically by monitoring system',
        performedBy: 'System',
        timestamp: '2024-02-20T09:15:00Z'
      },
      {
        id: 'activity-002',
        ticketId: 'ticket-001',
        type: 'assigned',
        description: 'Ticket assigned to field technician',
        performedBy: 'John Manager',
        timestamp: '2024-02-20T09:20:00Z',
        details: {
          newValue: 'Sarah Johnson'
        }
      },
      {
        id: 'activity-003',
        ticketId: 'ticket-001',
        type: 'prepare',
        description: 'Equipment preparation and team briefing',
        performedBy: 'Sarah Johnson',
        timestamp: '2024-02-20T09:30:00Z',
        duration: 30
      },
      {
        id: 'activity-004',
        ticketId: 'ticket-001',
        type: 'travel',
        description: 'Travel to incident location',
        performedBy: 'Sarah Johnson',
        timestamp: '2024-02-20T10:00:00Z',
        duration: 45,
        details: {
          location: 'From NOC to Jl. Sudirman'
        }
      },
      {
        id: 'activity-005',
        ticketId: 'ticket-001',
        type: 'initial-measurement',
        description: 'OTDR testing completed - fiber break detected at 14.2km',
        performedBy: 'Sarah Johnson',
        timestamp: '2024-02-20T11:30:00Z',
        duration: 60,
        details: {
          testResults: 'Fiber break at 14.2km, loss: 15dB',
          location: 'Kilometer 14.2'
        }
      }
    ]
  },
  {
    id: 'ticket-002',
    ticketNumber: 'NOC-CGK-20240219-0800-002',
    routeId: 'route-c',
    linkId: 'link-c1',
    title: 'Scheduled Maintenance - Connector Cleaning',
    description: 'Preventive maintenance for connector cleaning and inspection',
    priority: 'medium',
    status: 'resolved',
    category: 'maintenance',
    reportedBy: 'Maintenance Team',
    assignedTo: 'Mike Wilson',
    personHandling: 'Mike Wilson',
    createdAt: '2024-02-19T08:00:00Z',
    updatedAt: '2024-02-20T16:00:00Z',
    resolvedAt: '2024-02-20T16:00:00Z',
    estimatedResolution: '2024-02-20T16:00:00Z',
    impact: 'low',
    location: {
      longitude: 106.8234,
      latitude: -6.1944,
      address: 'Jl. Thamrin No. 45, Jakarta Pusat',
      landmark: 'Grand Indonesia Mall'
    },
    slaTarget: 8,
    slaStatus: 'within',
    totalDuration: 480, // 8 hours
    activities: [
      {
        id: 'activity-006',
        ticketId: 'ticket-002',
        type: 'created',
        description: 'Scheduled maintenance ticket created',
        performedBy: 'Maintenance Scheduler',
        timestamp: '2024-02-19T08:00:00Z'
      },
      {
        id: 'activity-007',
        ticketId: 'ticket-002',
        type: 'prepare',
        description: 'Equipment and tools preparation',
        performedBy: 'Mike Wilson',
        timestamp: '2024-02-20T08:00:00Z',
        duration: 45
      },
      {
        id: 'activity-008',
        ticketId: 'ticket-002',
        type: 'travel',
        description: 'Travel to maintenance location',
        performedBy: 'Mike Wilson',
        timestamp: '2024-02-20T08:45:00Z',
        duration: 30
      },
      {
        id: 'activity-009',
        ticketId: 'ticket-002',
        type: 'handling',
        description: 'Connector cleaning completed on splice points 1-5',
        performedBy: 'Mike Wilson',
        timestamp: '2024-02-20T09:15:00Z',
        duration: 240
      },
      {
        id: 'activity-010',
        ticketId: 'ticket-002',
        type: 'securing',
        description: 'Site secured and equipment tested',
        performedBy: 'Mike Wilson',
        timestamp: '2024-02-20T15:30:00Z',
        duration: 30
      }
    ]
  },
  {
    id: 'ticket-003',
    ticketNumber: 'NOC-CGK-20240220-0730-003',
    routeId: 'route-b',
    linkId: 'link-b1',
    title: 'Performance Degradation Alert',
    description: 'Gradual signal quality degradation over past 48 hours',
    priority: 'medium',
    status: 'open',
    category: 'performance-degraded',
    reportedBy: 'Network Monitoring System',
    createdAt: '2024-02-20T07:30:00Z',
    updatedAt: '2024-02-20T07:30:00Z',
    impact: 'medium',
    location: {
      longitude: 106.8567,
      latitude: -6.2234,
      address: 'Jl. Gatot Subroto No. 78, Jakarta Selatan',
      landmark: 'Kuningan City Mall'
    },
    slaTarget: 6,
    slaStatus: 'within',
    activities: [
      {
        id: 'activity-011',
        ticketId: 'ticket-003',
        type: 'created',
        description: 'Performance degradation detected by monitoring system',
        performedBy: 'System',
        timestamp: '2024-02-20T07:30:00Z'
      }
    ]
  },
  {
    id: 'ticket-004',
    ticketNumber: 'NOC-CGK-20240218-1420-004',
    routeId: 'route-a',
    title: 'Equipment Failure - Amplifier Unit',
    description: 'Optical amplifier showing error codes and reduced output',
    priority: 'high',
    status: 'closed',
    category: 'equipment-failure',
    reportedBy: 'Field Technician',
    assignedTo: 'Tom Anderson',
    personHandling: 'Tom Anderson',
    createdAt: '2024-02-18T14:20:00Z',
    updatedAt: '2024-02-19T16:45:00Z',
    resolvedAt: '2024-02-19T16:30:00Z',
    closedAt: '2024-02-19T16:45:00Z',
    actualResolution: '2024-02-19T16:45:00Z',
    impact: 'medium',
    location: {
      longitude: 106.8123,
      latitude: -6.1756,
      address: 'Jl. MH Thamrin No. 1, Jakarta Pusat',
      landmark: 'Hotel Indonesia Roundabout'
    },
    slaTarget: 6,
    slaStatus: 'within',
    totalDuration: 1585, // ~26 hours
    activities: [
      {
        id: 'activity-012',
        ticketId: 'ticket-004',
        type: 'created',
        description: 'Equipment failure reported by field technician',
        performedBy: 'Tom Anderson',
        timestamp: '2024-02-18T14:20:00Z'
      },
      {
        id: 'activity-013',
        ticketId: 'ticket-004',
        type: 'prepare',
        description: 'Spare equipment preparation and diagnostics',
        performedBy: 'Tom Anderson',
        timestamp: '2024-02-19T08:00:00Z',
        duration: 60
      },
      {
        id: 'activity-014',
        ticketId: 'ticket-004',
        type: 'travel',
        description: 'Travel to equipment location',
        performedBy: 'Tom Anderson',
        timestamp: '2024-02-19T14:00:00Z',
        duration: 45
      },
      {
        id: 'activity-015',
        ticketId: 'ticket-004',
        type: 'handling',
        description: 'Amplifier unit replaced with spare unit',
        performedBy: 'Tom Anderson',
        timestamp: '2024-02-19T15:00:00Z',
        duration: 90,
        details: {
          location: 'Central Hub - Equipment Room'
        }
      },
      {
        id: 'activity-016',
        ticketId: 'ticket-004',
        type: 'testing',
        description: 'System testing completed - all parameters normal',
        performedBy: 'Tom Anderson',
        timestamp: '2024-02-19T16:30:00Z',
        duration: 15,
        details: {
          testResults: 'Output power: 15dBm, Gain: 20dB - Normal'
        }
      },
      {
        id: 'activity-017',
        ticketId: 'ticket-004',
        type: 'securing',
        description: 'Site secured and documentation completed',
        performedBy: 'Tom Anderson',
        timestamp: '2024-02-19T16:45:00Z',
        duration: 15
      }
    ]
  }
];

export const maintenanceRecords: MaintenanceRecord[] = [
  {
    id: 'maint-001',
    routeId: 'route-c',
    type: 'preventive',
    status: 'in-progress',
    title: 'Quarterly Fiber Inspection',
    description: 'Regular inspection of fiber optic cables and connections',
    scheduledDate: '2024-02-20',
    technician: 'John Smith',
    priority: 'medium'
  },
  {
    id: 'maint-002',
    routeId: 'route-e',
    type: 'corrective',
    status: 'scheduled',
    title: 'Signal Loss Investigation',
    description: 'Investigate and repair signal degradation on Route E',
    scheduledDate: '2024-02-22',
    technician: 'Sarah Johnson',
    priority: 'critical'
  },
  {
    id: 'maint-003',
    routeId: 'route-b',
    type: 'preventive',
    status: 'completed',
    title: 'Cable Cleaning and Testing',
    description: 'Clean connectors and perform signal quality tests',
    scheduledDate: '2024-02-15',
    completedDate: '2024-02-15',
    technician: 'Mike Wilson',
    priority: 'low',
    duration: 4,
    notes: 'All tests passed. Minor cleaning required on connector 12.'
  }
];

export const alerts: Alert[] = [
  {
    id: 'alert-001',
    routeId: 'route-e',
    type: 'system-failure',
    severity: 'critical',
    message: 'Critical signal loss detected on Route E - immediate attention required',
    timestamp: '2024-02-20T09:15:00Z',
    acknowledged: false
  },
  {
    id: 'alert-002',
    routeId: 'route-b',
    type: 'performance-degraded',
    severity: 'warning',
    message: 'Performance degradation detected on Route B - schedule inspection',
    timestamp: '2024-02-20T07:30:00Z',
    acknowledged: true
  },
  {
    id: 'alert-003',
    routeId: 'route-a',
    type: 'maintenance-due',
    severity: 'info',
    message: 'Preventive maintenance due for Route A in 7 days',
    timestamp: '2024-02-20T08:00:00Z',
    acknowledged: false
  }
];

export const slaWeeklyData: SLAData[] = [
  {
    week: 'Week 1',
    routeA: 99.8,
    routeB: 98.5,
    routeC: 97.2,
    routeD: 99.9,
    routeE: 94.1,
    routeF: 99.3,
    average: 98.1
  },
  {
    week: 'Week 2',
    routeA: 99.7,
    routeB: 98.8,
    routeC: 96.8,
    routeD: 99.8,
    routeE: 93.5,
    routeF: 99.1,
    average: 97.9
  },
  {
    week: 'Week 3',
    routeA: 99.9,
    routeB: 97.9,
    routeC: 95.1,
    routeD: 99.7,
    routeE: 91.8,
    routeF: 99.4,
    average: 97.3
  },
  {
    week: 'Week 4',
    routeA: 99.8,
    routeB: 98.2,
    routeC: 95.5,
    routeD: 99.9,
    routeE: 92.1,
    routeF: 99.5,
    average: 97.5
  }
];

// Helper function to determine SLA status based on maintenance time
const getSLAStatus = (maintenanceTime: number): 'achieve' | 'standard' | 'exceed' => {
  if (maintenanceTime < 6) {
    return 'achieve'; // Below 6 hours - achieving target
  } else if (maintenanceTime === 6) {
    return 'standard'; // Exactly 6 hours - meeting standard
  } else {
    return 'exceed'; // Over 6 hours - exceeding time limit
  }
};

// Helper function to calculate trend based on SLA improvement and maintenance time
const calculateTrend = (currentSLA: number, previousSLA: number, maintenanceTime: number): 'up' | 'down' | 'stable' => {
  // If maintenance time < 6 hours, it's considered positive performance
  const hasGoodMaintenanceTime = maintenanceTime < 6;
  
  // Check if SLA percentage improved
  const slaImproved = currentSLA > previousSLA;
  const slaDeclined = currentSLA < previousSLA;
  
  // Positive trend if: SLA improved OR maintenance time is good
  if (slaImproved || hasGoodMaintenanceTime) {
    return 'up';
  } else if (slaDeclined && maintenanceTime >= 6) {
    return 'down';
  } else {
    return 'stable';
  }
};

// Previous week SLA data for trend calculation
const previousWeekSLA = {
  'route-a': 99.7, // Week 3 data
  'route-b': 97.9,
  'route-c': 95.1,
  'route-d': 99.7,
  'route-e': 91.8,
  'route-f': 99.4
};

export const slaTargets: SLATarget[] = [
  {
    routeId: 'route-a',
    routeName: 'Route A',
    target: 99.5,
    current: 99.8,
    maintenanceTime: 3.5, // < 6 hours = achieve
    status: getSLAStatus(3.5),
    trend: calculateTrend(99.8, previousWeekSLA['route-a'], 3.5)
  },
  {
    routeId: 'route-b',
    routeName: 'Route B',
    target: 99.0,
    current: 98.2,
    maintenanceTime: 6.0, // = 6 hours = standard
    status: getSLAStatus(6.0),
    trend: calculateTrend(98.2, previousWeekSLA['route-b'], 6.0)
  },
  {
    routeId: 'route-c',
    routeName: 'Route C',
    target: 98.0,
    current: 95.5,
    maintenanceTime: 12.0, // > 6 hours = exceed
    status: getSLAStatus(12.0),
    trend: calculateTrend(95.5, previousWeekSLA['route-c'], 12.0)
  },
  {
    routeId: 'route-d',
    routeName: 'Route D',
    target: 99.5,
    current: 99.9,
    maintenanceTime: 2.1, // < 6 hours = achieve
    status: getSLAStatus(2.1),
    trend: calculateTrend(99.9, previousWeekSLA['route-d'], 2.1)
  },
  {
    routeId: 'route-e',
    routeName: 'Route E',
    target: 98.0,
    current: 92.1,
    maintenanceTime: 24.0, // > 6 hours = exceed (24 hours for illustration)
    status: getSLAStatus(24.0),
    trend: calculateTrend(92.1, previousWeekSLA['route-e'], 24.0)
  },
  {
    routeId: 'route-f',
    routeName: 'Route F',
    target: 99.0,
    current: 99.5,
    maintenanceTime: 1.8, // < 6 hours = achieve
    status: getSLAStatus(1.8),
    trend: calculateTrend(99.5, previousWeekSLA['route-f'], 1.8)
  }
];