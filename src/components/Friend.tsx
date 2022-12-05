import React, { FC } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setFriends } from '../store';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';

interface FriendProps {
    friendId: string;
    name: string;
    subtitle: string;
    userPicturePath: string;
}

type Props = FriendProps;

const Friend: FC<Props> = ({ friendId, userPicturePath, subtitle, name }) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { _id } = useAppSelector(state => state.user);
    const token = useAppSelector(state => state.token);
    const friends = useAppSelector(state => state.user.friends);

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend = friends.find((friend) => friend._id === friendId);

    const patchFriend = async () => {
        const response = await axios.patch(`http://localhost:3001/users/${_id}/${friendId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.data;
        dispatch(setFriends({ friends: data }));
    };
    return (
        <FlexBetween>
            <FlexBetween gap='1rem'>
                <UserImage image={userPicturePath} size='55px' />
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant='h5'
                        fontWeight='500'
                        sx={{
                            '&:hover': {
                                color: palette.primary.light,
                                cursor: 'pointer',
                            },
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography
                        color={medium}
                        fontSize='0.75rem'
                    >
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            {friendId !== _id ? <IconButton
                onClick={() => patchFriend()}
                sx={{
                    backgroundColor: primaryLight,
                    p: '0.6rem',
                }}
            >
                {isFriend ? (
                    <PersonRemoveOutlined sx={{ color: primaryDark }} />
                ) : (
                    <PersonAddOutlined sx={{ color: primaryDark }} />
                )}
            </IconButton> : null}
        </FlexBetween>
    );
};

export default Friend;