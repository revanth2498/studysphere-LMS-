import { StudentDash } from './Student';
import { InstructorDash } from './Instructor';
import { AdminDash } from './Admin';

//-----------------------|| MENU ITEMS ||-----------------------//

const identifyUser = () => {
    const userType = document.cookie.split(';');
    const cookieData = {};
    for (let i = 0; i < userType.length; i++) {
        cookieData[userType[i].split('=')[0]] = userType[i].split('=')[1];
    }
    // const role = sessionStorage.getItem("role");
     return cookieData['userType'];
    // return role;
};

const getMenuItemByUser = () => {
    const userType = sessionStorage.getItem('userType');
    console.log(userType);
    let menuItems = [];
    if (userType === 'student') {
        menuItems = [StudentDash];
    } else if (userType === 'instructor') {
        menuItems = [InstructorDash];
    } else {
        menuItems = [AdminDash];
    }
    return menuItems;
};

const menuItems = {
    items: getMenuItemByUser()
};

export default menuItems;
