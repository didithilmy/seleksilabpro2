/**
 * Home route
 * This page is the home page
 *
 * @author Muhammad Aditya Hilmy, NIM 18217025
 */

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';


export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            find_by: 'name',
            label_width: 50,
            dropdown_open: false,
            dropdown_anchor: null,
            dropdown_label: 'Name'
        }
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <div style={{width: 100}}>
                            <Button
                                aria-label="Account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={(e) => this.open_search_selector(e)}
                                color="inherit"
                            >
                                {this.state.dropdown_label}
                                <ArrowDropDown />
                            </Button>
                            <Menu
                                id="menu-appbar"
                                anchorEl={this.state.dropdown_anchor}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={this.state.dropdown_open}
                                onClose={() => this.close_search_selector()}
                            >
                                <MenuItem onClick={() => this.pick_search_selector('name', 'Name')}>Name</MenuItem>
                                <MenuItem onClick={() => this.pick_search_selector('nim', 'NIM')}>NIM</MenuItem>
                            </Menu>
                        </div>
                        <div>
                            <Paper style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: 300,
                                marginLeft: '16px'
                            }}>
                                <InputBase
                                    placeholder="Search student"
                                    inputProps={{ 'aria-label': 'Search student' }}
                                    style={{marginLeft: 16, flex: 1}}
                                />
                                <IconButton aria-label="Search">
                                    <SearchIcon />
                                </IconButton>
                                <Divider />
                            </Paper>
                        </div>
                    </Toolbar>
                </AppBar>
                <div style={{padding: 24}}>
                    <Paper style={{backgroundColor: 'white'}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>NIM TPB</TableCell>
                                    <TableCell>NIM</TableCell>
                                    <TableCell>Study Program</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </div>
        );
    }

    pick_search_selector(selector, label) {
        this.setState({
            find_by: selector,
            dropdown_label: label
        });

        this.close_search_selector();
    }

    open_search_selector(e) {
        this.setState({
            dropdown_anchor: e.currentTarget,
            dropdown_open: true
        });
    }

    close_search_selector() {
        this.setState({
            dropdown_anchor: null,
            dropdown_open: false
        });
    }
};