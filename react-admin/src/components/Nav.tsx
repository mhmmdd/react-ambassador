import React from 'react';
import {Link} from 'react-router-dom';
import {User} from "../models/user";
import axios from "axios";
import {connect} from 'react-redux';

const Nav = (props: { user: User | null }) => {
    const logout = async () => {
        await axios.post('logout')
    }

    return (
        <div>
            <header
                className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company
                    name</a>
                <ul className="my-2 my-md-0 mr-md-3">
                    <Link to={'/profile'}
                          className="p-2 text-white text-decoration-none">{props.user?.first_name} {props.user?.last_name}</Link>
                    <Link to={'/login'} className="p-2 text-white text-decoration-none" onClick={logout}>Sign out</Link>
                </ul>
            </header>
        </div>
    );
};

// Get the events from the other components
const mapStateToProps = (state : {user: User}) => ({
  user: state.user
});

export default connect(mapStateToProps)(Nav) ;
