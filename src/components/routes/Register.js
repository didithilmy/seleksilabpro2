/**
 * Register route
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
import Snackbar from '@material-ui/core/Snackbar';
import api from "../../api";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            snackbar_open: false,
            snackbar_text: '',
            username: '',
            password: ''
        }
    }

    render() {
        return (
            <div>
                <Grid container direction="row" alignItems="center" justify="center" style={{ minHeight: '100vh', backgroundColor: '#c2185b' }}>
                    <Grid item xs={12} align="center">
                        <Card className='login_card' style={{maxWidth: '400px'}}>
                            <CardContent align="left" style={{padding: '32px'}}>
                                <Typography variant="h5">Register</Typography>
                                <p>Create an account to use <s>Lamia</s> NIM finder</p>
                                <form onSubmit={(e) => this.submit_registration(e)}>
                                    <TextField
                                        id="outlined-name"
                                        label="Username"
                                        className='textfield'
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.username}
                                        onChange={evt => this.update_value('username', evt)}
                                        fullWidth />
                                    <TextField
                                        id="outlined-name"
                                        label="Password"
                                        className='textfield'
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.password}
                                        onChange={evt => this.update_value('password', evt)}
                                        type="password" />
                                    <Button variant="outlined" color="primary" style={{marginTop: '16px', width: '100%'}} type='submit'>
                                        Register
                                    </Button>
                                    <div style={{marginTop: '16px'}}>Or <NavLink to="/login">sign in</NavLink> if you have an account.</div>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.state.snackbar_open}
                    autoHideDuration={6000}
                    onClose={() => this.setState({snackbar_open: false})}
                    message={<div>{this.state.snackbar_text}</div>}
                />
            </div>
        );
    }

    submit_registration(e) {
        api.register(this.state.username, this.state.password).then(() => {
            console.log("User registered!");
            this.show_snackbar("You're registered now!");
            this.setState({
                username: '',
                password: ''
            });
        }).catch((e) => {
            console.log("Error: " + e.toString());
            this.show_snackbar(e.toString());
        });
        e.preventDefault();
    }

    update_value(key, evt) {
        let p = {};
        p[key] = evt.target.value;
        this.setState(p);
    }

    show_snackbar(text) {
        this.setState({
            snackbar_open: true,
            snackbar_text: text,
        });
    }
};