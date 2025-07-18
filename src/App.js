import './App.css';
import React from 'react';
import Home from './Home';
import Login from './login';
import Signup from './Signup';
import Chats from './Chats';
import Room from './Room';
import Users from './Users';
import ProfileUpdate from './ProfileUpdate';
import { createBrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom';

const router= createBrowserRouter([
  {path: '/', element: <Home/>},
  {path: '/Login', element: <Login/>},
  {path: '/Signup', element: <Signup/>},
  {path: '/Chats', element: <Chats/>},
  {path: '/Users', element: <Users/>},
  {path: '/Users/:id',element:<Room/>},
  {path: '/ProfileUpdate',element:<ProfileUpdate/>},
]);

function App() {

  return (
    <RouterProvider router={router}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Chats" element={<Chats/>}/>
        <Route path="/Users" element={<Users/>}/>
        <Route path="/Users/:id" element={<Room/>}/>
        <Route path="/ProfileUpdate" element={<ProfileUpdate/>}/>
      </Routes>
    </RouterProvider>
  )
  
}

export default App;
