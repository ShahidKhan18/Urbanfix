# UrbanFix - Smart Municipal Complaint System (Backend)

This is the **backend** for the **UrbanFix** project, a smart municipal complaint system built using **Node.js, Express, MongoDB, and Mongoose**.

## 🚀 Tech Stack
- **Node.js + Express** → Backend framework
- **MongoDB + Mongoose** → Database & ODM
- **JWT Authentication** → Secure login system
- **Zod** → Schema validation for API requests
- **Multer** → File uploads (images for complaints)
- **Cors & Cookie-parser** → Middleware for handling requests
- **Bcrypt.js** → Secure password hashing

## 📂 Folder Structure
```
urbanfix-backend/
  ├── src/
  │   ├── config/            # Database & env config
  │   ├── controllers/       # Route controllers
  │   ├── middlewares/       # Authentication & validation middleware
  │   ├── models/            # Mongoose schemas
  │   ├── routes/            # Express routes
  │   ├── services/          # Business logic layer
  │   ├── utils/             # Helper functions
  │   ├── validations/       # Zod schema validation
  │   ├── server.js          # Main entry point
  ├── .env                   # Environment variables
  ├── package.json           # Dependencies
  ├── nodemon.json           # Nodemon config
```

## 📌 Mongoose Models & API Endpoints

### **1️⃣ User Model**
#### **Schema**
```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["citizen", "admin"], default: "citizen" },
  points: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
```
#### **API Endpoints**
- `POST /api/users/register` → Register a new user  
- `POST /api/users/login` → User login  
- `GET /api/users/profile` → Fetch user profile  
- `PUT /api/users/profile` → Update profile  
- `GET /api/users/leaderboard` → Fetch top users  

---

### **2️⃣ Complaint Model**
#### **Schema**
```js
const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  severity: { type: Number, default: 1 },
  status: { type: String, enum: ["open", "in_progress", "resolved"], default: "open" },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true },
  },
  image: { type: String },
  upvotes: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

complaintSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Complaint", complaintSchema);
```
#### **API Endpoints**
- `POST /api/complaints` → Create a new complaint  
- `GET /api/complaints` → Get all complaints  
- `GET /api/complaints/:id` → Get complaint details  
- `PUT /api/complaints/:id` → Update complaint status (Admin only)  
- `DELETE /api/complaints/:id` → Delete a complaint (Admin only)  
- `GET /api/complaints/nearby` → Find nearby complaints (GeoQuery)  
- `POST /api/complaints/upvote/:id` → Upvote an existing complaint  

---

### **3️⃣ Reward Model**
#### **Schema**
```js
const rewardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  points: { type: Number, required: true },
  redeemed: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Reward", rewardSchema);
```
#### **API Endpoints**
- `GET /api/rewards/:userId` → Get user reward details  
- `POST /api/rewards/redeem` → Redeem points  
- `GET /api/rewards/transactions` → Fetch reward history  

---

### **4️⃣ Discussion Model**
#### **Schema**
```js
const discussionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Discussion", discussionSchema);
```
#### **API Endpoints**
- `POST /api/discussions` → Create a new discussion  
- `GET /api/discussions` → Get all discussions  
- `POST /api/discussions/comment/:id` → Add a comment  

---

### **5️⃣ Archived Complaint Model**
#### **Schema**
```js
const archivedComplaintSchema = new mongoose.Schema({
  originalComplaint: { type: mongoose.Schema.Types.ObjectId, ref: "Complaint", required: true },
  resolvedAt: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model("ArchivedComplaint", archivedComplaintSchema);
```
#### **API Endpoints**
- `GET /api/archived-complaints` → Fetch archived complaints  

---

### **6️⃣ Notification Model**
#### **Schema**
```js
const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["unread", "read"], default: "unread" },
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);
```
#### **API Endpoints**
- `POST /api/notifications/send` → Send notification  
- `GET /api/notifications/:userId` → Fetch user notifications  

---

### **7️⃣ Admin Model**
#### **Schema**
```js
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);
```
#### **API Endpoints**
- `POST /api/admin/login` → Admin login  
- `GET /api/admin/dashboard` → Fetch admin dashboard stats  

## 🛠 Installation & Setup

Clone the repository and install dependencies:
```sh
git clone https://github.com/your-repo/urbanfix-backend.git
cd urbanfix-backend
npm install
```

Create a `.env` file and add the following:
```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
```

Start the development server:
```sh
npm run dev
```

## 🎨 Features
✅ **Register complaints with images & location**  
✅ **Upvote existing complaints**  
✅ **Track complaint status**  
✅ **Admin panel to manage complaints**  
✅ **User rewards system with leaderboard**  
✅ **Real-time notifications via WhatsApp/SMS**  

---
Made with ❤️ by **Your Team**
