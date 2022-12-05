import React, { FC, useEffect } from 'react';
import WidgetWrapper from '../../components/WidgetWrapper';
import { Box, Typography, useTheme } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import axios from 'axios';
import { setFriends } from '../../store';
import Friend from '../../components/Friend';

interface FriendListWidgetProps {
    userId: string
}

type Props = FriendListWidgetProps;

const FriendListWidget: FC<Props> = ({userId}) => {

    const dispatch = useAppDispatch();
    const { palette } = useTheme();
    const token = useAppSelector(state => state.token);
    const friends = useAppSelector((state) => state.user.friends);

    const getFriends = async () => {
        const response = await axios.get(
            `http://localhost:3001/users/${userId}/friends`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        const data = await response.data;
        dispatch(setFriends({ friends: data }));
    };

    useEffect(() => {
        getFriends();
    }, []);

    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant='h5'
                fontWeight='500'
                sx={{ mb: '1.5rem' }}
            >
                Friend List
            </Typography>
            <Box display='flex' flexDirection='column' gap='1.5rem'>
                {friends.map((friend) => (
                    <Friend
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default FriendListWidget;