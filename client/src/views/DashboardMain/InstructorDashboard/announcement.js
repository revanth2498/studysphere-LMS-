import React, { useState,useEffect } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import { Button, Grid, InputLabel, OutlinedInput } from '@material-ui/core';
import { TextField } from '@mui/material';
import {useParams} from 'react-router-dom';


export default function MakeCourse() {

  const [announcement, setAnnouncement] = useState({
    instructorId:'',
    announcementTitle:'',
    text:''
  });
  const [user,setUser]=useState('')
  const params = useParams();

  

  

  useEffect(() => {
      const username = sessionStorage.getItem('UserName');
      console.log(username);
      setUser(username)
      
  }, []);



  const handleSubmit = async () => {
      fetch('http://localhost:8000/Course/makeAnnouncement',{
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({...announcement,instructorId:user,courseId:params.id})
      }).then((response) => {
              return response.json();
          })
          .then((data) => {
              console.log(data.requests)
              setAnnouncement({instructorId:user,
                announcementTitle:'',
                text:'',
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
                  <InputLabel>Title Name</InputLabel>
                  <OutlinedInput
                      name="name"
                      value={announcement.announcementTitle}
                      onChange={(e) => {
                          setAnnouncement({ ...announcement, announcementTitle: e.target.value });
                      }}
                  />
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="description">Announcement Description</InputLabel>
                 <TextField
                   id="description"
                  name="description"
                  value={announcement.text}
                  onChange={(e) => {
                  setAnnouncement({ ...announcement, text: e.target.value });
                 }}
                 multiline
                rows={4} 
                variant="outlined"
              fullWidth/>
            </Grid>
              <Grid item xs={12}>
                  <Button onClick={handleSubmit} style={{ backgroundColor: '#6935A5', color: 'white' }}>Submit</Button>
              </Grid>
          </Grid>

      </MainCard>
  );
}