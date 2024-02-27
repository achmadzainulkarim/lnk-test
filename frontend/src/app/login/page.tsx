"use client"
import { ChangeEvent, FormEvent, useState } from 'react';

import axios from 'axios';
import { Environment } from 'environments/environment';

interface LoginResponse {
  success: boolean;
  token: string;
  cache: boolean;
}

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = Environment.baseurl

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(username == "" || password == ""){
      setError("Isi username dan password terlebih dahulu")
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post<LoginResponse>(`${baseUrl}/api/auth/login`, {
        username,
        password,
      });

      if (response.data.success) {
        if(typeof window !== 'undefined'){
          window.localStorage.setItem("token", response.data.token)
          window.location.replace("/dashboard")
        }
      } else {
        setError('Invalid credentials. Please try again.'); // Customize error message as needed
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-4 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="h-10 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="h-10 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600 h-10 rounded-md transition duration-300 px-2"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          {error && <div className="text-red-500">{error}</div>}
        </form>
      </div>
    </div>
  );
}
