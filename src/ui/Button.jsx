import React from 'react';
import './ui.css'; // We'll put specific UI styles here if needed, but we mostly use index.css classes

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    return (
        <button
            className={`btn btn-${variant} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
