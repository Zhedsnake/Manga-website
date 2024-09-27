import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext.ts";
import Loader from "../UI/Loader/Loader.tsx";
import {useTypedSelector} from "../../../../buffer/client/src/__tests__/unit/hooks/reduxHooks/useTypedSelector.ts";
import {Tokens} from "../../util/Tokens.ts";

const LeftPanel: React.FC = () => {
    const {isUser, isAuthLoading} = useContext(AuthContext);

    const [userImg, setUserImg] = useState<string>("")
    const [name, setName] = useState("")

    const { data: smallUserInfoByToken, error: smallUserInfoByTokenError, loading: smallUserInfoByTokenLoading,} = useTypedSelector(state => state.getSmallUserInfoByToken);

    useEffect(() => {

        if ("name" in smallUserInfoByToken && "pic" in smallUserInfoByToken) {
            setUserImg(smallUserInfoByToken.pic);
            setName(smallUserInfoByToken.name);
        } else if ("name" in smallUserInfoByToken && "minPicWebp" in smallUserInfoByToken){
            setUserImg(smallUserInfoByToken.minPicWebp);
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
                                                {smallUserInfoByTokenLoading
                                                    ? <Loader/>
                                                    :
                                                    <Link to={`/user-profile`}>
                                                        <button>
                                                            <img src={userImg} alt={"Картинка пользователя"} style={{width: "80px", height: "80px"}}/>
                                                            <br/>
                                                            <div>{name}
                                                            </div>
                                                        </button>
                                                    </Link>
                                                }
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