module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 8000,
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3000",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://dunder_mifflin@localhost/artlist"
};
