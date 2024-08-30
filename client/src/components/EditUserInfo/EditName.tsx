import React, {Dispatch, SetStateAction, useState} from 'react';
import Loader from "../UI/Loader/Loader.tsx";
import {useTypedSelector} from "../../hooks/useTypedSelector.ts";
import {useActions} from "../../hooks/useActions.ts";

interface setMessageInterface {
    setMessage: Dispatch<SetStateAction<string>>;
}

const EditName : React.FC<setMessageInterface> = ({setMessage}) => {
    const [name, setName] = useState<string>("")

    const {loading: nameLoading, error: nameError} = useTypedSelector(state => state.nameForm);
    const {editName} = useActions();

    const handleEditName = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("")
        await editName(name);
        setName("")
    }

    const handlerSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    return (
        <>
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
        </>
    );
};

export default EditName;