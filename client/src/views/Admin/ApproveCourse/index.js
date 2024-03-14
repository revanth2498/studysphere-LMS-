import React, { useState } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import { Button, Grid, InputLabel, OutlinedInput } from '@material-ui/core';
import { TextField } from '@mui/material';



export default function ApproveCourse({ course,Decision }) {
    

    return (
        <div id={course._id}>
            <MainCard>
                {/* Display class details */}
                <Grid container spacing={5}>
                    <Grid item xs={12} >
                        <h1>Course Name: </h1>
                        <div style={{ border: '2px solid #000', padding: '10px', width: '250px', borderRadius: '10px' }}>
                            {course.courseName}

                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <h1>Professor: </h1>
                        <div style={{ border: '2px solid #000', padding: '10px', width: '250px', borderRadius: '10px' }}>
                            {course.instructorId}

                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <h1>Course Id: </h1>
                        <div style={{ border: '2px solid #000', padding: '5px', width: '125px', borderRadius: '10px' }}>
                            {course.courseCode}

                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <Button style={{ backgroundColor: '#6935A5', color: 'white', marginRight: '50px' }} onClick={() => Decision("approve", course)}>Approve</Button>
                            <Button style={{ backgroundColor: '#6935A5', color: 'white', marginRight: '50px' }} onClick={() => Decision("Deny", course)}>Deny</Button>
                        </div>
                    </Grid>
                </Grid>

            </MainCard>
        </div>
    );
};

