import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import axios from 'axios';
import { setPost } from '../../store';
import WidgetWrapper from '../../components/WidgetWrapper';
import Friend from '../../components/Friend';
import FlexBetween from '../../components/FlexBetween';
import {
    ChatBubbleOutlined,
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from '@mui/icons-material';

interface PostWidgetProps {
    postId: string;
    postUserId: string;
    name: string;
    location: string;
    comments: string[];
    likes: Map<string, boolean>;
    picturePath: string;
    userPicturePath: string;
    description: string;
}

type Props = PostWidgetProps;

const PostWidget: FC<Props> = ({
                                   postUserId,
                                   postId,
                                   userPicturePath,
                                   picturePath,
                                   description,
                                   comments,
                                   name,
                                   likes,
                                   location,
                               }) => {

    const [isComments, setIsComments] = useState(false);

    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.token);
    const loggedInUserId = useAppSelector(state => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;


    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        const response = await axios.patch(`${import.meta.env.VITE_API_URL}/posts/${postId}/like`,
            JSON.stringify({ userId: loggedInUserId }),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

        const updatedPost = await response.data;
        dispatch(setPost({ post: updatedPost }));
    };

    return (
        <WidgetWrapper m='2rem 0'>
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography
                color={main}
                sx={{ mt: '1rem' }}
            >
                {description}
            </Typography>
            {picturePath && (
                <img
                    width='100%'
                    height='auto'
                    alt='post'
                    style={{
                        borderRadius: '0.75rem',
                        marginTop: '0.75rem',
                    }}
                    src={`${import.meta.env.VITE_API_URL}assets/${picturePath}`}
                />
            )}
            <FlexBetween mt='0.25rem'>
                <FlexBetween gap='1rem'>

                    <FlexBetween gap='0.3rem'>
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap='0.3rem'>
                        <IconButton onClick={() => setIsComments(isComments => !isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>

                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>

            </FlexBetween>
            {isComments && (
                <Box mt='0.5rem'>
                    {comments.map((comment, i) => (
                        <Box
                            key={`${name}-${i}`}
                        >
                            <Divider />
                            <Typography
                                sx={{
                                    color: main,
                                    m: '0.5rem 0',
                                    pl: '1rem',
                                }}
                            >
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                    <Divider/>
                </Box>
            )}
        </WidgetWrapper>
    );
};

export default PostWidget;