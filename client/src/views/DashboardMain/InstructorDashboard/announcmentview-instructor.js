// import React, { useState, useEffect } from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import Container from '@mui/material/Container';
// import {useParams} from 'react-router-dom';
//import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';





// function AnnouncementsView(props) {




//   const [announcements, setAnnouncements] = useState([]);
//   const params = useParams();
//   const [courseLoading,setCourseLoading] =useState(true);
//   const [loading, setLoading] = useState(true);

//   const Decision = async (announcement) => {
//     console.log(announcement._id)
//         fetch(`http://localhost:8000/Course/delete/${announcement._id}`) 
//             .then((response) => {
//                 return response.json();
//             })
//             .then((data) => {
//                 setCourseLoading(loading=>!loading)
//                 console.log(data)
//             })
//             .catch((error) => {
//                 console.log(error)
//             });
//   }
  

//   useEffect(() => {
//     console.log("this is inside")
//     console.log(params.id)
//     fetch(`http://localhost:8000/Course/getAnnouncementsByCourse/${params.id}`) // Replace with your API endpoint
//             .then((response) => {
//                 return response.json();
//             })
//             .then((data) => {                
//                 console.log(data)
//                 setAnnouncements(data)
//                 setLoading(false);              
//             })
//             .catch((error) => {
//                 console.log(error)
//             });
//   }, [announcements]);


//   return (
//     <Container maxWidth="md">
//       <Grid container spacing={2}>
//         {announcements.map((announcement) => (
//           <Grid item xs={12} key={announcement._id}>
//             <Card variant="outlined">
//               <CardContent>
//               <Box display="flex" justifyContent="space-between" alignItems="center">
//                   <Box>
//                 <Typography variant="h5" component="h2">
//                   {announcement.announcementTitle}
//                 </Typography>
//                 <Typography color="textSecondary" gutterBottom>
//                   {new Date(announcement.date).toLocaleDateString()}
//                 </Typography>
//                 <Typography variant="body2" component="p">
//                   {announcement.text}
//                 </Typography>
//                 </Box>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={() => Decision(announcement)}
//                 >
//                   Delete
//                 </Button>
//                 </Box>
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
import Button from '@mui/material/Button';

function AnnouncementsView(props) {
  const [announcements, setAnnouncements] = useState([]);
  const [filterString, setFilterString] = useState('');
  const [sortType, setSortType] = useState('default');
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  const handleDelete = async (announcementId) => {
    try {
      const response = await fetch(`http://localhost:8000/Course/delete/${announcementId}`);
      const data = await response.json();
      console.log(data);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/Course/getAnnouncementsByCourse/${params.id}`);
      const data = await response.json();

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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.id, sortType, filterString]);

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="center" width="75%" mb={2}>
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
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          announcements.map((announcement) => (
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
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(announcement._id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default AnnouncementsView;


