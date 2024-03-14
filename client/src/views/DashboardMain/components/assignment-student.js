
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField, Box, Select, MenuItem } from '@material-ui/core';




function StudentAssignmentView() {
  

  const [user,setUser]=useState('');
  const [modules, setModules] = useState([]);
  const [file, setFile] = useState(null);
  const [textEntry, setTextEntry] = useState('');
  const [url, setUrl] = useState('');
  const [file2, setFile2] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const [assignmentName,setAssignmentName]=useState('');


  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    padding: 4,
  };

  const handleOpenModal = (module) => {
    console.log(module)
    console.log(module.assignmentName)
    setAssignmentName(module.assignmentName)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);  
  };
  const handleFileChange = (event) => {
    console.log(event.target.files[0])
    setFile(event.target.files[0]);
  };

  const handleTextChange = (event) => {
    console.log(event.target.value)
    setTextEntry(event.target.value);
  };

  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setUrl(event.target.value);
  };

  const handleMediaChange = (event) => {
    console.log(event.target.files[0])
    setFile2(event.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('textEntry', textEntry);
  formData.append('url',url);
  formData.append('files', file);
  formData.append('files', file2);
  formData.append('username', user)
  formData.append('assignmentName',assignmentName)
    console.log(params.id)

      fetch(`http://localhost:8000/Course/uploadFileassignment/${params.id}`,{
          method: "POST",
          body: formData,
      }).then((response) => {
              return response.json();
          })
          .then((data) => {
            console.log(data)
              console.log(data.requests)
              setFile(null)
              setFile2(null)
              setTextEntry('')
              setUrl('')
          })
          .catch((error) => {
              console.log(error)
          });
    
  };
  

  

  const openFileInNewWindow = (fileUrl) => {
    const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}`;
    window.open(googleDocsViewerUrl, '_blank');
  };


  

  const [filterString, setFilterString] = useState('');
  const [sortType, setSortType] = useState('default');


  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  useEffect(() => {
    function getCookie(name) {
      const value = "; " + document.cookie;
      const parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
  }      
  const myCookieValue=sessionStorage.getItem('UserName')
  console.log(myCookieValue);
  setUser(myCookieValue)     
    fetch(`http://localhost:8000/Course/getAssignmentsByCourseIWithFiles/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        let sortedData = [...data]; 
       if (sortType === 'deadline_asc') {
          sortedData.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        } else if (sortType === 'deadline_desc') {
          sortedData.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
        }
        const filteredData = sortedData.filter(
          (module) =>
            module.assignmentName.toLowerCase().includes(filterString.toLowerCase())
        );
        setModules(filteredData);
      })
      .catch((error) => {
        console.log(error);
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
      {modules.map((module) => (
        <Grid item xs={12} sm={6} md={4} key={module.id}>
          <Card>
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                    {module.assignmentName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {module.deadline}
                  </Typography>
                  {module.assignmentFile && (
                 <Typography variant="body2" color="textSecondary" component="p">
                File Name: {module.assignmentFile.filename}
                 </Typography>
            )&& (<Button
              variant="contained"
              color="primary"
              onClick={() => openFileInNewWindow(module.assignmentFile.url)}
            >
              Open the document
            </Button>
            )}
              <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal(module)}
          >
            Submit Assignment
          </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
    >
      <div style={modalStyle}>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <textarea value={textEntry} onChange={handleTextChange} style={{ height: '400px' , width: '500px'}} />
          <input type="text" value={url} onChange={handleUrlChange} />
          <input type="file" accept="media_type" onChange={handleMediaChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </Modal>
  </Container>
   
  );
}


export default StudentAssignmentView;


// import React, { useState, useEffect } from 'react';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import { useParams } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import { TextField, Box, Select, MenuItem } from '@mui/material';
// import { useHistory } from 'react-router-dom';

// function InstructorGradesView() {
//   const [assignments, setAssignments] = useState([]);
//   const [filterString, setFilterString] = useState('');
//   const [sortType, setSortType] = useState('default');
//   const params = useParams();
//   const [loading, setLoading] = useState(true);
//   const history = useHistory();

//   const handleSortChange = (event) => {
//     setSortType(event.target.value);
//   };

//   const goToGrader = (assignmentId) => {
//     const newPath = `/grader/${assignmentId}`;
//     history.push(newPath);
//   };

//   useEffect(() => {
//     setLoading(true);
//     fetch(`http://localhost:8000/Course/getAssignmentSubmissions/${params.id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         let filteredAssignments = [...data];

//         if (sortType === 'deadline_asc') {
//           filteredAssignments.sort(
//             (a, b) => new Date(a.deadline) - new Date(b.deadline)
//           );
//         } else if (sortType === 'deadline_desc') {
//           filteredAssignments.sort(
//             (a, b) => new Date(b.deadline) - new Date(a.deadline)
//           );
//         }

//         filteredAssignments = filteredAssignments.filter((assignment) =>
//           assignment.assignmentName.toLowerCase().includes(filterString.toLowerCase())
//         );

//         setAssignments(filteredAssignments);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }, [params.id, sortType, filterString]);

//   return (
//     <Container maxWidth="md">
//       <Typography variant="h4" component="h1" gutterBottom>
//         Assignments
//       </Typography>
//       <Box display="flex" justifyContent="center" width="75%">
//         <TextField
//           onChange={(e) => {
//             setFilterString(e.target.value);
//           }}
//           label="Search Assignments"
//           variant="outlined"
//           value={filterString}
//           fullWidth
//         />
//         <Select
//           value={sortType}
//           onChange={handleSortChange}
//           displayEmpty
//           inputProps={{ 'aria-label': 'Sort' }}
//         >
//           <MenuItem value="default" disabled>
//             Sort by
//           </MenuItem>
//           <MenuItem value="deadline_asc">Deadline (Earliest)</MenuItem>
//           <MenuItem value="deadline_desc">Deadline (Latest)</MenuItem>
//         </Select>
//       </Box>
//       <Grid container spacing={2}>
//         {loading ? (
//           <Typography>Loading...</Typography>
//         ) : (
//           assignments.map((assignment) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={assignment.id}>
//               <Card style={{ height: '300px', width: '100%' }}>
//                 <CardContent>
//                   <Typography variant="h4" component="h1" gutterBottom>
//                     {assignment.assignmentName}
//                   </Typography>
//                   <Typography variant="h4" gutterBottom>
//                     DeadLineDate: {assignment.deadline}
//                   </Typography>
//                   {assignment.assignmentFile && (
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => goToGrader(assignment._id)}
//                     >
//                       GoToGrader
//                     </Button>
//                   )}
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         )}
//       </Grid>
//     </Container>
//   );
// }

// export default InstructorGradesView;
