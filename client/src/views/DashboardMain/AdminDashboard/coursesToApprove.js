// import MainCard from '../../../ui-component/cards/MainCard';
// import BasicCard from './BasicCard';
// import './courseList.scss';
// import ApproveCourse from '../../Admin/ApproveCourse';

// function CoursesToApprove() {
//     const courses = [
//         {
//             coursename: 'Software Engineering',
//             logo: 'iu',
//             coursecode: 'se123',
//             professorName: 'Kurt Seiffert',
//             courselink: '/instructor/courses/se',
//             _id: '3'
//         },
//         {
//             coursename: 'Engineering Cloud Computing',
//             logo: 'iu',
//             coursecode: 'ecc1234',
//             professorName: 'Digwen Tao',
//             courselink: '/instructor/courses/ecc',
//             _id: '2'
//         },
//         {
//             coursename: 'Applied Algorithms',
//             logo: 'iu',
//             coursecode: 'apalgo',
//             professorName: 'Oghuzan',
//             courselink: '/instructor/courses/aa',
//             _id: '1'
//         }
//     ]

//     return (
//         <MainCard>
//             <div className="course-list">
//                 {courses.map((course) => (
//                     <ApproveCourse course={course} />
//                 ))}
//             </div>
//         </MainCard>
//     );
// }

// export default CoursesToApprove;
import React, { useState, useEffect } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import './courseList.scss';
import ApproveCourse from '../../Admin/ApproveCourse';

function CoursesToApprove() {
    const [courses, setCourses] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [courseLoading,setCourseLoading] =useState(true);
    

    const Decision = async (decision, course) => {
       
          
        if(decision=='approve'){
            fetch(`http://localhost:8000/requests/approve/${course._id}`,
            {method: 'POST'}) 
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setCourseLoading(loading=>!loading)
                    console.log(data)
                })
                .catch((error) => {
                    console.log(error)
                });

        }
        else{
            fetch(`http://localhost:8000/requests/deny/${course._id}`,
            {method: 'POST'}) 
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setCourseLoading(loading=>!loading)
                    console.log(data)
                })
                .catch((error) => {
                    console.log(error)
                });

        }
    }

    useEffect(() => {
        fetch('http://localhost:8000/requests/allRequests') 
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                
                console.log(data.requests)
               var filterCourses=data.requests.filter((course)=>course.approved=='New')
                console.log(filterCourses)

                setCourses(filterCourses); 
                

                console.log(courses)
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [courseLoading]); 
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <MainCard>
            <div className="course-list">
                {courses.map((course) => (
                    <ApproveCourse key={course._id} course={course} Decision={Decision}/>
                ))}
            </div>
        </MainCard>
    );
}

export default CoursesToApprove;
