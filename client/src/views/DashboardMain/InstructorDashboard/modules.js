import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import Button from '@mui/material/Button';


function InstructorModulesView() {


  const [modules, setModules] = useState([]);
  const params = useParams();
  


  const openFileInNewWindow = (fileUrl) => {
    const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}`;
    window.open(googleDocsViewerUrl, '_blank');
  };
  
  const deleteModule = (moduleId) => {   
    fetch(`http://localhost:8000/Course/deleteModule/${moduleId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setModules((prevModules) => prevModules.filter((module) => module._id !== moduleId));
        } else {
          throw new Error('Failed to delete the module');
        }
      })
      .catch((error) => {
        console.error('Error deleting module:', error);
      });
  };
  
  useEffect(() => {    
    console.log(
      "this is inside student modules"
    )
    console.log(params.id)
    fetch(`http://localhost:8000/Course/getModulesByCourseFiles/${params.id}`) 
            .then((response) => {
                return response.json();
            })
            .then((data) => {                
                console.log(data)
                setModules(data)              
            })
            .catch((error) => {
                console.log(error)
            });
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Class Modules
      </Typography>
      <Grid container spacing={2}>
        {modules.map((module) => (
          <Grid item xs={12} sm={6} md={4} key={module.id}>
            <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {module.moduleName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {module.content}
                  </Typography>
                  {module.file && (
                 <Typography variant="body2" color="textSecondary" component="p">
                File Name: {module.file.filename}
                 </Typography>
            )&& (<Button
              variant="contained"
              color="primary"
              onClick={() => openFileInNewWindow(module.file.url)}
            >
              Open the document
            </Button>)}
            <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteModule(module._id)}
                >
                  Delete
                </Button>
            

                </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
          </Container>
   
  );
}


export default InstructorModulesView;


