# React Frontend - Chat App

This is the frontend of my full stack chat application built with **React**. It connects to a Django REST API backend and allows users to register, login, chat and upload profile pictures using **supabase**

## Live Demo
[Open Live App](https://chat-app-frontend-5uomp6zyy-sithabilems-projects.vercel.app)

## Tech Stack
- **React**
- **Supabase (for profile picture uploads)**
- **Vercel (for deployment)**

## Feaures
- Responsive React UI
- User authentication (login/signup via API)
- Profile image uploads to supabase
- Secure environment variable setup

## What I learned
This project helped me understand how to intergrate a React frontend with a django REST backend and handle user images through supabase. I also learned how to securely handle .env files and deploy on vercel.

## How to run locally
### 1. Clone the repo
```bash 
git clone https://github.com/SithabileM/ChatAppFrontend.git
cd frontend
```
### 2. Install dependencies
```bash
npm install
```
### 3. Create a .env file
Env
REACT_APP_API_BASE_URL=your-supabase-base-url
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key

### 4. Start the development server
```bash
npm start
```

## Deployment
This project is deployed on Vercel. After pushing to github, vercel auomatically redeploys changes

## Testing the app
Make sure the backend is running locally or deployed (and reachable at the REACT_APP_API_BASE_URL). Supabase should also be conigured correctly with a public bucket for storing images.

## Environment variable
Do not push your .env file to github

## Author
Sithabile Monde