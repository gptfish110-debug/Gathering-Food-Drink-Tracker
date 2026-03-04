import React, { useState } from 'react';
import { useGatherings } from '../context/GatheringContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import './GatheringForm.css';

export const GatheringForm = ({ onClose }) => {
    const { addGathering } = useGatherings();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !date) return;

        addGathering({ title, date, description });
        onClose();
    };

    return (
        <div className="modal-overlay animate-fade-in">
            <div className="modal-content glass-panel">
                <div className="modal-header">
                    <h3>Create New Gathering</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <Input
                        label="Gathering Name"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Summer BBQ"
                        required
                        autoFocus
                    />

                    <Input
                        label="Date"
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />

                    <div className="input-group">
                        <label htmlFor="desc" className="input-label">Description (Optional)</label>
                        <textarea
                            id="desc"
                            className="input-field"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="What's the occasion?"
                        />
                    </div>

                    <div className="modal-actions">
                        <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                        <Button variant="primary" type="submit">Create</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
