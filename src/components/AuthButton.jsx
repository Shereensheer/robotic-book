import React, { useState, useEffect } from 'react';
import { useAuth } from './auth/AuthProvider';

const AuthButton = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Wrap the useAuth hook in a try-catch to handle context errors gracefully
  let authState = { user: null, loading: true, signout: null, isAuthenticated: false };

  try {
    authState = useAuth();
  } catch (error) {
    console.error('Auth context not available:', error);
    // Return a default state when context is not available
    authState = { user: null, loading: false, signout: () => {}, isAuthenticated: false };
  }

  const { user, loading, signout, isAuthenticated } = authState;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignOut = async () => {
    if (!signout) {
      console.error('Signout function not available');
      setShowDropdown(false);
      return;
    }

    try {
      await signout();
      setShowDropdown(false);
    } catch (error) {
      console.error('Error during signout:', error);
      setShowDropdown(false);
    }
  };

  const handleSignIn = () => {
    console.log('Sign in clicked');
    alert('Sign in clicked');
  };

  if (loading || !isMounted) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    // User is logged in - show user dropdown
    return (
      <div className="relative">
        <button
          className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => setShowDropdown(!showDropdown)}
          aria-expanded={showDropdown}
          aria-haspopup="true"
        >
          <span className="font-medium">
            {user.email?.split('@')[0] || user.username || 'User'}
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  } else {
    // User is not logged in - show sign in button
    return (
      <button
        onClick={handleSignIn}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium"
      >
        Sign In
      </button>
    );
  }
};

export default AuthButton;