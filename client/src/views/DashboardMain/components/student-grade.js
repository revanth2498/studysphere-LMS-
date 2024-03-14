// import React ,{useEffect, useState }from 'react';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import {useParams} from 'react-router-dom';


// const StudentGrades = () => {
//   const [submissions, setSubmissions] = useState([]);
//   const params = useParams();
//   const [user,setUser]=useState('');


//   useEffect(() => {  
//     const myCookieValue=sessionStorage.getItem('UserName')
//     console.log(myCookieValue);
//     setUser(myCookieValue)       
//     console.log("this is inside student modules")
//     console.log(params.id)
//     fetch(`http://localhost:8000/Course/getCourseGrades/${params.id}`,{
//       method: "POST",
//       headers: {
//           "Content-Type":"application/json"
//       },
//       body: JSON.stringify({user:myCookieValue})
//   }).then((response) => {
//                 return response.json();
//             })
//             .then((data) => {                
//                 console.log(data)
//                 setSubmissions(data)              
//             })
//             .catch((error) => {
//                 console.log(error)
//             });
              
//   }, []);

//   return (
//     <Container maxWidth="md">
//     <Typography variant="h4" component="h1" gutterBottom>
//       Grades For Student
//     </Typography>
//     <Card>
//   <CardContent>
//     <Grid container spacing={2}>
//       <Grid item xs={12}>
//         {submissions.map((submission, index) => (
//           <Grid container spacing={2} key={index}>
//             <Grid item>
//               <Typography gutterBottom variant="h5" component="h2">
//                 {submission.assignmentName}
//               </Typography>
//             </Grid>
//             <Grid item>
//               <Typography gutterBottom variant="h5" component="h2">
//                 {submission.grade}
//               </Typography>
//             </Grid>
//           </Grid>
//         ))}
//       </Grid>
//     </Grid>
//   </CardContent>
// </Card>
//   </Container>
//   );
// };

// export default StudentGrades;


import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';

const StudentGrades = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const params = useParams();
  const [user, setUser] = useState('');
  const [searchText, setSearchText] = useState('');
  const [sortType, setSortType] = useState('default');

  useEffect(() => {
    const myCookieValue = sessionStorage.getItem('UserName');
    setUser(myCookieValue);

    fetch(`http://localhost:8000/Course/getCourseGrades/${params.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: myCookieValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        let filtered = [...data];
        filtered=filtered.filter((submission) =>
        submission.assignmentName.toLowerCase().includes(searchText)
      );

      if (sortType === 'grade_asc') {
        filtered.sort((a, b) => a.grade - b.grade);
      } else if (sortType === 'grade_desc') {
        filtered.sort((a, b) => b.grade - a.grade);
      }
      setSubmissions(filtered);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ params.id,sortType, searchText]);




  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  



  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Grades For Student
      </Typography>
      <Box display="flex" justifyContent="center" width="75%">
      <TextField
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        label="Search Assignments"
        variant="outlined"
        value={searchText}
        fullWidth
        // style={{ marginBottom: '20px' }}
      />
      <Select
        value={sortType}
        onChange={handleSortChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Sort' }}
      >
        <MenuItem value="default" disabled>
          Sort by Grade
        </MenuItem>
        <MenuItem value="grade_asc">Grade (Lowest)</MenuItem>
        <MenuItem value="grade_desc">Grade (Highest)</MenuItem>
      </Select>
      </Box>

      <Grid container spacing={2}>
        {submissions.map((submission, index) => (
          <Grid item xs={12} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {submission.assignmentName}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  Grade: {submission.grade}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StudentGrades;
