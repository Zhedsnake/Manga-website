import React, {Dispatch, SetStateAction, useState} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector.ts";
import {useActions} from "../../hooks/useActions.ts";
import Loader from "../UI/Loader/Loader.tsx";

interface setMessageInterface {
    setMessage: Dispatch<SetStateAction<string>>;
}

const EditAvatar: React.FC<setMessageInterface> = ({setMessage}) => {
    const [avatar, setAvatar] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);

    const {loading: avatarLoading, error: avatarError} = useTypedSelector(state => state.avatarForm);
    const {editAvatar} = useActions();


    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File = e.target.files?.[0];

        if (file) {
            setAvatar(file);
            setCoverPreview(URL.createObjectURL(file));
        }
    };

    const handleEditAvatar = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage("")

        if (avatar) {
            const imageFormData = new FormData();
            imageFormData.append('avatar', avatar);

            await editAvatar(imageFormData)
        }

        setCoverPreview("")
    };

    return (
        <>
            {avatarError && <div>{avatarError}</div>}
            {avatarLoading ? (
                <Loader />
            ) : (
                <>
                    {coverPreview && (
                        <div style={{marginTop: '10px'}}>
                            <img
                                src={coverPreview}
                                alt="Cover Preview"
                                style={{maxWidth: '200px', maxHeight: '200px'}}
                            />
                        </div>
                    )}
                    <form>
                        <div className="mb-3">
                            <label htmlFor="InputImage">Аватарка в формате jpg/png</label>
                            <input
                                type="file"
                                accept="image/jpeg, image/png"
                                onChange={handleCoverChange}
                                style={{display: 'none'}}
                                id="InputImage"
                            />
                            <button
                                type="button"
                                onClick={() => document.getElementById('InputImage')?.click()}
                            >
                                Выберите файл
                            </button>
                        </div>
                        <button onClick={handleEditAvatar} type="submit" className="btn btn-primary">Поменять аватарку</button>
                    </form>
                </>
            )}
        </>
    );
};

export default EditAvatar;