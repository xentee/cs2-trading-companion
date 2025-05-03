// ✅ Modal.tsx ajusté pour une hauteur fixe égale, quelle que soit la vue

'use client';

import { useState } from 'react';

export default function Modal({ type = 'signin', onClose }: { type?: 'signin' | 'signup'; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(type);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden flex min-h-[500px]">
        {/* Left side image */}
        <div className="hidden md:block w-1/2 bg-indigo-900 text-white flex items-center justify-center p-4">
          <p className="text-xl font-bold">🎮 Welcome to CS2 Trader</p>
        </div>

        {/* Right side form */}
        <div className="flex-1 p-8 flex flex-col">
          {/* Switch buttons */}
          <div className="flex justify-between mb-6">
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-2 rounded-t ${activeTab === 'signup' ? 'bg-indigo-700 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setActiveTab('signin')}
              className={`flex-1 py-2 rounded-t ${activeTab === 'signin' ? 'bg-indigo-700 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              Sign In
            </button>
          </div>

          {/* Form content with fixed height */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-sm">
              {activeTab === 'signup' ? (
                <form className="space-y-4">
                  <input type="text" placeholder="Username" className="w-full p-3 border rounded" />
                  <input type="email" placeholder="Email" className="w-full p-3 border rounded" />
                  <input type="password" placeholder="Password" className="w-full p-3 border rounded" />
                  <input type="password" placeholder="Confirm Password" className="w-full p-3 border rounded" />
                  <button type="submit" className="w-full py-3 bg-indigo-700 text-white rounded hover:bg-indigo-800">Create Account</button>
                </form>
              ) : (
                <form className="space-y-4">
                  <input type="email" placeholder="Email" className="w-full p-3 border rounded" />
                  <input type="password" placeholder="Password" className="w-full p-3 border rounded" />
                  <button type="submit" className="w-full py-3 bg-indigo-700 text-white rounded hover:bg-indigo-800">Log In</button>
                </form>
              )}
            </div>
          </div>

          {/* Close button */}
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl">&times;</button>
        </div>
      </div>
    </div>
  );
}
