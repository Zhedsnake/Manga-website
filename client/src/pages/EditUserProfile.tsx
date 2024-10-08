import React, {useContext, useEffect} from 'react';
import EditName from "../components/EditUserInfo/EditName";
import EditEmail from "../components/EditUserInfo/EditEmail";
import EditPassword from "../components/EditUserInfo/EditPassword";
import EditAvatar from "../components/EditUserInfo/EditAvatar";
import {Link} from "react-router-dom";
import {EditUserInfoContext, EditUserInfoContextType} from "../contexts/EditUserInfoContext";
import {useAppSelector} from "../hooks/reduxHooks-toolkit/useRedux";
import {defEditAvatar} from "../store/reducers/editUserInfo/avatarFormSlice";
import {defEditName} from "../store/reducers/editUserInfo/nameFormSlice";
import {defEditEmail} from "../store/reducers/editUserInfo/emailFormSlice";
import {defEditPassword} from "../store/reducers/editUserInfo/passwordFormSlice";

const EditUserProfile : React.FC = () => {
    const {
        message,
        setMessage
    } = useContext<EditUserInfoContextType>(EditUserInfoContext);

    // const {message: nameMessage, error: nameError} = useTypedSelector(state => state.nameForm);
    // const {message: emailMessage, error: emailError} = useTypedSelector(state => state.emailForm);
    // const {message: passwordMessage, error: passwordError} = useTypedSelector(state => state.passwordForm);
    // const {message: avatarMessage, error: avatarError} = useTypedSelector(state => state.avatarForm);
    
    const {message: nameMessage, error: nameError} = useAppSelector(state => state.nameForm);
    const {message: emailMessage, error: emailError} = useAppSelector(state => state.emailForm);
    const {message: passwordMessage, error: passwordError} = useAppSelector(state => state.passwordForm);
    const {message: avatarMessage, error: avatarError} = useAppSelector(state => state.avatarForm);

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