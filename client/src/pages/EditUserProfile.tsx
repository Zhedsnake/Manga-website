import React, {useEffect, useState} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector.ts";
import EditName from "../components/EditUserInfo/EditName.tsx";
import EditEmail from "../components/EditUserInfo/EditEmail.tsx";
import {useActions} from "../hooks/useActions.ts";
import EditPassword from "../components/EditUserInfo/EditPassword.tsx";
import EditAvatar from "../components/EditUserInfo/EditAvatar.tsx";

const EditUserProfile : React.FC = () => {
    const [message, setMessage] = useState<string>("")

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

    useEffect(() => {
        if (message) {
            defEditAvatar()
            defEditName()
            defEditEmail()
            defEditPassword()
        }
    }, [message]);

    return (
        <div className="container">
            <section>
                <div className="container">
                    {message &&
                        <div className="row">{message}</div>
                    }
                    <div className="row">
                        <div className="col-md-6 col-xl-3">
                            <EditAvatar setMessage={setMessage}/>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <EditName setMessage={setMessage}/>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <EditEmail setMessage={setMessage}/>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <EditPassword setMessage={setMessage}/>
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