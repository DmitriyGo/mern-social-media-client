import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import axios from 'axios';
import { setPosts } from '../../store';
import { IPost } from '../../models/Post';
import PostWidget from './PostWidget';

interface PostsWidgetProps {
    userId: string,
    isProfile?: boolean
}

type Props = PostsWidgetProps;

const PostsWidget: FC<Props> = ({ userId, isProfile = false }) => {

    const dispatch = useAppDispatch();
    const posts = useAppSelector(state => state.posts);
    const token = useAppSelector(state => state.token);

    const getPosts = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, { headers: { Authorization: `Bearer ${token}` } });
        const data = await response.data;
        dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${userId}/posts`, { headers: { Authorization: `Bearer ${token}` } });
        const data = await response.data;
        dispatch(setPosts({ posts: data }));
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []);

    const mapPosts = (posts: IPost[]) => {
        const refactoredPosts = posts.map(({
                                               firstName,
                                               lastName,
                                               location,
                                               comments,
                                               likes,
                                               picturePath,
                                               userPicturePath,
                                               description,
                                               _id,
                                           }) => {
            return (<>

            </>);
        });

    };

    return (
        <>
            {posts.map(({
                            _id,
                            userId,
                            firstName,
                            lastName,
                            location,
                            comments,
                            likes,
                            picturePath,
                            userPicturePath,
                            description,
                        }: IPost) => {
                return <PostWidget
                    key={_id}
                    postId={_id}
                    postUserId={userId}
                    name={`${firstName} ${lastName}`}
                    description={description}
                    location={location}
                    picturePath={picturePath}
                    userPicturePath={userPicturePath}
                    comments={comments}
                    likes={likes}
                />;
            })}
        </>
    );
};

export default PostsWidget;