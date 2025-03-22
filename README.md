# Health Tracker Application

A comprehensive health tracking application that helps users monitor their nutrition, sleep, and physical activities.

## Features

- User Authentication (Login/Register)
- Dashboard with Health Metrics
- Nutrition Tracking
- Sleep Monitoring
- Activity Tracking
- Goal Setting and Management

## Tech Stack

- Frontend: React.js with Bootstrap
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JWT

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/srivathsavsree/health-tracker.git
cd health-tracker
```

2. Install Backend Dependencies
```bash
cd backend
npm install
```

3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

4. Set up environment variables
Create a `.env` file in the backend directory with:
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/healthtracker
JWT_SECRET=your_jwt_secret_key_here
```

5. Run the application
Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

## API Endpoints

### User Routes
- `POST /api/users` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile

### Health Routes
- `POST /api/health` - Create health record
- `GET /api/health` - Get all health records
- `GET /api/health/stats` - Get health statistics
- `GET /api/health/:id` - Get specific record
- `PUT /api/health/:id` - Update record
- `DELETE /api/health/:id` - Delete record

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. 