import React from 'react';
import Loader from "../UI/Loader/Loader.tsx";
import useImgInputs from "../../hooks/useImgInputs.ts";
import useHandleEditAvatar from "../../hooks/EditUserInfoHooks/useHandleEditAvatar.ts";

const EditAvatar: React.FC = () => {
    const avatar = useImgInputs(null)
    const handleEdit = useHandleEditAvatar(avatar.value, avatar.clear)

    return (
        <>
            {handleEdit.error && <div>{handleEdit.error}</div>}
            {handleEdit.avatarLoading ? (
                <Loader />
            ) : (
                <>
                    {avatar.valuePreview && (
                        <div style={{marginTop: '10px'}}>
                            <img
                                src={avatar.valuePreview}
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
                                    onChange={avatar.onChange}
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
                        <button onClick={handleEdit.handleEditAvatar} type="submit" className="btn btn-primary">Поменять аватарку
                        </button>
                    </form>
                </>
            )}
        </>
    );
};

export default EditAvatar;