import React, {Dispatch, SyntheticEvent, useEffect, useState} from 'react';
import Layout from '../components/Layout';
import {Button, TextField} from '@mui/material';
import axios, {AxiosResponse} from 'axios';
import {User} from '../models/user';
import {connect} from 'react-redux';
import {setUserAction} from '../redux/actions/setUserAction';

const Profile = (props: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  useEffect(() => {
    setFirstName(props.user.first_name);
    setLastName(props.user.last_name);
    setEmail(props.user.email);
  }, [props.user]);

  const infoSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put('users/info', {
      first_name: firstName,
      last_name: lastName,
      email: email,
    }).then((res) => {
      props.setUser(res.data);
    });
  };

  const passwordSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put('users/password', {
      password: password,
      password_confirm: passwordConfirm,
    });
  };

  return (
      <Layout>
        <h3>Account Information</h3>
        <form onSubmit={infoSubmit}>
          <div className={'mb-3'}>
            <TextField label={'First Name'} value={firstName}
                       onChange={e => setFirstName(e.target.value)}/>
          </div>
          <div className={'mb-3'}>
            <TextField label={'Last Name'} value={lastName}
                       onChange={e => setLastName(e.target.value)}/>
          </div>
          <div className={'mb-3'}>
            <TextField label={'Email'} value={email}
                       onChange={e => setEmail(e.target.value)}/>
          </div>

          <Button variant={'contained'}
                  color={'primary'} type={'submit'}>Submit</Button>
        </form>

        <h3 className={'mt-4'}>Change Password</h3>
        <form onSubmit={passwordSubmit}>
          <div className={'mb-3'}>
            <TextField label={'Password'} type={'password'}
                       onChange={e => setPassword(e.target.value)}/>
          </div>
          <div className={'mb-3'}>
            <TextField label={'Password Confirm'} type={'password'}
                       onChange={e => setPasswordConfirm(e.target.value)}/>
          </div>

          <Button variant={'contained'}
                  color={'primary'} type={'submit'}>Submit</Button>
        </form>
      </Layout>
  );
};

// Get the events from the other components
const mapStateToProps = (state: { user: User }) => ({
  user: state.user,
});

// Send an event to the other components
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUser: (user: User) => dispatch(setUserAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
