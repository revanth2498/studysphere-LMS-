

import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import Button from '@mui/material/Button';
import { TextField,Select, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';





function GraderView() {


  const [submissions, setSubmissions] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState(''); 
  const [sortOrder, setSortOrder] = useState('asc'); 

   const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredSubmissions = submissions.filter((submission) =>
    submission.submissions.some(
      (subItem) =>
        subItem.studentusername.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  const handleSortByChange = (event) => {
    const selectedSortBy = event.target.value;
    if (selectedSortBy === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(selectedSortBy);
      setSortOrder('asc'); 
    }
  };

  let sortedSubmissions = [...filteredSubmissions];
  if (sortBy === 'grade') {
    sortedSubmissions = sortedSubmissions.sort((a, b) => {
      const gradeA = a.submissions.reduce((acc, curr) => acc + (curr.grade || 0), 0) / a.submissions.length;
      const gradeB = b.submissions.reduce((acc, curr) => acc + (curr.grade || 0), 0) / b.submissions.length;
      return sortOrder === 'asc' ? gradeA - gradeB : gradeB - gradeA;
    });
  }

  

  const handleScoreChange = (event, submissionIndex, subItemIndex) => {
    const newSubmissions = [...submissions];
    newSubmissions[submissionIndex].submissions[subItemIndex].grade = event.target.value;
    setSubmissions(newSubmissions);
  };

  

 
  const handleSubmitGrade = async (submissionIndex, subItemIndex) => {
    try {
      const grade = submissions[submissionIndex].submissions[subItemIndex].grade;
      const submissionId = submissions[submissionIndex].submissions[subItemIndex]._id;
  
      const response = await fetch(`http://localhost:8000/Course/assignGrade/${submissionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ grade }), 
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit grade');
      }
      const updatedSubmission = await response.json();
      const updatedSubmissions = [...submissions];
      updatedSubmissions[submissionIndex].submissions[subItemIndex].grade = updatedSubmission.submission.grade;
      setSubmissions(updatedSubmissions);
      console.log(`Grade submitted for submission ${submissionIndex}, sub item ${subItemIndex}: ${grade}`);
    } catch (error) {
      console.error('Error submitting grade:', error);
    }
  };
  
  

  
  const params = useParams();
  

  

  const openFileInNewWindow = (fileUrl) => {
    const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}`;
    window.open(googleDocsViewerUrl, '_blank');
  };

  
  

  useEffect(() => {
    console.log("this is inside student modules")
    console.log(params.id)
    console.log(params.assignmentid)
    fetch(`http://localhost:8000/Course/getSubmissionsForAssignment/${params.assignmentid}`) 
            .then((response) => {
                return response.json();
            })
            .then((data) => {                
                console.log(data)
                setSubmissions(data)              
            })
            .catch((error) => {
                console.log(error)
            });
  }, []);


return (
  <Container maxWidth="md">
    <Typography variant="h4" component="h1" gutterBottom>
      GraderView
    </Typography>
    <Box display="flex" justifyContent="center" width="75%">

    <TextField
        label="Search by student username"
        variant="outlined"
        style={{ margin: '20px 0', width: '100%' }}
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <Select
        value={sortBy}
        onChange={handleSortByChange}
        style={{ margin: '20px 0', width: '200px' }}
        displayEmpty
        inputProps={{ 'aria-label': 'Sort By' }}
      >
        <MenuItem value="" disabled>
          Sort By
        </MenuItem>
        <MenuItem value="grade">Grade (Ascending)</MenuItem>
        <MenuItem value="grade">Grade (Descending)</MenuItem>
      </Select>
      </Box>
    <Grid container spacing={2}>
      {sortedSubmissions.map((submission, index) => (
        <Grid item xs={12} key={index}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {submission.assignmentFile && (
                    <Typography gutterBottom variant="h6">
                      File Name: {submission.assignmentFile.filename}
                    </Typography>
                  )}
                  {submission.assignmentFile && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        openFileInNewWindow(submission.assignmentFile.url)
                      }
                    >
                      View Assignment
                    </Button>
                  )}
                </Grid>
                {submission.submissions.map((subItem, subIndex) => (
      <Grid item xs={12} key={subIndex}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Name is {subItem.studentusername}
                    </Typography>
                    {subItem.studentSubmittedFile && (
                      <Typography gutterBottom variant="h6">
                        Submitted File: {subItem.studentSubmittedFile.filename}
                      </Typography>
                    )}
                    {subItem.studentSubmittedFile && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          openFileInNewWindow(subItem.studentSubmittedFile.url)
                        }
                      >
                        View Submission
                      </Button>
                    )}
        <TextField
          type="number"
          InputProps={{ inputProps: { min: 0, max: 100 } }}
          label={`Score for ${subItem.assignmentName}`}
          variant="outlined"
          style={{ width: '300px' }}
          value={subItem.grade || ''} 
          onChange={(event) => handleScoreChange(event, index, subIndex)} 
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSubmitGrade(index, subIndex)}
        >
          Submit Grade
        </Button>
      </Grid>
    ))}

              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);


}


export default GraderView;



