// assets
import { IconDashboard, IconDeviceAnalytics, IconUsers } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconUsers
};

//-----------------------|| Student Dashboard Items ||-----------------------//

export const DashboardMain = {
    id: 'dashboardmain',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'StudentDetails',
            title: 'Student Details',
            type: 'item',
            url: '/courses',
            icon: icons['IconUsers'],
            breadcrumbs: false
        }
    ]
};
