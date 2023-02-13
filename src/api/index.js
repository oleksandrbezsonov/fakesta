import { getPhotos, mutatePhoto } from './photos';
import { getUser, mutateUser } from './users';
import { login, register } from './auth';
import { getPostsByUser, mutatePosts } from './postsByUser';

export const api = {
    auth: {
        login,
        register,
    },
    photos: {
        getPhotos,
        mutatePhoto,
    },
    users: {
        getUser,
        mutateUser,
    },
    postsByUser: {
        getPostsByUser,
        mutatePosts,
    },
};
