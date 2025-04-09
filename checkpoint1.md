# Health Tracker Application - Checkpoint 1

## Backend Setup

### Core Files
1. `app.js` - Main Express application setup
   - Middleware configuration
   - Route definitions
   - Error handling
   - Database connection

2. `start.js` - Server initialization
   - Environment variable loading
   - Error handling
   - Server startup
   - Graceful shutdown

### Models
1. `User.js` - User management
   - Authentication
   - Profile data
   - Points and level tracking
   - Settings

2. `Achievement.js` & `UserAchievement.js` - Achievement system
   - Achievement definitions
   - User progress tracking
   - Completion status

3. `Badge.js` & `UserBadge.js` - Badge system
   - Badge definitions
   - User badge tracking
   - Equip/unequip functionality

4. Health Tracking Models
   - `Sleep.js` - Sleep tracking
   - `Water.js` - Water intake tracking
   - `Mood.js` - Mood tracking
   - `Goal.js` - Goal tracking

### Routes
1. Authentication
   - `/api/auth` - Login, register, logout

2. User Management
   - `/api/users` - Profile, settings, statistics

3. Achievement System
   - `/api/achievements` - List, progress, rewards

4. Badge System
   - `/api/badges` - List, equip, unequip

5. Health Tracking
   - `/api/sleep` - Sleep records and statistics
   - `/api/water` - Water intake records and statistics
   - `/api/mood` - Mood records and statistics
   - `/api/goals` - Goal management and tracking

## Current Status
- ✅ Backend server setup complete
- ✅ Database models defined
- ✅ API routes implemented
- ✅ Error handling in place
- ✅ Authentication system ready

## Next Steps
1. Frontend implementation
2. API testing
3. User interface development
4. Integration testing
5. Deployment preparation

## Environment Setup
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/health-tracker
JWT_SECRET=your_jwt_secret
```

## Running the Application
1. Start MongoDB
2. Install dependencies: `npm install`
3. Start backend: `npm start`
4. Access API at: `http://localhost:5000` 