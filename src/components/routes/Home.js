/**
 * Home route
 * This page is the home page
 *
 * @author Muhammad Aditya Hilmy, NIM 18217025
 */

import React from 'react';
import Cookies from 'universal-cookie';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
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
import LinearProgress from '@material-ui/core/LinearProgress';
import api from '../../api';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const cookie = new Cookies();
const PER_PAGE = 15;

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            find_by: 'name',
            label_width: 50,
            dropdown_open: false,
            dropdown_anchor: null,
            dropdown_label: 'Nama',
            page: 0,
            records: [],
            query: '',
            active_query: '',
            loading: false
        }
    }

    componentDidMount() {
        let token = cookie.get("token");
        if(!token) {
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <div>
                <AppBar position="static" style={{alignItems: 'left'}} elevation={0}>
                    <div style={{padding: 6}}>
                        <Container style={{padding: 0}} maxWidth="md">
                            <Grid container alignItems="center">
                                <Grid item>
                                    <form onSubmit={(e) => this.do_search(e)}>
                                        <Paper style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: 400,
                                            marginLeft: '24px'
                                        }}>
                                            <div>
                                                <Button
                                                    aria-controls="menu-appbar"
                                                    aria-haspopup="true"
                                                    onClick={(e) => this.open_search_selector(e)}
                                                    color="inherit"
                                                    style={{marginLeft: 8}}>
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
                                                    <MenuItem onClick={() => this.pick_search_selector('name', 'Nama')}>Nama</MenuItem>
                                                    <MenuItem onClick={() => this.pick_search_selector('nim', 'NIM')}>NIM</MenuItem>
                                                </Menu>
                                            </div>
                                            <Divider style={{
                                                width: 1,
                                                height: 28,
                                                margin: 4,
                                            }} />
                                            <InputBase
                                                placeholder="Cari mahasiswa"
                                                inputProps={{ 'aria-label': 'Search student' }}
                                                style={{marginLeft: 8, flex: 1}}
                                                value={this.state.query}
                                                onChange={e => this.setState({ query: e.target.value })}
                                            />
                                            <IconButton aria-label="Search" type='submit'>
                                                <SearchIcon />
                                            </IconButton>
                                            <Divider />
                                        </Paper>
                                    </form>
                                </Grid>
                                <Grid style={{flexGrow: 1}}></Grid>
                                <Grid item>
                                    <Button style={{color: 'white'}} onClick={() => this.logout()}>Logout</Button>
                                </Grid>
                            </Grid>

                        </Container>
                    </div>
                </AppBar>
                <Container style={{padding: 24}} maxWidth="md">
                    <Paper style={{backgroundColor: 'white'}}>
                        {this.state.loading && <LinearProgress />}
                        {!this.state.loading && <div style={{height: 4}}></div>}
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Nama</TableCell>
                                    <TableCell>NIM TPB</TableCell>
                                    <TableCell>NIM</TableCell>
                                    <TableCell>Program Studi</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.records.map((row, i) => (
                                    <TableRow key={row.nim_tpb}>
                                        <TableCell style={{color: '#aaaaaa'}}>{(this.state.page * PER_PAGE) + (i + 1)}.</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell>{row.nim_tpb}</TableCell>
                                        <TableCell>{row.nim_jur}</TableCell>
                                        <TableCell>{row.prodi}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <IconButton
                            disabled={this.state.page === 0}
                            onClick={(e) => this.prev_page(e)}
                            color="primary"
                            component="span">
                            <NavigateBeforeIcon />
                        </IconButton>
                        <small>{this.state.page + 1}</small>
                        <IconButton
                            disabled={this.state.records.length < PER_PAGE}
                            onClick={(e) => this.next_page(e)}
                            color="primary"
                            component="span">
                            <NavigateNextIcon />
                        </IconButton>
                    </Paper>
                </Container>
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

    do_search(e) {
        e.preventDefault();
        if(!this.state.query) return;

        this.load_results(0, this.state.query);
    }

    load_results(page, query) {
        let token = cookie.get("token");

        this.setState({
            loading: true
        });

        if(this.state.find_by === 'name') {
            api.by_name(token, query, page, PER_PAGE).then((results) => {
                console.log(results);
                this.setState({
                    records: results,
                    loading: false,
                    page: page,
                    active_query: query
                });
            }).catch((e) => {
                console.log(e);
                this.setState({
                    loading: false
                });
            });
        } else {
            api.by_id(token, query, page, PER_PAGE).then((results) => {
                console.log(results);
                this.setState({
                    records: results,
                    loading: false,
                    page: page,
                    active_query: query
                });
            }).catch((e) => {
                console.log(e);
                this.setState({
                    loading: false
                });
            });
        }
    }

    next_page(e) {
        e.preventDefault();
        if(!this.state.active_query) return;

        let page = this.state.page + 1;

        this.load_results(page, this.state.active_query);
    }

    prev_page(e) {
        e.preventDefault();
        if(!this.state.active_query) return;
        let page = Math.max(0, this.state.page - 1);

        this.load_results(page, this.state.active_query)
    }

    logout() {
        cookie.set("token", '');
        this.props.history.push('/login');
    }
}

export default Home;