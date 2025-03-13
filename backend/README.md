# Smart Municipal Complaint System - Backend

This is the backend for the **Smart Municipal Complaint System**, built with **Node.js, Express, MongoDB, and Mongoose**.

## 🚀 Tech Stack
- **Node.js + Express** → Backend framework
- **MongoDB + Mongoose** → Database & ODM
- **JWT Authentication** → Secure login system
- **Multer** → File uploads (images for complaints)
- **Cors & Cookie-parser** → Middleware for handling requests
- **Bcrypt.js** → Secure password hashing

## 📂 Folder Structure
```
smart-municipal-backend/
  ├── src/
  │   ├── config/            # Database & env config
  │   ├── controllers/       # Route controllers
  │   ├── middleware/        # Authentication & validation middleware
  │   ├── models/            # Mongoose schemas
  │   ├── routes/            # Express routes
  │   ├── services/          # Business logic layer
  │   ├── utils/             # Helper functions
  │   
  ├── .env                   # Environment variables
  ├── package.json           # Dependencies
  ├── nodemon.json           # Nodemon config
  ├── index.js          # Main entry point
```

## 🛠 Installation & Setup
Clone the repository and install dependencies:
```sh
git clone https://github.com/your-repo/smart-municipal-backend.git
cd smart-municipal-backend
npm install
```

Create a `.env` file and add the following:
```env
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
PORT=5000
CLIENT_URL=http://localhost:5173
```

Start the development server:
```sh
npm run dev
```

## 🔗 API Routes
### **Authentication**
- `POST /api/auth/register` → Register a new user  
- `POST /api/auth/login` → Login user  
- `POST /api/auth/refresh-token` → Refresh JWT token  

### **Complaints**
- `POST /api/complaints` → Submit a new complaint  
- `GET /api/complaints` → Fetch all complaints  
- `PATCH /api/complaints/:id` → Update complaint status  
- `DELETE /api/complaints/:id` → Delete complaint  

## 🔄 Authentication (JWT + Refresh Token)
Authentication is handled using **JWT** with refresh tokens.  
Users receive a short-lived access token and a long-lived refresh token.

## 📸 File Upload (Multer)
Images are uploaded using **Multer** and stored securely.

---
Made with ❤️ by **Your Team**
