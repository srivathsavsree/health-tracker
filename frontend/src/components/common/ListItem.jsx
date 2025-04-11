import React from 'react';
import './ListItem.css';

const ListItem = ({ title, description, date, icon: Icon, onEdit, onDelete }) => {
    return (
        <div className="list-item">
            <div className="list-item-content">
                {Icon && <Icon size={24} className="list-item-icon" />}
                <div className="list-item-text">
                    <h3 className="list-item-title">{title}</h3>
                    {description && <p className="list-item-description">{description}</p>}
                    {date && <span className="list-item-date">{new Date(date).toLocaleDateString()}</span>}
                </div>
            </div>
            <div className="list-item-actions">
                {onEdit && (
                    <button onClick={onEdit} className="list-item-button edit">
                        Edit
                    </button>
                )}
                {onDelete && (
                    <button onClick={onDelete} className="list-item-button delete">
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
};

export default ListItem; 