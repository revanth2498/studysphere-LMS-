import * as React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import {Route,  useParams} from 'react-router-dom';
import AnnouncementsView from './announcement';
import StudentModulesView from './module-student';
import AssignmentList from './assignments';
import StudentAssignmentView from './assignment-student';
import { useHistory } from 'react-router-dom';
import { Switch, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './responsive-drawer.scss';
import { ChatApp } from '../../messages/chat-app/chat-app';
import StudentGrades from './student-grade';

function ResponsiveDrawer(props) {
  
  const params = useParams();
  const history=useHistory();
  //console.log(params.id)


  const sidelinks = [
    { name: 'home', url: `/student/courses/${params.id}/description` },
    { name: 'announcements', url: `/student/courses/${params.id}/announcements` },
    { name: 'assignments', url: `/student/courses/${params.id}/assignments` },
    { name: 'grades', url: `/student/courses/${params.id}/grades` },
    // { name: 'modules', url: `/student/courses/${params.id}/modules` },
    { name: 'modules', url: `/student/courses/${params.id}/Modules` },
    {name: 'chat', url:`/student/courses/${params.id}/chat`}
   ];
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {sidelinks.map((link, index) => (
          <ListItem key={link.name}  disablePadding onClick={()=>history.push(link.url)}>
            <ListItemButton> 
              <ListItemText primary={link.name} courseid={params.id}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );


  return (
    <div className='responsive-drawer'>
      <CssBaseline />
      <div className='drawer-container'>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 120, position:'relative' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </div>
      
        
      
      <div className='child'>
      
         
                 <Switch>
                    <Route path= '/student/courses/:id/announcements' component={AnnouncementsView}  />
                    {/* <Route path= '/student/courses/:id/assignments' component={AssignmentList} />   */}
                    <Route path= '/student/courses/:id/assignments' component={StudentAssignmentView} />  
                    <Route path= '/student/courses/:id/Modules' component={StudentModulesView}  />
                    <Route path='/student/courses/:id/chat' component={ChatApp} />
                    <Route path='/student/courses/:id/grades' component={StudentGrades}/>
                </Switch>
                

        </div>
      
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;