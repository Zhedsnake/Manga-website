import React, {useEffect, useState} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector.ts";
import EditName from "../components/EditUserInfo/EditName.tsx";
import EditEmail from "../components/EditUserInfo/EditEmail.tsx";
import {useActions} from "../hooks/useActions.ts";

const EditUserProfile : React.FC = () => {
    const [message, setMessage] = useState<string>("")


    const {message: nameMessage, error: nameError} = useTypedSelector(state => state.nameForm);
    const {message: emailMessage, error: emailError} = useTypedSelector(state => state.emailForm);
    const {defEditName, defEditEmail} = useActions();

    useEffect(() => {
        if (nameMessage) {
            setMessage(nameMessage)
        }

        if (emailMessage) {
            setMessage(emailMessage)
        }
    }, [nameMessage, emailMessage]);

    useEffect(() => {
        if (nameError) {
            setMessage("")
        }

        if (emailError) {
            setMessage("")
        }

    }, [nameError, emailError]);

    useEffect(() => {
        if (message) {
            defEditName()
            defEditEmail()
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
                            <form role="form">
                                <div className="mb-3">
                                    <label htmlFor="InputImage">Аватарка</label>
                                    <input type="file" id="InputImage"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Поменять аватарку</button>
                            </form>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <EditName/>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <EditEmail/>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <form role="form">
                                <div className="mb-3">
                                <label htmlFor="InputOldPassword">Старый пароль</label>
                                    <input type="password" className="form-control" id="InputOldPassword"/>
                                        <label htmlFor="InputNewPassword">Новый пароль</label>
                                        <input type="password" className="form-control" id="InputNewPassword"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Поменять пароль</button>
                            </form>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="AboutTextarea" className="form-label">О себе</label>
                                    <textarea className="form-control" id="AboutTextarea" rows="3"></textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EditUserProfile;