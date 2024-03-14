import React, { useState,useEffect } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import { Button, Grid, InputLabel, OutlinedInput } from '@material-ui/core';
import { TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useParams} from 'react-router-dom';


export default function AssignmentCreation() {

     
  const [assignment, setAssignment] = useState({
      assignmentName:'',
      content:'',
      file: null,
      deadline:''
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
    setAssignment({ ...assignment, file: event.target.files[0] });
    console.log(assignment)
  };

//   const handleMediaChange = (event) => {
//     console.log(event.target.files[0])
//     setAssignment({ ...assignment, mediaSubmission: event.target.files[0] });
//     console.log(assignment)
//   };


  const handleSubmit = async (event) => {
    event.preventDefault();
     console.log(event)
     console.log(assignment)
     const formData = new FormData();
  formData.append('assignmentName', assignment.assignmentName);
  formData.append('assignmentContentDisplayed', assignment.content);
  formData.append('file', assignment.file);
  formData.append('deadline',assignment.deadline)
  formData.append('instructorId', user);
      fetch(`http://localhost:8000/Course/createFileassignment/${params.id}`,{
          method: "POST",
          body: formData,
      }).then((response) => {
              return response.json();
          })
          .then((data) => {
            console.log(data)
              console.log(data.requests)
              setAssignment({
                assignmentName:'',
              content:'',
               file:null,
               deadline:''
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
                  <InputLabel>Assignment name</InputLabel>
                  <OutlinedInput
                      name="name"
                      value={assignment.assignmentName}
                      onChange={(e) => {
                          setAssignment({ ...assignment, assignmentName: e.target.value });
                      }}
                  />
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="description">Assignment Description</InputLabel>
                 <TextField
                   id="description"
                  name="description"
                  value={assignment.content}
                  onChange={(e) => {
                  setAssignment({ ...assignment, content: e.target.value });
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
            <Grid item xs={12} >
                  <InputLabel>Deadline</InputLabel>
                  <OutlinedInput
                      type="date"
                      value={assignment.deadline}
                      onChange={(e) => {
                          setAssignment({ ...assignment, 
                            deadline: e.target.value });
                      }}
                  />
              </Grid>
              <Grid item xs={12}>
                  <Button onClick={handleSubmit} style={{ backgroundColor: '#6935A5', color: 'white' }}>Submit</Button>
              </Grid>
          </Grid>

      </MainCard>
  );
}