import React, {SyntheticEvent, useEffect, useState} from 'react';
import Layout from '../components/Layout';
import {Button, TextField} from '@mui/material';
import axios, {AxiosResponse} from 'axios';
import {User} from '../models/user';

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  useEffect(() => {
    (
        async () => {
          await axios.get('user').then((res: AxiosResponse<User>) => {
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setEmail(res.data.email);
          });
        }
    )();
  }, []);

  const infoSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put('users/info', {
      first_name: firstName,
      last_name: lastName,
      email: email,
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

export default Profile;
