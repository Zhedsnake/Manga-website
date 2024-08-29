import React, {useEffect, useState} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector.ts";
import {useActions} from "../hooks/useActions.ts";
import Loader from "../components/UI/Loader/Loader.tsx";

const AuthProfile : React.FC = () => {
    const [name, setName] = useState<string>("")

    const {message: nameMessage, loading: nameLoading, error: nameError} = useTypedSelector(state => state.nameForm);
    const {editName} = useActions();

    const handleEditName = async (e: React.FormEvent) => {
        e.preventDefault();
        await editName(name);
    }

    const handlerSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    useEffect(() => {
        console.log("nameMessage ответ:" + nameMessage);
        console.log("nameError ответ:" + nameError);
    }, [nameMessage, nameError]);


    return (
        <div className="container">
            <section>
                <div className="container">
                    {nameMessage && <div className="row">{nameMessage}</div>}
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
                            {nameError && <div>{nameError}</div>}
                            {nameLoading
                                ? <Loader/>
                                :
                                    <form role="form">
                                        <div className="mb-3">
                                            <label htmlFor="InputName">Никнейм</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="InputName"
                                                aria-describedby="emailHelp"
                                                value={name}
                                                onChange={handlerSetName}
                                            />
                                        </div>
                                        <button onClick={handleEditName} type="submit" className="btn btn-primary">Поменять
                                            никнейм
                                        </button>
                                    </form>
                            }

                        </div>
                        <div className="col-md-6 col-xl-3">
                            <form role="form">
                                <div className="mb-3">
                                    <label htmlFor="Inputemail">Почту</label>
                                    <input type="email" className="form-control" id="Inputemail"
                                           aria-describedby="emailHelp"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Поменять почту</button>
                            </form>
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

export default AuthProfile;