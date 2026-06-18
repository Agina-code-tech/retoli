import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './Components/Hero'; // Fixed case sensitivity and path, check casing alwaysss
import { SignIn } from './Pages/SignIn'; // Fixed path based on my folder structure
import { SignUp } from './Pages/SignUp';
import { useState } from 'react';
import { HomePage } from './Pages/HomePage';
import Dashboard from './Pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />

        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

