// import React, { useState, useEffect } from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import Container from '@mui/material/Container';
// import {useParams} from 'react-router-dom';




// function AnnouncementsView(props) {




//   const [announcements, setAnnouncements] = useState([]);
//   const params = useParams();
  

//   useEffect(() => {
//     console.log(
//       "this is inside"
//     )
//     console.log(params.id)
//     fetch(`http://localhost:8000/Course/getAnnouncementsByCourse/${params.id}`) 
//             .then((response) => {
//                 return response.json();
//             })
//             .then((data) => {                
//                 console.log(data)
//                 setAnnouncements(data)              
//             })
//             .catch((error) => {
//                 console.log(error)
//             });
//   }, []);

//   return (
//     <Container maxWidth="md">
//       <Grid container spacing={2}>
//         {announcements.map((announcement) => (
//           <Grid item xs={12} key={announcement.id}>
//             <Card variant="outlined">
//               <CardContent>
//                 <Typography variant="h5" component="h2">
//                   {announcement.instructorId}
//                 </Typography>
//                 <Typography color="textSecondary" gutterBottom>
//                   {new Date(announcement.date).toLocaleDateString()}
//                 </Typography>
//                 <Typography variant="body2" component="p">
//                   {announcement.text}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }

// export default AnnouncementsView;

import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

function AnnouncementsView(props) {
  const [announcements, setAnnouncements] = useState([]);
  const [filterString, setFilterString] = useState('');
  const [sortType, setSortType] = useState('default');
  const params = useParams();

  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  useEffect(() => {
    fetch(`http://localhost:8000/Course/getAnnouncementsByCourse/${params.id}`)
      .then((response) => response.json())
      .then((data) => {

        let filteredAnnouncements = [...data];

    filteredAnnouncements = filteredAnnouncements.filter((announcement) =>
      announcement.text.toLowerCase().includes(filterString.toLowerCase())
    );

    if (sortType === 'date_asc') {
      filteredAnnouncements.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (sortType === 'date_desc') {
      filteredAnnouncements.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    setAnnouncements(filteredAnnouncements);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ params.id,sortType, filterString]); 
 
  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="center" width="75%">
        <TextField
          onChange={(e) => {
            setFilterString(e.target.value);
          }}
          label="Search Announcements"
          variant="outlined"
          value={filterString}
          fullWidth
        />
        <Select
          value={sortType}
          onChange={handleSortChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Sort' }}
        >
          <MenuItem value="default" disabled>
            Sort by
          </MenuItem>
          <MenuItem value="date_asc">Date (Oldest)</MenuItem>
          <MenuItem value="date_desc">Date (Newest)</MenuItem>
        </Select>
      </Box>
      <Grid container spacing={2}>
        {announcements.map((announcement) => (
          <Grid item xs={12} key={announcement.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  {announcement.instructorId}
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

