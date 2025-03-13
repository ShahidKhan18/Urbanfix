# UrbanFix (Smart Municipal Complaint System) - Frontend

This is the frontend of the **Smart Municipal Complaint System**, built with **React, TypeScript, ShadCN, Tailwind CSS, Redux Toolkit, and Axios**.

## 🚀 Tech Stack
- **React + TypeScript** - Frontend framework
- **ShadCN + Tailwind CSS** - UI components & styling
- **React Router** - Navigation
- **Redux Toolkit + Async Thunk** - State management
- **Axios (with Interceptors)** - API requests

## 📂 Folder Structure
```
src/
  ├── components/      # Reusable UI components
  ├── pages/           # Different page views
  ├── store/           # Redux store setup
  ├── api/             # Axios API calls
  ├── hooks/           # Custom hooks
  ├── styles/          # Tailwind styles
  ├── main.tsx         # App entry point
```

## 🛠 Installation & Setup
Clone the repository and install dependencies:
```sh
git clone https://github.com/ShahidKhan18/Urbanfix.git
cd frontend
npm install
```

Start the development server:
```sh
npm run dev
```

## 🔗 API Handling (Axios with Interceptors)
Create `src/api/api.ts` with the following setup:
```ts
import axios from 'axios';

const API = axios.create({ baseURL: 'https://api.example.com' });

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
```

## 🔄 State Management (Redux Toolkit)
Install Redux Toolkit:
```sh
npm install @reduxjs/toolkit react-redux
```

Example Async Thunk for fetching complaints:
```ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';

export const fetchComplaints = createAsyncThunk(
  'complaints/fetch',
  async () => {
    const response = await API.get('/complaints');
    return response.data;
  }
);

const complaintsSlice = createSlice({
  name: 'complaints',
  initialState: { data: [], loading: false },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComplaints.pending, state => { state.loading = true; })
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  }
});

export default complaintsSlice.reducer;
```

## 🎨 UI Components with ShadCN
Install ShadCN and configure it:
```sh
npm install -g shadcn-ui
npx shadcn-ui init
```

## 🎉 Features
✅ User authentication (Login, Register)  
✅ Submit complaints with images & location  
✅ Track complaint status  
✅ Admin panel to manage complaints  
✅ Rewards system for resolved complaints  

---
Made with ❤️ by **Shahid Khan Ishan Jain Pranay Sharma** 
