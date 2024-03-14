import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import Loadable from '../ui-component/Loadable';
import MainLayout from './../layout/MainLayout';
// import DashboardMain from '../views/DashboardMain';
// import DashboardDefault from '../views/dashboard/Default';
import GuestGuard from '../utils/route-guard/GuestGuard';
import MainCard from '../ui-component/cards/MainCard';

// dashboard routing
const Dashboard = Loadable(lazy(() => import('../views/DashboardMain/AdminDashboard/index')));
const ApproveCourses = Loadable(lazy(() => import('../views/DashboardMain/AdminDashboard/approveCourse')));
const CourseList = Loadable(lazy(() => import('../views/DashboardMain/components/courseList')));
const Drawer = Loadable(lazy(() => import('../views/DashboardMain/components/ResponsiveDrawer')));


//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const location = useLocation();
    return (
        <Route path={['/admin/dashboard', '/admin/courses', '/admin/approvecourses']}>
            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    {/* <NavMotion> */}
                    <GuestGuard>
                        {/* <Route path="/instructor/dashboard" component={Dashboard} /> */}
                        <Route exact path="/admin/courses" component={Dashboard} />
                        <Route exact path="/admin/approveCourses" component={ApproveCourses} />
                    </GuestGuard>
                    {/* </NavMotion> */}
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;