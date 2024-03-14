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
import NestedList from './modules';
import AnnouncementsView from './announcmentview-instructor';
import ModuleCreation from './modules-instructor';
import AnnouncementForm from './announcement';
import AssignmentCreation from './instructor-assignment';
import { useHistory } from 'react-router-dom';
import InstructorGradesView from './instructor-grade';
import { Switch, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './responsive-drawer.scss';
import GraderView from './grader';
import ChatApp from '../../messages/chat-app/chat-app';
import InstructorModulesView from './modules';

function ResponsiveDrawer(props) {
  
  const params = useParams();
  const history=useHistory();
  const location = useLocation();
  console.log(location.pathname)


  const sidelinks = [
    { name: 'home', url: `/instructor/courses/${params.id}/description` },
    { name: 'viewAnnouncements', url: `/instructor/courses/${params.id}/viewAnnouncements` },
    { name: 'createAnnouncements', url: `/instructor/courses/${params.id}/createAnnouncements` },
    { name: 'assignments', url: `/instructor/courses/${params.id}/assignments` },
    { name: 'grades', url: `/instructor/courses/${params.id}/grades` },
    { name: 'modules', url: `/instructor/courses/${params.id}/modules` },
    { name: 'syllabus', url: `/instructor/courses/${params.id}/syllabus` },
    { name: 'makemodule', url: `/instructor/courses/${params.id}/makemodule` },
    { name: 'makeassignment', url: `/instructor/courses/${params.id}/makeassignment` },
    {name:'chat',url:`/instructor/courses/${params.id}/chat`}
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {sidelinks.map((link, index) => (
          <ListItem key={link.name} disablePadding onClick={()=>history.push(link.url)}>
            <ListItemButton> 
              <ListItemText primary={link.name} />
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
                    <Route path= '/instructor/courses/:id/modules' component={InstructorModulesView}/>
                    <Route path= '/instructor/courses/:id/viewAnnouncements' component={AnnouncementsView}/>
                    <Route path= '/instructor/courses/:id/createAnnouncements' component={AnnouncementForm} />   
                    <Route path= '/instructor/courses/:id/assignments' component={InstructorGradesView} /> 
                    <Route path= '/instructor/courses/:id/makemodule' component={ModuleCreation} /> 
                    <Route path= '/instructor/courses/:id/makeassignment' component={AssignmentCreation} />  
                    <Route path= '/instructor/courses/:id/grader/:assignmentid' component={GraderView} />  
                    <Route path='/instructor/courses/:id/chat' component={ChatApp}/>
                  
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