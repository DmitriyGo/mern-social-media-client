import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Box, Button, Divider, IconButton, InputBase, Typography, useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';
import { setPosts } from '../../store';
import WidgetWrapper from '../../components/WidgetWrapper';
import FlexBetween from '../../components/FlexBetween';
import UserImage from '../../components/UserImage';
import {
    AttachFileOutlined,
    DeleteOutlined,
    EditOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined, MoreHorizOutlined,
} from '@mui/icons-material';
import Dropzone from 'react-dropzone';

interface MyPostWidgetProps {
    picturePath: string;
}

type Props = MyPostWidgetProps;

const MyPostWidget: FC<Props> = ({ picturePath }) => {

    const dispatch = useAppDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState('');
    const { palette } = useTheme();
    const { _id } = useAppSelector(state => state.user);
    const token = useAppSelector(state => state.token);
    const isNonMobileScreen = useMediaQuery('(min-width: 1050px)');
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/posts`, formData,{
            headers: { Authorization: `Bearer ${token}` },
        });

        const posts = await response.data;
        console.log(posts);
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
    };


    return (
        <WidgetWrapper>
            <FlexBetween gap='1.5rem'>
                <UserImage image={picturePath} />
                <InputBase
                    placeholder="What's on your mind..."
                    onChange={event => setPost(event.target.value)}
                    value={post}
                    sx={{
                        width: '100%',
                        backgroundColor: palette.neutral.light,
                        borderRadius: '2rem',
                        padding: '1rem 2rem',
                    }}
                />
            </FlexBetween>
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius='5px'
                    mt='1rem'
                    p='1rem'
                >
                    <Dropzone
                        accept={{
                            'image/*': ['.jpeg', '.png'],
                        }}
                        multiple={false}
                        onDrop={(acceptedFiles) =>
                            setImage(acceptedFiles[0])
                        }
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p='0.75rem'
                                    width='100%'
                                    sx={{ '&:hover': { cursor: 'pointer' } }}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Add Image Here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton
                                        sx={{
                                            ml: '0.75rem',
                                            p: '0.75rem',
                                        }}
                                        onClick={() => setImage(null)}
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: '1.25rem 0' }} />

            <FlexBetween>
                <FlexBetween
                    sx={{ cursor: 'pointer' }}
                    gap='0.25rem'
                    onClick={() => setIsImage(prevIsImage => !prevIsImage)}
                >
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{
                            '&:hover': {
                                cursor: 'pointer',
                                color: medium,
                            },
                        }}
                    >
                        Image
                    </Typography>
                </FlexBetween>

                {isNonMobileScreen ? (
                    <>
                        <FlexBetween gap='0.25rem' sx={{ cursor: 'pointer' }}>
                            <GifBoxOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain} sx={{
                                '&:hover': {
                                    cursor: 'pointer',
                                    color: medium,
                                },
                            }}>Clip</Typography>
                        </FlexBetween>

                        <FlexBetween gap='0.25rem' sx={{ cursor: 'pointer' }}>
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain} sx={{
                                '&:hover': {
                                    cursor: 'pointer',
                                    color: medium,
                                },
                            }}>Attachment</Typography>
                        </FlexBetween>

                        <FlexBetween gap='0.25rem' sx={{ cursor: 'pointer' }}>
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain} sx={{
                                '&:hover': {
                                    cursor: 'pointer',
                                    color: medium,
                                },
                            }}>Audio</Typography>
                        </FlexBetween>


                    </>
                ) : (
                    <FlexBetween gap='0.25rem'>
                        <MoreHorizOutlined sx={{ color: mediumMain }} />
                    </FlexBetween>
                )}

                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.neutral.light,
                        backgroundColor: palette.primary.main,
                        borderRadius: '3rem',
                    }}
                >
                    POST
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default MyPostWidget;