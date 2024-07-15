import React from "react";

interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type?: 'text' | 'email' | 'password';
    className?: string;
}

const InputField: React.FC<InputProps> = ({ value, onChange, placeholder, type = 'text', className }) => {
    return (
        <input 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder} 
            type={type} 
            className={className} 
        />
    );
};

export default InputField;