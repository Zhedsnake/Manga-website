import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context";
import Loader from "../UI/Loader/Loader.tsx";

const LeftPanel: React.FC = () => {
    const {isUser, isAuthLoading} = useContext(AuthContext);

    return (
        <div className="col-lg-4 m-0 p-0">
            <div className="container">
                <div className="row m-0 p-0">
                    <section data-empty-placeholder className="m-0 p-0">
                        {
                            isAuthLoading
                                ? (<Loader/>)
                                : (
                                    !isUser
                                        ? (
                                            <Link to={`/auth`}>
                                                <button
                                                    className="btn btn-primary"
                                                >
                                                    Регистрация
                                                </button>
                                            </Link>
                                        )
                                        : (
                                            <div>Сделайть панельку пользователя</div>
                                        )
                                )
                        }
                    </section>
                </div>
                <div className="m-2"></div>
                <div className="row m-0 p-0">
                    <section data-empty-placeholder className="m-0 p-0"></section>
                </div>
                <div className="m-2"></div>
                <div className="m-2"></div>
                <div className="row m-0 p-0">
                    <section data-empty-placeholder className="m-0 p-0"></section>
                </div>
                <div className="m-2"></div>
                <div className="row m-0 p-0">
                    <section data-empty-placeholder className="m-0 p-0"></section>
                </div>
            </div>
        </div>
    );
};

export default LeftPanel;