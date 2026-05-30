# AKSN - Parking & City Booking System

A full-stack web application for parking space booking and city services management, built with a modern JavaScript stack.

## Tech Stack

- **Backend:** Node.js, Express.js, Supabase (PostgreSQL), JWT Authentication
- **Frontend:** React (via submodule)
- **Libraries:** Axios, bcrypt, Nodemailer, Winston (logging), Captcha verification
- **Database:** Supabase (PostgreSQL)

## Project Structure

```
AKSN/
├── backend/
│   ├── config/           # Configuration files (Supabase, DB)
│   ├── controllers/      # Route handlers (auth, bookings, parking, users, captcha)
│   ├── middleware/        # Auth middleware
│   ├── models/           # Data models
│   ├── routes/           # API route definitions
│   ├── src/controllers/  # Additional controllers
│   ├── utils/            # Utility functions (logging, Supabase client)
│   └── server.js         # Express app entry point
├── frontend/             # Frontend application (submodule)
├── .gitignore
└── package.json          # Root package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account (for database)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Aanushka001/AKSN.git
   cd AKSN
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend/` directory with the following:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   JWT_SECRET=your_jwt_secret
   ```

4. Initialize the frontend submodule:
   ```bash
   git submodule update --init --recursive
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   node server.js
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

The backend runs on `http://localhost:5000` (or the port configured in your environment).

## Features

- User authentication with JWT
- Parking space booking and management
- City services integration
- Captcha verification for security
- Email notifications via Nodemailer
- Structured logging with Winston

## License

[MIT](LICENSE)
