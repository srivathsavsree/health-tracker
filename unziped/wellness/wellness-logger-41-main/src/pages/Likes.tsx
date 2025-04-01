import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BootstrapNavbar from '@/components/layout/BootstrapNavbar';
import { Heart, Trash2, Filter, ArrowLeft } from 'lucide-react';

// Mock data for liked items
const initialLikedItems = [
  {
    id: 1,
    type: 'Activity',
    title: 'Morning Yoga',
    description: 'A gentle 20-minute yoga routine to start your day',
    date: '2023-10-15',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000'
  },
  {
    id: 2,
    type: 'Diet',
    title: 'Mediterranean Salad',
    description: 'Fresh vegetables, feta cheese, and olive oil dressing',
    date: '2023-10-18',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000'
  },
  {
    id: 3,
    type: 'Goal',
    title: 'Run 5K',
    description: 'Training plan to run a 5K race in 8 weeks',
    date: '2023-10-20',
    image: 'https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?q=80&w=1000'
  },
  {
    id: 4,
    type: 'Activity',
    title: 'HIIT Workout',
    description: '30-minute high intensity interval training',
    date: '2023-10-22',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000'
  },
  {
    id: 5,
    type: 'Diet',
    title: 'Protein Smoothie',
    description: 'Banana, berries, protein powder, and almond milk',
    date: '2023-10-24',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a90a0868?q=80&w=1000'
  }
];

export default function Likes() {
  const [likedItems, setLikedItems] = useState(initialLikedItems);
  const [filterType, setFilterType] = useState('All');

  const handleRemove = (id: number) => {
    setLikedItems(likedItems.filter(item => item.id !== id));
  };

  const filteredItems = filterType === 'All' 
    ? likedItems 
    : likedItems.filter(item => item.type === filterType);

  return (
    <div className="min-vh-100 bg-light">
      <BootstrapNavbar />
      
      <main className="container py-5 mt-5">
        <div className="mb-4">
          <Link to="/" className="text-decoration-none d-inline-flex align-items-center mb-4">
            <ArrowLeft size={16} className="me-2" />
            Back to Home
          </Link>
        </div>
        
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="mb-0">Your Liked Items</h1>
            <p className="text-muted">Items you've saved for later</p>
          </div>
          <div className="dropdown">
            <button 
              className="btn btn-outline-secondary d-flex align-items-center" 
              type="button" 
              data-bs-toggle="dropdown"
            >
              <Filter size={18} className="me-2" />
              Filter: {filterType}
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" onClick={() => setFilterType('All')}>All</button></li>
              <li><button className="dropdown-item" onClick={() => setFilterType('Activity')}>Activities</button></li>
              <li><button className="dropdown-item" onClick={() => setFilterType('Diet')}>Diet</button></li>
              <li><button className="dropdown-item" onClick={() => setFilterType('Goal')}>Goals</button></li>
            </ul>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <Heart size={64} className="text-muted" />
            </div>
            <h2>No liked items found</h2>
            <p className="text-muted">
              {filterType === 'All' 
                ? "You haven't liked any items yet" 
                : `You haven't liked any ${filterType.toLowerCase()} items yet`}
            </p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredItems.map(item => (
              <div key={item.id} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="position-relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="card-img-top"
                      style={{ height: '180px', objectFit: 'cover' }}
                    />
                    <span className="position-absolute top-0 end-0 bg-white m-2 px-2 py-1 rounded-pill small">
                      {item.type}
                    </span>
                  </div>
                  <div className="card-body">
                    <h3 className="h5 card-title">{item.title}</h3>
                    <p className="card-text text-muted small">{item.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">Liked on {item.date}</small>
                      <button 
                        className="btn btn-sm btn-outline-danger" 
                        onClick={() => handleRemove(item.id)}
                        title="Remove from likes"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
