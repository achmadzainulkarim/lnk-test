/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { FormEvent, useEffect, useState } from 'react';

import axios from "axios"
import { Environment } from 'environments/environment';

import CalendarTable from '@/components/calendar-table';

interface EmailList {
  email : string,
  date : Date,
  description : string,
  createdAt : Date,
  updatedAt : Date
}

export default function Dashboard() {
  let [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  let [eventList, setEventList] = useState<EmailList[] | null>(null);

  let token = (typeof window !== 'undefined') ? window.localStorage.getItem('token') : null;

  const headers = {
    Authorization: token,
  };

  const { baseurl } = Environment;

  const [formData, setFormData] = useState({
    email: '',
    date: '',
    description: '',
  });

  const getUser = (async () => {
    try {
      await axios.get(`${baseurl}/api/user/get`, { headers: headers });
    } catch (error) {
      console.log(error)
      window.location.replace("/login");
    }
  });

  const getEventList = (async () => {
    try {
      const { data } = await axios.get(`${baseurl}/api/email/list`, { headers: headers });
      setEventList(data.data)
    } catch (error) {
      console.log(error)
    }
  });

  const sendEmail = ( async () => {
    try {
      const response = await axios.post(`${baseurl}/api/email/create`,  formData, { headers: headers });
      console.log(response)
      getEventList();
    } catch (error) {
      console.log(error)
    }
  });

  useEffect(() => {
    getUser();
    getEventList();
    // Initial events, you can fetch events on component mount if needed
  }, []);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    closeModal();
    sendEmail();
    console.log("submitted form");
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function closeModal() {
    setIsModalOpen(false);
  }
  function openModal() {
    setIsModalOpen(true);
  }

  async function logOut() {
    try {
      const { data } = await axios.post(`${baseurl}/api/auth/logout`, {}, { headers: headers });
      if(data){
        window.location.replace("/login");
      }
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div className='w-100'>
      <h1 className='text-white text-center'>Event Email</h1>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={openModal}>Create</button>
      <div className='mt-10'></div>
      <CalendarTable events={eventList} />
      {/* Modal */}
      {isModalOpen && (
        <div className='fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-80'>
          <div className='flex items-center justify-center min-h-screen'>
            <div className='relative bg-white w-96 rounded shadow-lg p-6'>
              {/* Close Button */}
              <button
                className='absolute top-0 right-0 p-4'
                onClick={closeModal}
              >
                &times;
              </button>

              {/* Form */}
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label htmlFor="emadil" className="block text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <span className='text-xs'>Pesan akan benar-benar dikirim ke alamat emailnya</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-600">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    rows={4}
                    required
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-10 rounded' onClick={logOut}>Logout</button>
    </div>
  );
}
