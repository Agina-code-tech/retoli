import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './Components/Hero'; // Fixed case sensitivity and path
import { SignIn } from './Pages/SignIn'; // Fixed path based on your folder structure
import { SignUp } from './Pages/SignUp'; // Fixed path based on your folder structure
import { useState } from 'react';
import { HomePage } from './Pages/HomePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

