import React from 'react';
import { useState } from 'react';
import AuthWrapper1 from '../pages/authentication/AuthWrapper1';
import AuthCardWrapper from '../pages/authentication/AuthCardWrapper';
import { Grid, TextField, FormHelperText, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../../ui-component/Logo';
import { useTheme } from '@material-ui/core';
import { Divider, Stack, Typography, useMediaQuery } from '@material-ui/core';
// import FormHelperText from '@material-ui/core';
// import Button from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

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

function ForgotPassowrdForm() {
    const classes = useStyles();

    // const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const [usernameError, setusernameError] = useState(false);
    const [otpError, setotpError] = useState(false);
    const [data, setData] = useState({
        username: '',
        otp: '',
        password: '',
        confirmPassword: ''
    });
    const [cond, setCond] = useState({
        username: true,
        otp: false,
        password: false,
        confirmPassword: false
    });
    const [passwordError, setPasswordError] = useState(false);
    const [currentState, setCurrentState] = useState('Default');
    const [disabledButton, setDisabledButton] = useState(false);
    const [buttonTextState, setButtonTextState] = useState({
        Default: 'Send OTP',
        afterOTPSent: 'Verify OTP',
        afterOTPVerified: 'Change Password'
    });
    async function sendOTP() {
        // Check if the otp was sent or not if yes then set the state
        const payload = { username: data.username };
        const isOtpSent = await axios.post('http://localhost:8000/Auth/requestOTP', payload);
        if (isOtpSent.data.Status == 'S') {
            console.log('HEREEKENNKJN');
            toast.success('OTP Sent Successfully!!');
            setCond({
                username: true,
                otp: true,
                password: true,
                confirmPassword: true
            });
            setCurrentState('afterOTPVerified');
        } else {
            // Display an error that otp was not sent
            toast.error('Error sending otp!!');
        }
    }
    async function verifyOTP() {
        let OTPVerified = true;
        if (OTPVerified) {
            setCond({
                username: true,
                otp: true,
                password: true,
                confirmPassword: true
            });
            setCurrentState('afterOTPVerified');
        } else {
            // wrong otp
        }
    }
    const history = useHistory();
    async function resetPassword() {
        const payLoad = {
            username: data.username,
            otp: data.otp,
            password: data.password,
            confirmPassword: data.confirmPassword
        };
        console.log(payLoad);
        if (data.otp == '') return;
        let passwordReset = await axios.post('http://localhost:8000/Auth/forgotPassword', payLoad);
        if (passwordReset.data.Status == 'S') {
            toast.success('Password reset successfull!');
            history.push('/login');
        } else {
            toast.error(passwordReset.data.Message);
        }
    }
    // async function resetPassword() {
    //     // Make an api call and when we get the response we would take further steps
    //     // setTimeout(() => {}, 300);
    //     const payLoad = {
    //         username: data.username,
    //         otp: data.otp,
    //         password: data.password,
    //         confirmpassword: data.confirmPassword
    //     };
    //     let passwordReset = await axios.post('http://localhost:8000/Auth/forgotPassword', payLoad);
    //     console.log('In hereewfds');

    //     if (passwordReset) {
    //         console.log('In Success');
    //         console.log(passwordReset);

    //         // Just redirect the user from here to the login page
    //         // if (passwordReset.data.Status == 'S') {
    //         //     toast.success('Successfully reseted your password!!');
    //         //     history.push('/login');
    //         // } else {
    //         //     toast.error((await passwordReset).data.Message);
    //         //     history.push('/login');
    //         // }
    //     } else {
    //         console.log('In error');
    //         toast.error('Encoutering network errors!!');
    //     }
    // }
    function handleClick() {
        console.log(currentState);
        switch (currentState) {
            case 'Default':
                sendOTP();
            case 'afterOTPSent':
                verifyOTP();
            case 'afterOTPVerified':
                resetPassword();
        }
    }

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                {cond.username ? (
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Username"
                            margin="normal"
                            name="username"
                            id="username"
                            type="text"
                            onBlur={() => {}}
                            value={data.username}
                            onChange={(e) => {
                                setData({ ...data, username: e.target.value });
                            }}
                            className={classes.loginInput}
                        />
                        {/* {usernameError ?
                        <FormHelperText error id="standard-weight-helper-text--register">
                            {"Enter a valid username "}
                        </FormHelperText>
                        : "slkdfmslkdmf"} */}
                    </Grid>
                ) : (
                    <></>
                )}
                {cond.otp ? (
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="OTP"
                            margin="normal"
                            name="otp"
                            id="otp"
                            type="text"
                            onBlur={() => {}}
                            value={data.otp}
                            onChange={(e) => {
                                setData({ ...data, otp: e.target.value });
                            }}
                            className={classes.loginInput}
                        />
                        {otpError ? (
                            <FormHelperText error id="standard-weight-helper-text--register">
                                {'Invalid OTP'}
                            </FormHelperText>
                        ) : (
                            ''
                        )}
                    </Grid>
                ) : (
                    ''
                )}
                {cond.password ? (
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Password"
                            margin="normal"
                            name="password"
                            id="password"
                            type="password"
                            onBlur={() => {}}
                            value={data.password}
                            onChange={(e) => {
                                // checkPassword()
                                setData({ ...data, password: e.target.value });
                            }}
                            className={classes.loginInput}
                            error={passwordError}
                        />
                        {passwordError ? (
                            <FormHelperText error id="standard-weight-helper-text--register">
                                {'Password should be of length 7-14 and must have atleast 1 Uppercase, 1 Lowercase character.'}
                            </FormHelperText>
                        ) : (
                            ''
                        )}
                    </Grid>
                ) : (
                    ''
                )}
                {cond.confirmPassword ? (
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            margin="normal"
                            name="cpassword"
                            id="cpassword"
                            type="password"
                            onBlur={() => {}}
                            value={data.confirmPassword}
                            onChange={(e) => {
                                // checkPassword()
                                setData({ ...data, confirmPassword: e.target.value });
                            }}
                            className={classes.loginInput}
                            error={passwordError}
                        />
                        {passwordError ? (
                            <FormHelperText error id="standard-weight-helper-text--register">
                                {'Password should be of length 7-14 and must have atleast 1 Uppercase, 1 Lowercase character.'}
                            </FormHelperText>
                        ) : (
                            ''
                        )}
                    </Grid>
                ) : (
                    ''
                )}
                <Grid item xs={12}>
                    <Button fullWidth color="secondary" size="large" variant="contained" onClick={handleClick}>
                        {buttonTextState[currentState]}
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default ForgotPassowrdForm;
