import Layout from "../../components/Layout";
import axios from 'axios'

import RegisterForm from "../../components/RegisterForm/RegisterForm";

import { useDispatch, useSelector } from "react-redux";
import { getAuthorizedUser, createUser } from "../../redux/actions/users";

const RegisterPage = () => {

    const authorizedUser = useSelector(state => state.users.authorizedUser);
    const isLoading = useSelector(state => state.users.isAuthorizedUserLoading);
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        dispatch(createUser(values));
    }

    const onFinishFailed = (errorInfo) => {
        console.log('failed', errorInfo)
    }

    return (
        <Layout>
            <RegisterForm
                onFinishFailed={onFinishFailed}
                onFinish={onFinish}
            ></RegisterForm>
        </Layout>
    )
}

export default RegisterPage;