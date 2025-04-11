module.exports = {
    PORT: process.env.PORT || 5001,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/health-tracker',
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
    JWT_EXPIRES_IN: '24h'
}; 