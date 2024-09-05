import {ChangeEvent, useState} from "react";

export default function useImgInputs(initialValue: File | null) {
    const [value, setValue] = useState<File | null>(initialValue);
    const [valuePreview, setValuePreview] = useState<string | null>("");

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file: File = e.target.files?.[0];

        if (file) {
            setValue(file);
            setValuePreview(URL.createObjectURL(file));
        }
    };

    return {
        value,
        valuePreview,
        onChange,
        clear: () => {
            setValue(initialValue)
            setValuePreview("")
        }
    };
}