import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import configData from '../../../../config';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

// project imports
import useScriptRef from '../../../../hooks/useScriptRef';
import AnimateButton from './../../../../ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from '../../../../utils/password-strength';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import axios from 'axios';
import { toast } from 'react-toastify';
import { createUser } from '../../../messages/chat-app/chat-engine';
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

//===========================|| API JWT - REGISTER ||===========================//

const RestRegister = ({ ...others }) => {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const classes = useStyles();
    let history = useHistory();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState('');

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    const [passwordError, setPasswordError] = useState(false);

    const checkPassword = () => {
        const pwd = data.password;
        var constraints = /^[A-Za-z]\w{7,14}$/;
        if (!pwd.match(constraints)) {
            //If the password is not valid do something
            console.log('Invalid password');
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    const [emailError, setEmailError] = useState(false);
    const checkEmail = () => {
        const email = data.email;
        let isEmailOk = true;
        var constraints = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email.match(constraints)) {
            isEmailOk = false;
            setEmailError(true);
        } else {
            setEmailError(false);
        }
        if (isEmailOk) {
        }
    };

    const [usernameError, setUsernameError] = useState(false);
    const CheckUserName = async () => {
        if (data.username.length == 3) {
            // make an api call to the backend to check if the username is there in the backend
            // if yes then just make a popup
        }
    };

    async function handleSignUp() {
        const URI = 'http://localhost:8000/Auth/register';
        const payload = { username: data.username, email: data.email, password: data.password };
        const response = await axios.post(URI, payload);
        if (response) {
            if (response.data.Status == 'S') {
                createUser({username:data.username, secret: data.email, custom_json:JSON.stringify({username: data.username, email: data.email, password: data.password }) })
                toast.success(response.data.Message);
                history.push('/dashboard/default');
            } else {
                toast.error(response.data.Message);
            }
        }
    }

    return (
        <React.Fragment>
            <Grid container spacing={matchDownSM ? 0 : 2}>
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
                        error={data.username && Boolean('')}
                    />
                    {usernameError ? (
                        <FormHelperText error id="standard-weight-helper-text--register">
                            {'Username is already taken'}
                        </FormHelperText>
                    ) : (
                        ''
                    )}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        name="email"
                        id="email"
                        type="text"
                        onBlur={() => {}}
                        value={data.email}
                        onChange={(e) => {
                            checkEmail();
                            setData({ ...data, email: e.target.value });
                        }}
                        className={classes.loginInput}
                        error={emailError}
                    />
                    {emailError ? (
                        <FormHelperText error id="standard-weight-helper-text--register">
                            {''}
                        </FormHelperText>
                    ) : (
                        ''
                    )}
                </Grid>
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
                            checkPassword();
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
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        color="secondary"
                        size="large"
                        variant="contained"
                        onClick={() => {
                            handleSignUp();
                        }}
                    >
                        SIGN UP
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default RestRegister;
