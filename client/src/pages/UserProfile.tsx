import React, {useEffect, useState} from 'react';
import {useActions} from "../hooks/useActions.ts";
import {useTypedSelector} from "../hooks/useTypedSelector.ts";
import Loader from "../components/UI/Loader/Loader.tsx";
import {Link} from "react-router-dom";
import {defUserInfoByToken} from "../store/action-creators/getUserInfoByToken.ts";

const UserProfile: React.FC = () => {
    const [userdataState, setUserdataState] = useState({})

    const {
        name,
        email,
        pic,
        picWebp,
        registeredAt,
        birthday,
        error: userError,
        loading: userLoading
    } = useTypedSelector(state => state.getUserInfoByToken);
    const {getUserInfoByToken, defUserInfoByToken} = useActions();

    useEffect(() => {
        getUserInfoByToken()
    }, []);

    useEffect(() => {
        setUserdataState({
            name,
            email,
            pic,
            picWebp,
            registeredAt,
            birthday
        })
    }, [name]);

    useEffect(() => {
        if (userError) {
            console.error(userError);
        }
    }, [userError]);

    useEffect(() => {
        return () => {
            defUserInfoByToken()
        };
    }, []);

    return (
        <div className="container">
            <section>
                <div className="container p-0">
                    <div className="row">
                        <div className="col-lg-3 p-0">
                            <section>
                                {
                                    userLoading
                                        ? <Loader/>
                                        :
                                        <div className="container p-0">
                                            <div className="row p-0">
                                                <div className="container p-0">
                                                    <img src={userdataState.picWebp || userdataState.pic}
                                                         style={{width: "50px", height: "50px"}}/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="container p-2">
                                                    <div className="row p-0">
                                                        <div className="col-6 p-0" style={{height: "50px"}}>
                                                            <span>Активность:</span>
                                                        </div>
                                                        <div className="col-6 p-0"
                                                             style={{height: "50px", textAlign: "right"}}>
                                                            <span>Активность:</span>
                                                        </div>
                                                    </div>
                                                    <div className="row p-0">
                                                        <div className="col-6 p-0" style={{height: "50px"}}>
                                                            <span>Регистрация:</span>
                                                        </div>
                                                        <div className="col-6 p-0"
                                                             style={{height: "50px", textAlign: "right"}}>
                                                            <span>{userdataState.registeredAt}</span>
                                                        </div>
                                                    </div>
                                                    <div className="row p-0">
                                                        <div className="col-6 p-0" style={{height: "50px"}}>
                                                            <span>Сообщения:</span>
                                                        </div>
                                                        <div className="col-6 p-0"
                                                             style={{height: "50px", textAlign: "right"}}>
                                                            <span>Сообщения:</span>
                                                        </div>
                                                    </div>
                                                    <div className="row p-0">
                                                        <div className="col-6 p-0" style={{height: "50px"}}>
                                                            <span>Симпатии:</span>
                                                        </div>
                                                        <div className="col-6 p-0"
                                                             style={{height: "50px", textAlign: "right"}}>
                                                            <span>Симпатии:</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="container p-2">
                                                    <div className="row p-0">
                                                        <div className="col-12 p-0" style={{height: "50px"}}>
                                                            <span>День рождения:</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 p-0"
                                                         style={{height: "50px", textAlign: "right"}}>
                                                        <span>{userdataState.birthday}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                }
                            </section>
                        </div>
                        <div className="col-lg-9 p-0">
                            <div className="row p-0">
                                <div className="col-lg-6 p-0">
                                    <div className="row p-0">
                                        <span>{userdataState.name}</span>
                                    </div>
                                    <div className="p-0 row">
                                        <div>
                                            <span>Пользователь, </span>
                                            <span>{userdataState.birthday}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 p-0">
                                    <div className="row">
                                        <div>
                                            <Link to={`/edit-user-profile`}>
                                                <button type="button" className="btn btn-light">
                                                    <span>Редактировать профиль</span>
                                                </button>
                                            </Link>
                                        </div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserProfile;