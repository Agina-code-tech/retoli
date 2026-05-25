//A component is like a reusable piece of a website.
//React components must return JSX. Export default allows other files to use that component, function creates the section
//Class names are ways of styling react using tailwind
import React from 'react';
import Button from './Button';

export default function HeroSection() {
  return (
    <div id="Hero">
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          <p className="mb-4 text-sm text-gray-400">
            Turn PDFs into audiobooks ✨
          </p>

          <h1 className="text-5xl font-bold mb-6">
            Listen to Any
            <span className="text-purple-400"> PDF Book </span>
            Instantly
          </h1>

          <p className="text-gray-400 ">
            Upload PDF books and convert them into AI-powered audiobooks.
          </p>

          <div className="flex gap-4 justify-center">
            <Button text="SignIn" variant="primary" to="/SignIn" />
            <Button text="SignUp" variant="outline" to="/SignUp" />
          </div>
        </div>
      </div>
    </div>
  );
}
