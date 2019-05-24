/**
 * Login route
 * This page functions as a login page for user
 *
 * @author Muhammad Aditya Hilmy, NIM 18217025
 */

import React from 'react';
import {NavLink} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid container direction="row" alignItems="center" justify="center" style={{ minHeight: '100vh', backgroundColor: '#c2185b' }}>
                <Grid item xs={12} align="center">
                    <Card className='login_card' style={{maxWidth: '400px'}}>
                        <CardContent align="left" style={{padding: '32px'}}>
                            <Typography variant="h5">Sign in</Typography>
                            <p>Hi there, welcome to <s>Lamia</s> NIM finder! Please login or register to continue.</p>
                            <TextField
                                id="outlined-name"
                                label="Username"
                                className='textfield'
                                margin="normal"
                                variant="outlined"
                                fullWidth
                            />
                            <TextField
                                id="outlined-name"
                                label="Password"
                                className='textfield'
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                type="password"
                            />
                            <Button variant="outlined" color="primary" style={{marginTop: '16px', width: '100%'}}>
                                Sign in
                            </Button>
                            <div style={{marginTop: '16px'}}>Or <NavLink to="/register">register</NavLink> if you haven't</div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
};