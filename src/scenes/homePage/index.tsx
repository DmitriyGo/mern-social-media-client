import React, { FC } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import Navbar from '../navbar';
import { useAppSelector } from '../../store/hooks';
import UserWidget from '../../widgets/UserWidget';

interface HomePageProps {
}

type Props = HomePageProps;

const HomePage: FC<Props> = ({}) => {
    const isNonMobileScreens = useMediaQuery('(min-width: 1050px)');
    const { _id, picturePath } = useAppSelector(state => state.user);

    return (
        <Box>
            <Navbar />
            <Box
                width='100%'
                p='2rem 6%'
                display={isNonMobileScreens ? 'flex' : 'block'}
                gap='0.5rem'
                justifyContent='space-between'
            >
                <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>
                <Box
                    mt={isNonMobileScreens ? undefined : '2rem'}
                    flexBasis={isNonMobileScreens ? '42%' : undefined}
                >
                    {/*  next widget  */}
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis='26%'>

                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default HomePage;