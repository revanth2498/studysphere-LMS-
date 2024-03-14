
// import React, { useState, useEffect } from 'react';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import { useParams } from 'react-router-dom/cjs/react-router-dom';
// import Button from '@mui/material/Button';
// import { useHistory } from 'react-router-dom';



// function InstructorGradesView() {


//   const [assignments, setAssignments] = useState([]);
//   const [file, setFile] = useState(null);
//   const [textEntry, setTextEntry] = useState('');
//   const [url, setUrl] = useState('');
//   const [media, setMedia] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const history = useHistory();


  
//   const params = useParams();
  

  

//   const openFileInNewWindow = (fileUrl) => {
//     const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}`;
//     window.open(googleDocsViewerUrl, '_blank');
//   };
  
//   const goToGrader = (assignmentid) => {
//     const present=history.location.pathname;
//     console.log(present)
//     const newPath = present.replace(/\/assignments$/, '/grader');
//     const final=newPath+'/'+assignmentid
//     console.log(final)
//     history.push(final);

    
//   };

    
//   useEffect(() => {    
//     console.log("this is inside student modules")
//     console.log(params.id)
//     fetch(`http://localhost:8000/Course/getAssignmentSubmissions/${params.id}`) 
//             .then((response) => {
//                 return response.json();
//             })
//             .then((data) => {                
//                 console.log(data)
//                 setAssignments(data)              
//             })
//             .catch((error) => {
//                 console.log(error)
//             });
//   }, []);

//   return (
// <Container maxWidth="md">
//   <Typography variant="h4" component="h1" gutterBottom>
//     Assignments
//   </Typography>
//   <Grid container spacing={3}> 
//     {assignments.map((assignment,index) => (
//       <Grid item xs={12} sm={6} md={4} lg={3} key={module.id}> 
//         <Card style={{ height: '300px', width: '100%' }}> 
//           <CardContent>
//             <Typography variant="h4" component="h1" gutterBottom>
//           {assignment.assignmentName}
//             </Typography>
//             <Typography variant="h4" component="h1" gutterBottom>
//             {assignment.assignmentContentDisplayed}
//             </Typography>
//             <Typography variant="h4"  gutterBottom>
//             DeadLineDate:{assignment.deadline}
//             </Typography>
//             {assignment.assignmentFile && (
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={()=>goToGrader(assignment._id)}
//               >
//                 GoToGrader
//               </Button>
//             )}
//           </CardContent>
//         </Card>
//       </Grid>
//     ))}
//   </Grid>
// </Container>   
//   );
// }

// export default InstructorGradesView;

import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { TextField, Box, Select, MenuItem } from '@mui/material';
import { useHistory } from 'react-router-dom';

function InstructorGradesView() {
  const [assignments, setAssignments] = useState([]);
  const [filterString, setFilterString] = useState('');
  const [sortType, setSortType] = useState('default');
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };



    const goToGrader = (assignmentid) => {
    const present=history.location.pathname;
    console.log(present)
    const newPath = present.replace(/\/assignments$/, '/grader');
    const final=newPath+'/'+assignmentid
    console.log(final)
    history.push(final);    
  };

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/Course/getAssignmentSubmissions/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        let filteredAssignments = [...data];

        if (sortType === 'deadline_asc') {
          filteredAssignments.sort(
            (a, b) => new Date(a.deadline) - new Date(b.deadline)
          );
        } else if (sortType === 'deadline_desc') {
          filteredAssignments.sort(
            (a, b) => new Date(b.deadline) - new Date(a.deadline)
          );
        }

        filteredAssignments = filteredAssignments.filter((assignment) =>
          assignment.assignmentName.toLowerCase().includes(filterString.toLowerCase())
        );

        setAssignments(filteredAssignments);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [params.id, sortType, filterString]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Assignments
      </Typography>
      <Box display="flex" justifyContent="center" width="75%">
        <TextField
          onChange={(e) => {
            setFilterString(e.target.value);
          }}
          label="Search Assignments"
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
          <MenuItem value="deadline_asc">Deadline (Earliest)</MenuItem>
          <MenuItem value="deadline_desc">Deadline (Latest)</MenuItem>
        </Select>
      </Box>
      <Grid container spacing={2}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          assignments.map((assignment) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={assignment.id}>
              <Card style={{ height: '300px', width: '100%' }}>
                <CardContent>
                  <Typography variant="h4" component="h1" gutterBottom>
                    {assignment.assignmentName}
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    DeadLineDate: {assignment.deadline}
                  </Typography>
                  {assignment.assignmentFile && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => goToGrader(assignment._id)}
                    >
                      GoToGrader
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default InstructorGradesView;



