import React, { useState } from 'react';

const UploadNewManga: React.FC = () => {
    const [latinName, setLatinName] = useState<string>('');
    const [russianName, setRussianName] = useState<string>('');
    const [cover, setCover] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);

    const handleLatinNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLatinName(e.target.value);
    };

    const handleRussianNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRussianName(e.target.value);
    };

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setCover(file);
            setCoverPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

    return (
        <div>
            <h2>Добавить новую мангу</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Название латиницей:
                        <input
                            type="text"
                            value={latinName}
                            onChange={handleLatinNameChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Русское название:
                        <input
                            type="text"
                            value={russianName}
                            onChange={handleRussianNameChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Cover:
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleCoverChange}
                                style={{ display: 'none' }}
                                id="coverInput"
                            />
                            <button
                                type="button"
                                onClick={() => document.getElementById('coverInput')?.click()}
                            >
                                Выберите файл
                            </button>
                            {coverPreview && (
                                <div style={{ marginTop: '10px' }}>
                                    <img
                                        src={coverPreview}
                                        alt="Cover Preview"
                                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                                    />
                                </div>
                            )}
                        </div>
                    </label>
                </div>
                <button type="submit" style={{ marginTop: '20px' }}>Отправить на модерацию</button>
            </form>
        </div>
    );
};

export default UploadNewManga;
