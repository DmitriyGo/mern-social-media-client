import React, { FC, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';


const LoginPage = ({}) => {
    const [pageType, setPageType] = useState('register');
    const theme = useTheme();
    const isNonMobileScreen = useMediaQuery('(min-width: 1000px)');

    const setPageTypeHandler = (type: string) => {
        setPageType(type)
    }

    return (
        <Box>
           <Box
               width='100%'
               bgcolor={theme.palette.background.alt}
               p='1rem 6%'
               textAlign='center'
           >
               <Typography
                   fontWeight='bold'
                   fontSize='32px'
                   color='primary'
               >
                   Social Media
               </Typography>
           </Box>

            <Box
                width={isNonMobileScreen ? '50%' : '93%'}
                p='2rem'
                m=' 1.5rem auto'
                borderRadius='1.5rem'
                bgcolor={theme.palette.background.alt}
            >
                <Typography
                    fontWeight='500'
                    variant='h5'
                    sx={{
                        mb: '1.5rem'
                    }}
                >
                    Welcome to my Social Media
                </Typography>
                {pageType === 'register'
                    ?
                    <RegisterForm setPageType={setPageTypeHandler}/>
                    :
                    <LoginForm setPageType={setPageTypeHandler}/>
                }
            </Box>
        </Box>
    );
};

export default LoginPage;