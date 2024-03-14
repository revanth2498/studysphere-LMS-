// assets
import { IconDashboard, IconDeviceAnalytics, IconUsers } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconUsers
};

//-----------------------|| Student Dashboard Items ||-----------------------//

export const InstructorDash = {
    id: 'instrdash',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'courses',
            title: 'Courses',
            type: 'item',
            url: '/instructor/courses',
            icon: icons['IconUsers'],
            breadcrumbs: false
        },
        {
            id: 'addCourse',
            title: 'Add Course',
            type: 'item',
            url: '/instructor/addCourse',
            icon: icons['IconUsers'],
            breadcrumbs: false
        },
        {
            id: 'courseOverview',
            title: 'Course Overview',
            type: 'item',
            url: '/instructor/courseOverview',
            icon: icons['IconUsers'],
            breadcrumbs: false
        }
    ]
};
