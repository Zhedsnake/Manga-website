import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context";
import Loader from "../UI/Loader/Loader.tsx";
import {useTypedSelector} from "../../hooks/useTypedSelector.ts";
import {Tokens} from "../../util/setTocken.ts";

const LeftPanel: React.FC = () => {
    const {isUser, isAuthLoading} = useContext(AuthContext);

    const [userImg, setUserImg] = useState<string>("")
    const [name, setName] = useState("")

    const {data: smallUserInfoByToken, error: smallUserInfoByTokenError} = useTypedSelector(state => state.getSmallUserInfoByToken);

    useEffect(() => {
        if ( "pic" && "name" in smallUserInfoByToken) {
            setUserImg(smallUserInfoByToken.pic);
            setName(smallUserInfoByToken.name);
        }
    }, [smallUserInfoByToken]);

    useEffect(() => {
        if (smallUserInfoByTokenError) {
            if (smallUserInfoByTokenError === "Токен устарел") {
                localStorage.removeItem(Tokens.userToken)
            }
        }
    }, [smallUserInfoByTokenError]);


    return (
        <div className="col-sm-4 m-0 p-0">
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
                                            <>
                                                <img src={userImg} alt={"Картинка пользователя"}/>
                                                <br/>
                                                <div>{name}</div>
                                            </>
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