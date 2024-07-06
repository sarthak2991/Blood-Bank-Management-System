'use client'
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Link } from 'next-view-transitions';
import { Button } from '@/components/ui/button';

export default function Page({ params }) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    gender: '',
    age: '',
    blood_group: '',
    quantity: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData); // Displaying entered fields in the console

      const hospitalId = params.slug; // Extracting hospital ID from params.slug
      const response = await fetch('http://localhost:3000/add_patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hospital_id: hospitalId,
          ...formData,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add patient');
      }
      setSuccessMessage('Patient added successfully');

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-semibold text-3xl">Add patient</h1>
      <Link href="/">
        <Button>Back to Home page</Button>
      </Link>
      <Link href={`/hospital/h-intro/${params.slug}`} className="my-3">
        <Button>Hospital home page</Button>
      </Link>
      <div className="flex flex-col my-3">
        <p>Enter patient details</p>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <Input
              className="shadow-md"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              className="shadow-md"
              placeholder="contact number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
            <Input
              className="shadow-md"
              placeholder="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
            <Input
              className="shadow-md"
              placeholder="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
            <Input
              className="shadow-md"
              placeholder="Enter blood group"
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
            />
            <Input
              className="shadow-md"
              placeholder="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
            <Button type="submit" className="my-3 justify-center">
              add patient
            </Button>
          </div>
        </form>
        {successMessage && (
          <p className="text-green-500">{successMessage}</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </main>
  );
}
