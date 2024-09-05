import React from 'react';
import Loader from "../UI/Loader/Loader.tsx";
import useInput from "../../hooks/useInput.ts";
import useHandleEditName from "../../hooks/EditUserInfoHooks/useHandleEditName.ts";


const EditName : React.FC = () => {
    const name = useInput<string>("")
    const editName = useHandleEditName(name.value, name.clear)

    return (
        <>
            {editName.error && <div>{editName.error}</div>}
            {editName.nameLoading
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
                            value={name.value}
                            maxLength={15}
                            onChange={name.onChange}
                        />
                    </div>
                    <button onClick={editName.handleEditName} type="submit" className="btn btn-primary">Поменять
                        никнейм
                    </button>
                </form>
            }
        </>
    );
};

export default EditName;