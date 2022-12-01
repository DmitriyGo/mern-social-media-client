import React, { FC, useState } from 'react';
import * as yup from 'yup';
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useAppDispatch } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import Dropzone, { useDropzone } from 'react-dropzone';
import FlexBetween from '../../components/FlexBetween';
import { EditOutlined } from '@mui/icons-material';
import FormButtons from './formButtons';

const schema = yup.object().shape({
    firstName: yup.string().required('required'),
    lastName: yup.string().required('required'),
    email: yup.string().email('invalid email').required('required'),
    password: yup.string().min(6, 'min length - 6 characters').required('required'),
    location: yup.string().required('required'),
    occupation: yup.string().required('required'),
    picture: yup.string().required('required'),
});

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: '',
    occupation: '',
    picture: '',
};


const LoginForm = ({ setPageType }: { setPageType(type: string): void }) => {

    const { palette } = useTheme();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery('(min-width: 600px');


    return (
        <Formik
            onSubmit={async (values, { resetForm }) => {
                const formData = new FormData();

                for (const key in values) {
                    formData.append(key, values[key]);
                }

                formData.append('picturePath', (values.picture as any).name);

                const savedUserResponse = await fetch('https://mern-social-media-server-dg.herokuapp.com/auth/register', {
                    method: 'POST',
                    body: formData,
                });

                const savedUser = await savedUserResponse.json();
                resetForm();

                if (savedUser) {
                    setPageType('login');
                }
            }}
            initialValues={initialValues}
            validationSchema={schema}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  resetForm,
              }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display='grid'
                        gap='30px'
                        gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                        sx={{
                            '& > div': {
                                gridColumn: isNonMobile ? undefined : 'span 4',
                            },
                        }}
                    >
                        <>
                            <TextField
                                label='First Name'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name='firstName'
                                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                                sx={{ gridColumn: 'span 2' }}
                            />
                            <TextField
                                label='Last Name'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name='lastName'
                                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                                sx={{ gridColumn: 'span 2' }}
                            />
                            <TextField
                                label='Location'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.location}
                                name='location'
                                error={Boolean(touched.location) && Boolean(errors.location)}
                                helperText={touched.location && errors.location}
                                sx={{ gridColumn: 'span 4' }}
                            />
                            <TextField
                                label='Occupation'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.occupation}
                                name='occupation'
                                error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                helperText={touched.occupation && errors.occupation}
                                sx={{ gridColumn: 'span 4' }}
                            />
                            <Box
                                gridColumn='span 4'
                                border={`1px solid ${palette.neutral.medium}`}
                                borderRadius='5px'
                                p='1rem'
                            >
                                <Dropzone
                                    accept={{
                                        'image/*': ['.jpeg', '.png'],
                                    }}
                                    multiple={false}
                                    onDrop={(acceptedFiles) =>
                                        setFieldValue('picture', acceptedFiles[0])
                                    }
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p='0.75rem'
                                            sx={{ '&:hover': { cursor: 'pointer' } }}
                                        >
                                            <input {...getInputProps()} />
                                            {!values.picture ? (
                                                <p>Add Picture Here</p>
                                            ) : (
                                                <FlexBetween>
                                                    <Typography>{(values.picture as any).name}</Typography>
                                                    <EditOutlined />
                                                </FlexBetween>
                                            )}
                                        </Box>
                                    )}
                                </Dropzone>
                            </Box>
                            <TextField
                                label='Email'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name='email'
                                error={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: 'span 4' }}
                            />
                            <TextField
                                label='Password'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name='password'
                                error={Boolean(touched.password) && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: 'span 4' }}
                            />
                        </>

                    </Box>
                    <FormButtons formType='register' setPageType={setPageType} resetForm={resetForm} />
                </form>
            )}
        </Formik>
    );
};

export default LoginForm;