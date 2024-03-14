import MainCard from '../../../ui-component/cards/MainCard';
import BasicCard from './BasicCard';
import './courseList.scss';
import ApproveCourse from '../../Admin/ApproveCourse';

function CourseList() {
    const courses = [
        {
            coursename: 'Software Engineering',
            logo: 'iu',
            coursecode: 'se123',
            professorName: 'Kurt Seiffert',
            courselink: '/instructor/courses/se'
        },
        {
            coursename: 'Engineering Cloud Computing',
            logo: 'iu',
            coursecode: 'ecc1234',
            professorName: 'Digwen Tao',
            courselink: '/instructor/courses/ecc'
        },
        {
            coursename: 'Applied Algorithms',
            logo: 'iu',
            coursecode: 'apalgo',
            professorName: 'Oghuzan',
            courselink: '/instructor/courses/aa'
        }
    ]

    return (
        <MainCard>

            <div className="course-list">
                {courses.map((course) => (
                    <BasicCard course={course} />
                ))}
            </div>
        </MainCard>
    );
}

export default CourseList;
