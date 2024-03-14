import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import iuLogo from '../IUlogo.jpeg';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';

export default function BasicCard({ course, onClick }) {

    const history = useHistory();

    const modifyUrl=(co)=>{
        const present=history.location.pathname;
        const modified=present+'/'+co
        history.push(modified)

    }
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardMedia component="img" height="300" elevation={10} image={iuLogo} alt="IU Logo" />
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {course.name}
                </Typography>
                
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {course.code}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {course.description}
                </Typography>
                <Typography variant="body2">
                    {course.instructorId}
                    <br />
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => modifyUrl(course._id)}>
                    Go to course
                </Button>
            </CardActions>
        </Card>
    );
}
