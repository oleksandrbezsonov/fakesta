import Layout from "../../components/Layout";
import axios from 'axios'
import AuthForm from '../../components/AuthForm'
import { useDispatch, useSelector } from "react-redux";
import { getAuthorizedUser } from "../../redux/actions/users";

const NoAccessPage = () => {

    const authorizedUser = useSelector(state => state.users.authorizedUser);
    const isLoading = useSelector(state => state.users.isAuthorizedUserLoading);
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        dispatch(getAuthorizedUser(values));
    }

    const onFinishFailed = (errorInfo) => {
        console.log('failed', errorInfo)
    }

    return (
        <Layout>
            <AuthForm
                onFinishFailed={onFinishFailed}
                onFinish={onFinish}
            ></AuthForm>
        </Layout>
    )
}

export default NoAccessPage;