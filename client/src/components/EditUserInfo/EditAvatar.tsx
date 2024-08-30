import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector.ts";
import {useActions} from "../../hooks/useActions.ts";
import Loader from "../UI/Loader/Loader.tsx";

interface setMessageInterface {
    setMessage: Dispatch<SetStateAction<string>>;
}

const EditAvatar: React.FC<setMessageInterface> = ({setMessage}) => {
    const [avatar, setAvatar] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [avatarErrorState, setAvatarErrorState] = useState<string>("")

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

        if (avatar && (avatar.type === "image/jpeg" || avatar.type === "image/png" || avatar.type === "image/jpg")) {
            if (avatar.size > 368000) { // 3.68 MB in bytes
                setAvatarErrorState("Размер файла не должен превышать 3.68 MB.");
                return;
            }

            const img = new Image();
            img.src = URL.createObjectURL(avatar);

            img.onload = async () => {
                if (img.width === img.height) {
                    setAvatarErrorState("")
                    const imageFormData = new FormData();
                    imageFormData.append('avatar', avatar);

                    await editAvatar(imageFormData)
                } else {
                    setAvatarErrorState("Изображение должно иметь соотношение сторон 1:1.");
                }
            };

        } else if (!avatar){
            setAvatarErrorState("Вы не загрузили изображение")
            return;
        } else {
            setAvatarErrorState("Допустимые форматы jpeg или png")
            return;
        }

        setAvatar(null);
        setCoverPreview(null);
    };

    useEffect(() => {
        if (avatarError) {
            setAvatarErrorState(avatarError)
        }
    }, [avatarError]);

    return (
        <>
            {avatarErrorState && <div>{avatarErrorState}</div>}
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
                            <div>
                                <label htmlFor="InputImage">Аватарка</label>
                            </div>
                            <div>
                                <input
                                    type="file"
                                    accept="image/jpeg, image/png"
                                    onChange={handleCoverChange}
                                    style={{display: 'none'}}
                                    id="InputImage"
                                />
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('InputImage')?.click()}
                                >
                                    Выберите файл
                                </button>
                            </div>
                        </div>
                        <button onClick={handleEditAvatar} type="submit" className="btn btn-primary">Поменять аватарку
                        </button>
                    </form>
                </>
            )}
        </>
    );
};

export default EditAvatar;