import React, { useState,useEffect } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import { Button, Grid, InputLabel, OutlinedInput } from '@material-ui/core';
import { TextField } from '@mui/material';
import {useParams} from 'react-router-dom';


export default function ModuleCreation() {

     
  const [module, setModule] = useState({
      moduleName:'',
      content:'',
      file: null,
    });

  const [user,setUser]=useState('')
  const params = useParams();

  

  useEffect(() => {
      function getCookie(name) {
          const value = "; " + document.cookie;
          const parts = value.split("; " + name + "=");
          if (parts.length == 2) return parts.pop().split(";").shift();
      }
      
      
      const myCookieValue=sessionStorage.getItem('UserName')
      console.log(myCookieValue);
      setUser(myCookieValue)
      
  }, []);

  const handleFileChange = (event) => {
    console.log(event.target.files[0])
    setModule({ ...module, file: event.target.files[0] });
    console.log(module)
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
     console.log(event)
     console.log(module)
     const formData = new FormData();
  formData.append('moduleName', module.moduleName);
  formData.append('content', module.content);
  formData.append('file', module.file);
  formData.append('instructorId', user);
   

      fetch(`http://localhost:8000/Course/createFilealongwithModule/${params.id}`,{
          method: "POST",
          body: formData,
      }).then((response) => {
              return response.json();
          })
          .then((data) => {
            console.log(data)
              console.log(data.requests)
              setModule({
                moduleName:'',
              content:'',
               file:null
            })
          })
          .catch((error) => {
              console.log(error)
          });
      
  
  
    }


  return (
      <MainCard>
          <Grid container spacing={2}>
              <Grid item xs={12} >
                  <InputLabel>Module name</InputLabel>
                  <OutlinedInput
                      name="name"
                      value={module.moduleName}
                      onChange={(e) => {
                          setModule({ ...module, moduleName: e.target.value });
                      }}
                  />
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="description">Module Description</InputLabel>
                 <TextField
                   id="description"
                  name="description"
                  value={module.content}
                  onChange={(e) => {
                  setModule({ ...module, content: e.target.value });
                 }}
                 multiline
                rows={4} 
                variant="outlined"
              fullWidth/>
            </Grid>
            <Grid item xs={12}>
                 <label>
                    File Upload:
                     <input
                        type="file"
                        onChange={handleFileChange}
                        required/>
                </label>
            </Grid>
              <Grid item xs={12}>
                  <Button onClick={handleSubmit} style={{ backgroundColor: '#6935A5', color: 'white' }}>Submit</Button>
              </Grid>
          </Grid>

      </MainCard>
  );
}