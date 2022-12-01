import React, { FC } from 'react';
import { Box } from '@mui/material';
import Navbar from '../navbar';

interface HomePageProps {
}

type Props = HomePageProps;

const HomePage: FC<Props> = ({}) => {
    return (
        <Box>
            <Navbar/>
        </Box>
    );
};

export default HomePage;