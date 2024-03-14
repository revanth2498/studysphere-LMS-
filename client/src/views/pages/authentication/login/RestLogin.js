import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import configData from '../../../../config';
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    Grid
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

// project imports
import useScriptRef from '../../../../hooks/useScriptRef';
import AnimateButton from '../../../../ui-component/extended/AnimateButton';
import { ACCOUNT_INITIALIZE } from './../../../../store/actions';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { IconBrandGoogle } from '@tabler/icons';
// import { Toast } from 'react-toastify/dist/components';
import { toast} from 'react-toastify';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
// style constant

const useStyles = makeStyles((theme) => ({
    redButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        color: theme.palette.grey[700],
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    signDivider: {
        flexGrow: 1
    },
    signText: {
        cursor: 'unset',
        margin: theme.spacing(2),
        padding: '5px 56px',
        borderColor: theme.palette.grey[100] + ' !important',
        color: theme.palette.grey[900] + '!important',
        fontWeight: 500
    },
    loginIcon: {
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '8px'
        }
    },
    loginInput: {
        ...theme.typography.customInput
    }
}));

//============================|| API JWT - LOGIN ||============================//

const RestLogin = (props, { ...others }) => {
    const classes = useStyles();
    const dispatcher = useDispatch();
    const [data, setData] = useState({
        username: '',
        userPassword: ''
    });

    const scriptedRef = useScriptRef();
    const [checked, setChecked] = React.useState(true);

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const history = useHistory();
    const handleSubmit1 = async () => {
        // URL
        sessionStorage.clear();
        //const url = Paths.Routes.Login.url;
        const url='http://localhost:8000/Auth/login'
        const payload = { username: data.username, password: data.userPassword };
        const response = await axios.post(url, payload);
        console.log(response);
        // toast.success('Hellow');
        if (response) {
            if (response.data.Status === 'S') {
                // Redirect the user
                // for now show the toast
                //document.cookie = "userame=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                console.log(response.data);
                 document.cookie = 'userType=' + response.data.AdditionalData.role;
                document.cookie='UserName='+data.username;
                toast.success(response.data.Message);
                console.log(document.cookie)
                sessionStorage.setItem('userType',response.data.AdditionalData.role)
                sessionStorage.setItem('UserName', response.data.AdditionalData.username)
                // Storing data in local storage
            // const data = {
            //     key:response.data.AdditionalData.username 
            //     };
            // sessionStorage.setItem("userName", JSON.stringify(response.data.AdditionalData.username));
            // sessionStorage.setItem("role", JSON.stringify(response.data.AdditionalData.role));    
            //     if (response.data.AdditionalData.role==='student'){
            //         history.push('/' + 'student' + '/courses');
            //     }
            //     else if (response.data.AdditionalData.role==='admin'){
            //         history.push('/' + 'admin' + '/courses');
            //     }
            //     else  if (response.data.AdditionalData.role==='instructor'){
            //         history.push('/' + 'instructor' + '/courses');
            //     }     

                history.push('/' + response.data.AdditionalData.role + '/courses');
                window.location.reload(false)
            } else {
                toast.error(response.data.Message);
            }
        } else {
            // kuch to karo
            toast.error('Facing network issues!!!');
        }
    };
    function handleGoogleSignin() {
        window.location.replace('http://localhost:8000/Auth/google');
    }

    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        axios
                            .post(configData.API_SERVER + 'users/login', {
                                password: values.password,
                                email: values.email
                            })
                            .then(function (response) {
                                if (response.data.success) {
                                    console.log(response.data);
                                    dispatcher({
                                        type: ACCOUNT_INITIALIZE,
                                        payload: { isLoggedIn: true, user: response.data.user, token: response.data.token }
                                    });
                                    if (scriptedRef.current) {
                                        setStatus({ success: true });
                                        setSubmitting(false);
                                    }
                                } else {
                                    setStatus({ success: false });
                                    setErrors({ submit: response.data.msg });
                                    setSubmitting(false);
                                }
                            })
                            .catch(function (error) {
                                setStatus({ success: false });
                                setErrors({ submit: error.response.data.msg });
                                setSubmitting(false);
                            });
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} className={classes.loginInput}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="text"
                                value={data.username}
                                name="Username"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    setData({ ...data, username: e.target.value });
                                }}
                                label="Username"
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.password && errors.password)} className={classes.loginInput}>
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={data.userPassword}
                                name="password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    setData({ ...data, userPassword: e.target.value });
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to={props.login ? '/forgotpassword' : '/forgotpassword'}
                                color="secondary"
                                sx={{ textDecoration: 'none' }}
                            >
                                Forgot Password?
                            </Typography>
                        </Stack>
                        {errors.submit && (
                            <Box
                                sx={{
                                    mt: 3
                                }}
                            >
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box
                            sx={{
                                mt: 2
                            }}
                        >
                            <Grid>
                                <Grid item xs={12}>
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => {
                                                console.log('jlsdnfjksdnfjksndfk');
                                                handleSubmit1();
                                            }}
                                        >
                                            Sign IN
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                                <br />
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button
                                            startIcon={<IconBrandGoogle />}
                                            size="large"
                                            variant="contained"
                                            color="secondary"
                                            fullWidth
                                            onClick={() => {
                                                handleGoogleSignin();
                                            }}
                                        >
                                            Google
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                )}
            </Formik>
            {/* <ToastContainer limit={3} /> */}
        </React.Fragment>
    );
};

export default RestLogin;
