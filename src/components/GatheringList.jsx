import React, { useState } from 'react';
import { useGatherings } from '../context/GatheringContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { GatheringForm } from './GatheringForm';
import './GatheringList.css';

export const GatheringList = ({ onNavigate }) => {
    const { gatherings } = useGatherings();
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Sort by date (closest first)
    const sortedGatherings = [...gatherings].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    return (
        <div className="gathering-list-container animate-fade-in">
            <div className="list-header">
                <h2 className="title" style={{ fontSize: '1.75rem', marginBottom: 0 }}>Upcoming Gatherings</h2>
                <Button onClick={() => setIsFormOpen(true)}>+ New Gathering</Button>
            </div>

            {isFormOpen && (
                <GatheringForm onClose={() => setIsFormOpen(false)} />
            )}

            {sortedGatherings.length === 0 ? (
                <div className="empty-state glass-panel">
                    <p className="subtitle">No gatherings planned yet. Create one to get started!</p>
                </div>
            ) : (
                <div className="grid-list">
                    {sortedGatherings.map((gathering) => {
                        const dateObj = new Date(gathering.date);
                        const formattedDate = dateObj.toLocaleDateString(undefined, {
                            weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
                        });
                        const itemCount = gathering.items?.length || 0;
                        const claimedCount = gathering.items?.filter(i => i.claimedBy).length || 0;

                        return (
                            <Card
                                key={gathering.id}
                                className="gathering-card clickable"
                                onClick={() => onNavigate('detail', gathering.id)}
                            >
                                <div className="card-header">
                                    <h3>{gathering.title}</h3>
                                    <span className="date-badge">{formattedDate}</span>
                                </div>
                                {gathering.description && (
                                    <p className="description">{gathering.description}</p>
                                )}
                                <div className="card-footer">
                                    <div className="progress-bar-bg">
                                        <div
                                            className="progress-bar-fill"
                                            style={{ width: itemCount > 0 ? `${(claimedCount / itemCount) * 100}%` : '0%' }}
                                        />
                                    </div>
                                    <span className="progress-text">
                                        {claimedCount} / {itemCount} items claimed
                                    </span>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
