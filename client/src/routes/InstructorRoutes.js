import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';


import Loadable from '../ui-component/Loadable';
import MainLayout from './../layout/MainLayout';
import GuestGuard from '../utils/route-guard/GuestGuard';

const Dashboard = Loadable(lazy(() => import('../views/DashboardMain/InstructorDashboard/index')));
const MakeCourse = Loadable(lazy(() => import('../views/Instructor/MakeCourse/index')));
const CourseOverview = Loadable(lazy(() => import('../views/Instructor/CourseOverview/index')));
const Drawer = Loadable(lazy(() => import('../views/DashboardMain/InstructorDashboard/ResponsiveDrawer')));


const MainRoutes = () => {
    const location = useLocation();
    return (
        <Route path={['/instructor/courses', '/instructor/addCourse', '/instructor/courseOverview','instructor/courses/:id']}>
            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    {/* <NavMotion> */}
                    <GuestGuard>
                        {/* <Route path="/instructor/dashboard" component={Dashboard} /> */}
                        <Route path="/instructor/courses/:id" component={Drawer} />
                        <Route exact path="/instructor/courses" component={Dashboard} />
                        <Route path="/instructor/addCourse" component={MakeCourse} />
                        <Route path="/instructor/courseOverview" component={CourseOverview} />                        

                    </GuestGuard>
                    {/* </NavMotion> */}
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
