import React, {useEffect, useState} from 'react';
import {useActions} from "../hooks/useActions.ts";
import {useTypedSelector} from "../hooks/useTypedSelector.ts";
import Loader from "../components/UI/Loader/Loader.tsx";

const UserProfile: React.FC = () => {
    const [userdataState, setUserdataState] = useState<object>({})

    const {
        data: userData,
        error: userError,
        loading: userLoading
    } = useTypedSelector(state => state.getUserInfoByToken);
    const {getUserInfoByToken} = useActions();

    useEffect(() => {
        getUserInfoByToken()
    }, []);

    useEffect(() => {
        if (userData.name.length > 0) {
            setUserdataState(userData)
        } else {
            setUserdataState({
                name: "undefined",
                email: "undefined",
                pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
                registeredAt: "undefined"
            })
        }
    }, [userData]);

    useEffect(() => {
        if (userError) {
            console.error(userError);
        }
    }, [userError]);

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
                                                    <img src={userdataState.pic}
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
                                                        <span>День рождения:</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                }
                            </section>
                        </div>
                        <div className="col-lg-9 p-0">
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserProfile;