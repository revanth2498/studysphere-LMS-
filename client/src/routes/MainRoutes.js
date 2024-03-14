import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Loadable from '../ui-component/Loadable';
import MainLayout from './../layout/MainLayout';
const CourseList = Loadable(lazy(() => import('../views/DashboardMain/components/courseList')));
const Drawer = Loadable(lazy(() => import('../views/DashboardMain/components/ResponsiveDrawer')));
const Calendar=Loadable(lazy(()=>import('../views/DashboardMain/components/Calendar')))



const MainRoutes = () => {
    const location = useLocation();
    return (
        <Route path={['/student/courses', '/student/courses/:id','/student/calendar']}>
            <MainLayout>
                <Switch location={location} key={location.pathname}>                    
                        <Route path="/student/courses/:id" component={Drawer} />
                        <Route exact path="/student/calendar" component={Calendar} />
                        <Route exact path="/student/courses" component={CourseList} />    
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;