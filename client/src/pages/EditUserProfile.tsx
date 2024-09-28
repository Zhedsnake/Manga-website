import React, {useContext, useEffect} from 'react';
import {useTypedSelector} from "../../../buffer/client/src/hooks/reduxHooks/useTypedSelector.ts";
import EditName from "../components/EditUserInfo/EditName.tsx";
import EditEmail from "../components/EditUserInfo/EditEmail.tsx";
import {useActions} from "../../../buffer/client/src/hooks/reduxHooks/useActions.ts";
import EditPassword from "../components/EditUserInfo/EditPassword.tsx";
import EditAvatar from "../components/EditUserInfo/EditAvatar.tsx";
import {Link} from "react-router-dom";
import {EditUserInfoContext, EditUserInfoContextType} from "../contexts/EditUserInfoContext.ts";

const EditUserProfile : React.FC = () => {
    const {
        message,
        setMessage
    } = useContext<EditUserInfoContextType>(EditUserInfoContext);

    //! Патом переделать под redux toolkit
    
    const {message: nameMessage, error: nameError} = useTypedSelector(state => state.nameForm);
    const {message: emailMessage, error: emailError} = useTypedSelector(state => state.emailForm);
    const {message: passwordMessage, error: passwordError} = useTypedSelector(state => state.passwordForm);
    const {message: avatarMessage, error: avatarError} = useTypedSelector(state => state.avatarForm);
    const {defEditAvatar, defEditName, defEditEmail, defEditPassword} = useActions();


    useEffect(() => {
        if (avatarMessage) {
            setMessage(avatarMessage)
        }

        if (nameMessage) {
            setMessage(nameMessage)
        }

        if (emailMessage) {
            setMessage(emailMessage)
        }

        if (passwordMessage) {
            setMessage(passwordMessage)
        }
    }, [nameMessage, passwordMessage, emailMessage, avatarMessage]);

    useEffect(() => {
        if (message) {
            defEditAvatar()
            defEditName()
            defEditEmail()
            defEditPassword()
        }
    }, [message]);

    useEffect(() => {
        if (avatarError) {
            setMessage("")
        }

        if (nameError) {
            setMessage("")
        }

        if (emailError) {
            setMessage("")
        }

        if (passwordError) {
            setMessage("")
        }

    }, [avatarError, nameError, emailError, passwordError]);


    return (
        <div className="container">
            <section>
                <div className="container">

                    <div className="row">
                        <Link to={`/user-profile`}>
                            <button
                                className="btn btn-primary"
                            >
                                Вернутся к странице профиля
                            </button>
                        </Link>
                    </div>

                    {message &&
                        <div className="row">{message}</div>
                    }
                    <div className="row">
                        <div className="col-md-6 col-xl-3">
                            <EditAvatar/>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <EditName/>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <EditEmail/>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <EditPassword/>
                        </div>
                        {/*<div className="col-md-6 col-xl-3">*/}
                        {/*    <form>*/}
                        {/*        <div className="mb-3">*/}
                        {/*            <label htmlFor="AboutTextarea" className="form-label">О себе</label>*/}
                        {/*            <textarea className="form-control" id="AboutTextarea" rows="3"></textarea>*/}
                        {/*        </div>*/}
                        {/*    </form>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EditUserProfile;