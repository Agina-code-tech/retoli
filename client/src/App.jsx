import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './Components/Hero'; // Fixed case sensitivity and path
import SignIn from './Pages/SignIn'; // Fixed path based on your folder structure
import SignUp from './Pages/SignUp'; // Fixed path based on your folder structure

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Hero />} />
        {/* Matches the 'Hero' import name */}
        {/* Sign In Page */}
        <Route path="/SignIn" element={<SignIn />} />
        {/* Sign Up Page */}
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

