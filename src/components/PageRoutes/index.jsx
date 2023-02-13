import { useEffect } from "react";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import NoAccessPage from "../../pages/NoAccessPage";
import RegisterPage from "../../pages/RegisterPage";
import UserPage from "../../pages/UserPage";
import { getAuthorizedUser } from "../../redux/actions/users";
import './styles.css';

const authorizedRoutes = [
    { path: '/', element: <MainPage />, exact: true },
    { path: '/:id', element: <UserPage />, exact: true },
];

const unAuthorizedRoutes = [
    { path: '*', element: <NoAccessPage />, exact: true },
    { path: '/register', element: <RegisterPage />, exact: true },
];


const PageRoutes = () => {
    let authorizedUser = useSelector(state => state.users.authorizedUser);
    let isLoading = useSelector(state => state.users.isAuthorizedUserLoading);
    const dispatch = useDispatch();

    // let token = sessionStorage.getItem(token);
    // if (token){
    //     dispatch(getAuthorizedUser());
    // }
        useEffect(() => {
            // dispatch(getAuthorizedUser(1));
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

    if (isLoading) {
        return (
            <div className="cnPageRoutesLoader">
                <Bars color="#000BFF" width={80} height={80} />
            </div>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                {authorizedUser ? authorizedRoutes.map((route) => <Route {...route} key={route.path} />) : unAuthorizedRoutes.map((route) => <Route {...route} />)}
                {/* <Route path="*" element={<NoAccessPage />} exact /> */}
            </Routes>
        </BrowserRouter>
    )
};

export default PageRoutes;
