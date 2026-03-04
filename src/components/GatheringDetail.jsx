import React, { useState } from 'react';
import { useGatherings } from '../context/GatheringContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import './GatheringDetail.css';

export const GatheringDetail = ({ gatheringId, onBack }) => {
    const {
        getGatheringById,
        addItemToGathering,
        removeGatheringItem,
        claimItem,
        unclaimItem,
        deleteGathering
    } = useGatherings();

    const gathering = getGatheringById(gatheringId);
    const [newItemName, setNewItemName] = useState('');
    const [newItemType, setNewItemType] = useState('food'); // 'food' or 'drink'
    const [claimerName, setClaimerName] = useState('');
    const [activeClaimId, setActiveClaimId] = useState(null);

    if (!gathering) {
        return (
            <div className="detail-container">
                <Button variant="secondary" onClick={onBack}>&larr; Back</Button>
                <p className="subtitle" style={{ marginTop: '2rem' }}>Gathering not found or deleted.</p>
            </div>
        );
    }

    const dateObj = new Date(gathering.date);
    const formattedDate = dateObj.toLocaleDateString(undefined, {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });

    const handleAddItem = (e) => {
        e.preventDefault();
        if (!newItemName) return;

        addItemToGathering(gatheringId, { name: newItemName, type: newItemType });
        setNewItemName('');
    };

    const handleClaim = (itemId) => {
        if (!claimerName) return;
        claimItem(gatheringId, itemId, claimerName);
        setActiveClaimId(null);
        setClaimerName('');
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this gathering?')) {
            deleteGathering(gatheringId);
            onBack();
        }
    };

    const foodItems = gathering.items.filter(i => i.type === 'food');
    const drinkItems = gathering.items.filter(i => i.type === 'drink');

    const renderItemCard = (item) => (
        <Card key={item.id} className="item-card">
            <div className="item-content">
                <span className="item-name">{item.name}</span>
                <button
                    className="delete-item-btn"
                    onClick={() => removeGatheringItem(gatheringId, item.id)}
                    title="Remove item"
                >
                    &times;
                </button>
            </div>

            <div className="item-actions">
                {item.claimedBy ? (
                    <div className="claimed-badge">
                        <span>Claimed by <strong>{item.claimedBy}</strong></span>
                        <button className="unclaim-btn" onClick={() => unclaimItem(gatheringId, item.id)}>Cancel</button>
                    </div>
                ) : activeClaimId === item.id ? (
                    <div className="claim-input-group animate-fade-in">
                        <input
                            type="text"
                            className="claim-input"
                            placeholder="Your Name..."
                            value={claimerName}
                            onChange={(e) => setClaimerName(e.target.value)}
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleClaim(item.id);
                                if (e.key === 'Escape') setActiveClaimId(null);
                            }}
                        />
                        <Button variant="primary" onClick={() => handleClaim(item.id)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Claim</Button>
                        <Button variant="secondary" onClick={() => setActiveClaimId(null)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Cancel</Button>
                    </div>
                ) : (
                    <Button variant="secondary" onClick={() => setActiveClaimId(item.id)} className="claim-btn">
                        I'll bring this!
                    </Button>
                )}
            </div>
        </Card>
    );

    return (
        <div className="detail-container animate-fade-in">
            <div className="detail-header-actions">
                <Button variant="secondary" onClick={onBack}>&larr; Back to Dashboard</Button>
                <Button variant="danger" onClick={handleDelete}>Delete Gathering</Button>
            </div>

            <div className="detail-hero glass-panel">
                <h1 className="title detail-title">{gathering.title}</h1>
                <div className="detail-meta">
                    <span className="detail-date">📅 {formattedDate}</span>
                </div>
                {gathering.description && (
                    <p className="detail-description">{gathering.description}</p>
                )}
            </div>

            <div className="add-item-section glass-panel">
                <h3>What do we need?</h3>
                <form onSubmit={handleAddItem} className="add-item-form">
                    <select
                        className="item-type-select"
                        value={newItemType}
                        onChange={(e) => setNewItemType(e.target.value)}
                    >
                        <option value="food">🍱 Food</option>
                        <option value="drink">🥤 Drink</option>
                    </select>
                    <input
                        type="text"
                        className="add-item-input"
                        placeholder="e.g. Potato Salad"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                    />
                    <Button variant="primary" type="submit">Add Requirement</Button>
                </form>
            </div>

            <div className="items-grid">
                <div className="items-column">
                    <h2 className="column-title">
                        <span>🍱 Food List</span>
                        <span className="count-badge">{foodItems.length}</span>
                    </h2>
                    <div className="items-list">
                        {foodItems.length === 0 ? (
                            <p className="empty-subtext">No food requirements added yet.</p>
                        ) : (
                            foodItems.map(renderItemCard)
                        )}
                    </div>
                </div>

                <div className="items-column">
                    <h2 className="column-title">
                        <span>🥤 Drinks List</span>
                        <span className="count-badge">{drinkItems.length}</span>
                    </h2>
                    <div className="items-list">
                        {drinkItems.length === 0 ? (
                            <p className="empty-subtext">No drink requirements added yet.</p>
                        ) : (
                            drinkItems.map(renderItemCard)
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
