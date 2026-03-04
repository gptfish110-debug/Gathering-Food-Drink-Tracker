import React from 'react';
import './ui.css';

export const Card = ({ children, className = '', ...props }) => {
    return (
        <div className={`glass-panel card animate-fade-in ${className}`} {...props}>
            {children}
        </div>
    );
};
