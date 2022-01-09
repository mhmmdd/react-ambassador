import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import {Button, TextField} from '@mui/material';
import axios, {AxiosResponse} from 'axios';
import {Navigate, useParams} from 'react-router-dom';
import {Product} from '../../models/product';

const ProductForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      (
          async () => {
            await axios.get(`products/${id}`).
                then((res: AxiosResponse<Product>) => {
                  setTitle(res.data.title);
                  setDescription(res.data.description);
                  setPrice(res.data.price);
                  setImage(res.data.image);
                });
          }
      )();
    }
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const data = {
      title, description, image, price,
    };

    if(id) {
      await axios.put(`products/${id}`, data).then((res) => {
        setRedirect(true);
      });
    } else {
      await axios.post(`products`, data).then((res) => {
        setRedirect(true);
      });
    }
  };

  if (redirect) {
    return <Navigate to={'/products'}/>;
  }

  return (
      <Layout>
        <form onSubmit={submit}>
          <div className={'mb-3'}>
            <TextField label={'Title'}
                       value={title}
                       onChange={e => setTitle(e.target.value)}/>
          </div>
          <div className={'mb-3'}>
            <TextField label={'Description'} rows={4} multiline
                       value={description}
                       onChange={e => setDescription(e.target.value)}/>
          </div>
          <div className={'mb-3'}>
            <TextField label={'Image'}
                       value={image}
                       onChange={e => setImage(e.target.value)}/>
          </div>
          <div className={'mb-3'}>
            <TextField label={'Price'} type={'number'}
                       value={price}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
                         setPrice(e.target.valueAsNumber);
                       }}/>
          </div>
          <Button variant={'contained'} color={'primary'}
                  type={'submit'}>Submit</Button>
        </form>
      </Layout>
  );
};

export default ProductForm;
