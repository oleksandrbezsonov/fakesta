import { api } from "../../api";
import { mutatePhotoFailed } from "../actionCreators/photos";
import { createUserStarted, createUserSuccess, getAuthorizedUserFailed, getAuthorizedUserStarted, getAuthorizedUserSuccess, getUserFailed, getUserStarted, getUserSuccess, mutateUserStarted, mutateUserSuccess } from "../actionCreators/users";

export const getUser = (id) => {
    return async (dispatch) => {
        try {
            dispatch(getUserStarted());

            const response = await api.users.getUser(id);

            dispatch(getUserSuccess(response.data));
        } catch (error) {
            dispatch(getUserFailed(error));
        }
    };
};

export const getAuthorizedUser = (data) => {
    return async (dispatch) => {
        try {
            dispatch(getAuthorizedUserStarted());
            const response = await api.auth.login({data: data});
            sessionStorage.setItem("user", JSON.stringify(response.data)); //NEEDS TO BE REDONE, CAUSES SIDE EFFECT
            dispatch(getAuthorizedUserSuccess(response.data.user));

        } catch (error) {
            dispatch(getAuthorizedUserFailed(error));
        }
    };
};

export const mutateUser = (data, userId) => {
    return async (dispatch, getState) => {
        dispatch(mutateUserStarted());
        const state = getState();

        const newUser = { ...state.users.user, ...data };

        try {
            const response = await api.users.mutateUser({
                data: newUser,
                url: `/${userId}`,
            });

            dispatch(getUserSuccess(response.data));
        } finally {
            dispatch(mutateUserSuccess());
        }
    };
};

export const createUser = (data) => {
    return async (dispatch) => {
        dispatch(createUserStarted());

        try {
            const response = await api.auth.register({
                data: data,
            });

            dispatch(createUserSuccess(response.data));
        } finally {
            dispatch(createUserSuccess());
        }
    };
};
