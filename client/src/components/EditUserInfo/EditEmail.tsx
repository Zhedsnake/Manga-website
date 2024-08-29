import React, {useState} from 'react';
import Loader from "../UI/Loader/Loader.tsx";
import {useTypedSelector} from "../../hooks/useTypedSelector.ts";
import {useActions} from "../../hooks/useActions.ts";

const EditEmail : React.FC = () => {
    const [email, setEmail] = useState<string>("")

    const {loading: emailLoading, error: emailError} = useTypedSelector(state => state.emailForm);
    const {editEmail} = useActions();

    const handleEditEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        await editEmail(email);
        setEmail("")
    }

    const handlerSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }


    return (
        <>
            {emailError && <div>{emailError}</div>}
            {emailLoading
                ? <Loader/>
                :
                <form role="form">
                    <div className="mb-3">
                        <label htmlFor="Inputemail">Почта</label>
                        <input
                            type="email"
                            className="form-control"
                            id="Inputemail"
                            aria-describedby="emailHelp"
                            value={email}
                            onChange={handlerSetEmail}
                        />
                    </div>
                    <button onClick={handleEditEmail} type="submit" className="btn btn-primary">Поменять почту</button>
                </form>
            }
        </>
    );
};

export default EditEmail;