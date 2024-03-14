import React, { useState,useEffect } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import { Button, Divider, Grid, InputLabel, OutlinedInput } from '@material-ui/core';
import { TextField } from '@mui/material';



// CourseData=>{pending:[{courseObjs}] , approved, denied}
export default function ApproveCourse(courseData) {    
    const [courses, setCourses] = useState([{}]);
    const [user,setUser]=useState('');
    useEffect(() => {             
        const myCookieValue = sessionStorage.getItem('UserName');
        console.log(myCookieValue);
        setUser(myCookieValue)
        console.log(user)
        fetch(`http://localhost:8000/requests/coursesInstructordeny/${myCookieValue}`) // Replace with your API endpoint
            .then((response) => {
                return response.json();
            })
            .then((data) => {                
                console.log(data)
                setCourses(data)              
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);


    return (
        <>
            <MainCard>
                <h3>Denied courses</h3>
                {courses.map((course) => {
                    return (<>
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
                                    <h1>Course Id: </h1>
                                    <div style={{ border: '2px solid #000', padding: '5px', width: '125px', borderRadius: '10px' }}>
                                    {course.courseCode}

                                    </div>
                                </Grid>
                            </Grid>

                        </MainCard>
                    </>)
                })}
            </MainCard>
        </>
    );
};