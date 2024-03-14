// assets
import { IconDashboard, IconDeviceAnalytics, IconUsers } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconUsers
};

//-----------------------|| Student Dashboard Items ||-----------------------//

export const StudentDash = {
    id: 'studentdash',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'courses',
            title: 'Courses',
            type: 'item',
            url: '/student/courses',
            icon: icons['IconUsers'],
            breadcrumbs: false
        },
                {
            id: 'calendar',
            title: 'calendar',
            type: 'item',
            url: '/student/calendar',
            icon: icons['IconUsers'],
            breadcrumbs: false
        }
                {
            id: 'calendar',
            title: 'calendar',
            type: 'item',
            url: '/student/calendar',
            icon: icons['IconUsers'],
            breadcrumbs: false
        }
    ]
};
