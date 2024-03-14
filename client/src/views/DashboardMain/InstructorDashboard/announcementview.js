import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {useParams} from 'react-router-dom';


// Mock data - this would be fetched from an API in a real app
const mockAnnouncements = [
  {
    id: 1,
    title: 'Welcome to the course!',
    description: 'This is the beginning of a great learning journey!',
    date: '2023-01-01'
  },
  {
    id: 2,
    title: 'Exam schedule update',
    description: 'Please note the changes in the exam schedule.',
    date: '2023-02-15'
  },
  
];








function AnnouncementsView(props) {




  const [announcements, setAnnouncements] = useState([]);
  const params = useParams();
  



  useEffect(() => {
    console.log(
      "this is inside"
    )
    console.log(params.id)
    fetch(`http://localhost:8000/Course/getAnnouncementsByCourse/${params.id}`) // Replace with your API endpoint
            .then((response) => {
                return response.json();
            })
            .then((data) => {                
                console.log(data)
                setAnnouncements(data)              
            })
            .catch((error) => {
                console.log(error)
            });
  }, []);

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        {announcements.map((announcement) => (
          <Grid item xs={12} key={announcement.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  {announcement.announcementTitle}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {new Date(announcement.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" component="p">
                  {announcement.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AnnouncementsView;
