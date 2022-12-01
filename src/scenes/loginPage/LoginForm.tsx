import React, { FC, useState } from 'react';
import * as yup from 'yup';
import { Box, TextField, useMediaQuery, useTheme } from '@mui/material';
import { useAppDispatch } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import FormButtons from './formButtons';
import { setLogin } from '../../store';

const schema = yup.object().shape({
    email: yup.string().email('invalid email').required('required'),
    password: yup.string().min(6, 'min length - 6 characters').required('required'),
});

const initialValues = {
    email: '',
    password: '',
};

const LoginForm = ({ setPageType }: { setPageType(type: string): void }) => {

    // const { palette } = useTheme();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery('(min-width: 600px');

    return (
        <Formik
            onSubmit={async (values, { resetForm }) => {
                const loggedInResponse = await fetch(`https://mern-social-media-server-dg.herokuapp.com/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                });

                const loggedIn = await loggedInResponse.json();
                resetForm();

                if (loggedIn) {
                    dispatch(setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token,
                    }));
                    navigate('/home');
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
                    <FormButtons formType='login' setPageType={setPageType} resetForm={resetForm} />
                </form>
            )}
        </Formik>
    );
};
export default LoginForm;