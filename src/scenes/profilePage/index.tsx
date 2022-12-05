import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

import Navbar from '../navbar';
import { Box, useMediaQuery } from '@mui/material';
import UserWidget from '../widgets/UserWidget';
import FriendListWidget from '../widgets/FriendListWidget';
import MyPostWidget from '../widgets/MyPostWidget';
import PostsWidget from '../widgets/PostsWidget';


interface ProfilePageProps {
}

type Props = ProfilePageProps;

const ProfilePage: FC<Props> = ({}) => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useAppSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []);

    if (!user) return null;

    return (
        <Box>
            <Navbar />
            <Box
                width='100%'
                padding='2rem 6%'
                display={isNonMobileScreens ? 'flex' : 'block'}
                gap='2rem'
                justifyContent='center'
            >
                <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
                    <UserWidget userId={userId} picturePath={user.picturePath} />
                    <Box m='2rem 0' />
                    <FriendListWidget userId={userId} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? '42%' : undefined}
                    mt={isNonMobileScreens ? undefined : '2rem'}
                >
                    <MyPostWidget picturePath={user.picturePath} />
                    <Box m='2rem 0' />
                    <PostsWidget userId={userId} isProfile />
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;