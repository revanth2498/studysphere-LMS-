// assets
import { IconDashboard, IconDeviceAnalytics, IconUsers } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconUsers
};

//-----------------------|| Admin Dashboard Items ||-----------------------//

export const AdminDash = {
    id: 'admindash',
    title: 'Dashboard',
    type: 'group',
    children: [
        // {
        //     id: 'courses',
        //     title: 'Courses',
        //     type: 'item',
        //     url: '/admin/courses',
        //     icon: icons['IconUsers'],
        //     breadcrumbs: false
        // },
        {
            id: 'approveCourses',
            title: 'Pending Courses',
            type: 'item',
            url: '/admin/approveCourses',
            icon: icons['IconUsers'],
            breadcrumbs: false
        }
    ]
};
