import React, { useState,useEffect } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import { Button, Grid, InputLabel, OutlinedInput } from '@material-ui/core';
import { TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function MakeCourse() {

    const [course, setCourse] = useState({
        name: '',
        description: '',
        code: '',
        instructorId:''
    });

    const [user,setUser]=useState('')

    

    useEffect(() => {
        function getCookie(name) {
            const value = "; " + document.cookie;
            const parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }
        
        
        const myCookieValue = getCookie('UserName');
        console.log(myCookieValue);
        setUser(myCookieValue)
        
    }, []);



    const handleSubmit = async () => {
        
        //post to backend
        console.log(course)
        fetch('http://localhost:8000/Course/addCourse',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...course,instructorId:user})
        }).then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data.requests)
                setCourse({name: '',
                description: '',
                code: '',
                instructorId:user})

                
                
            //    var filterCourses=data.requests.filter((course)=>course.approved=='New')
            //     console.log(filterCourses)

            //     setCourses(filterCourses); 
                

            //     // Assume the API returns an array of courses
            //     console.log(courses)
            //     setLoading(false);
            })
            .catch((error) => {
                console.log(error)
            });



    }


    return (
        <MainCard>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <InputLabel>Course Name</InputLabel>
                    <OutlinedInput
                        name="name"
                        value={course.name}
                        onChange={(e) => {
                            setCourse({ ...course, name: e.target.value });
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputLabel>Course Description</InputLabel>
                    <OutlinedInput
                        name="description"
                        value={course.description}
                        onChange={(e) => {
                            setCourse({ ...course, description: e.target.value });
                        }} />
                </Grid>
                <Grid item xs={12}>
                    <InputLabel>Course ID</InputLabel>
                    <OutlinedInput
                        name="id"
                        value={course.code}
                        onChange={(e) => {
                            setCourse({ ...course, code: e.target.value });
                        }} />
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={handleSubmit} style={{ backgroundColor: '#6935A5', color: 'white' }}>Submit</Button>
                </Grid>
            </Grid>

        </MainCard>
    );
}
