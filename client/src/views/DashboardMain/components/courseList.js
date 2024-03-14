
import React, { useEffect, useState } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import { TextField, Box, Select, MenuItem } from '@material-ui/core';
import BasicCard from './BasicCard';
import './courseList.scss';

function CourseList() {
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState('');
    const [filterCourses, setFilterCourses] = useState([]);
    const [filterString, setFilterString] = useState('');
    const [sortType, setSortType] = useState('default');

    useEffect(() => {
        const myCookieValue = sessionStorage.getItem('UserName');
        setUser(myCookieValue);
        fetch(`http://localhost:8000/requests/coursesenrolled/${myCookieValue}`)
            .then((response) => response.json())
            .then((data) => {
                setCourses(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (Array.isArray(courses)) {
            let filteredData = [...courses];
        if (filterString) {
            filteredData = filteredData.filter((course) =>
                JSON.stringify(course).toLowerCase().includes(filterString.toLowerCase())
            );
        }

        if (sortType === 'name_asc') {
            console.log(filteredData)
            filteredData.sort((a, b) => {
                if (!a.name || !b.name) return 0;
                console.log(a.name.localeCompare(b.name))
                return a.name.localeCompare(b.name);
            });
        } else if (sortType === 'name_desc') {
            console.log(filteredData)
            filteredData.sort((a, b) => {
                if (!a.name || !b.name) return 0;
                console.log(b.name.localeCompare(a.name))

                return b.name.localeCompare(a.name);
            });
        }

        setFilterCourses(filteredData);
    }
    }, [filterString, sortType, courses]);

    const handleSortChange = (event) => {
        setSortType(event.target.value);
    };

    return (
        <MainCard>
            <Box display="flex" justifyContent="center" width="75%">
                <TextField
                    onChange={(e) => {
                        setFilterString(e.target.value);
                    }}
                    label="Search Courses"
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
                    <MenuItem value="name_asc">Name (A-Z)</MenuItem>
                    <MenuItem value="name_desc">Name (Z-A)</MenuItem>
                </Select>
            </Box>
            <div className="course-list">
                {filterCourses.length > 0 ? (
                    filterCourses.map((course, index) => (
                        <BasicCard key={index} course={course} />
                    ))
                ) : (
                    <p>No courses available</p>
                )}
            </div>
        </MainCard>
    );
}

export default CourseList;
   
    



