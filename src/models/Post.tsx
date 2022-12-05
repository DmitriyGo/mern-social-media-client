export type IPost = {
    _id: string,
    userId: string,
    firstName: string,
    lastName: string,
    picturePath: string,
    userPicturePath: string,
    location: string,
    description: string,
    likes: Map<string, boolean>,
    comments: string[]
}