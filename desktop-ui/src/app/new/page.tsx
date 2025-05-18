"use client";

import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function NewEmployeePage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    nationalIdentity: "",
    telephone: "",
    department: "",
    position: "",
    model: "",
    serial_number: "",
    laptop_manufacturer: "",
  });

  // Check if user is logged in
  useEffect(() => {
  const storedToken = localStorage.getItem("token");

  if (!storedToken) {
    toast.error("You must be logged in to view this page");
    router.push("/login");
  } else {
    try {
      const decoded: { exp: number } = jwtDecode(storedToken);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        // Token expired
        localStorage.removeItem('token');
        toast.error("Session expired. Please log in again.");
        router.push("/login");
      } else {
        setToken(storedToken);
      }
    } catch (e) {
      // If token is malformed
      console.error("Invalid token", e);
      localStorage.removeItem('token');
      toast.error("Invalid token");
      router.push("/login");
    }
  }
}, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Not authenticated");
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/employees/create`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Employee registered successfully");
      router.push("/dashboard");
    } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    const message = err.response?.data?.message || err.message || 'Failed to register employee'
    console.error(message)
    toast.error(message)
  } else {
    console.error(err)
    toast.error('Something went wrong')
  }
}

  };

  return (
    <main className="min-h-[90vh] p-6">
      <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Register Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              required
            />
            <Input
              label="Last Name"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              label="National ID"
              name="nationalIdentity"
              value={form.nationalIdentity}
              onChange={handleChange}
              required
            />
            <Input
              label="Phone"
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              required
            />
            <Input
              label="Department"
              name="department"
              value={form.department}
              onChange={handleChange}
              required
            />
            <Input
              label="Position"
              name="position"
              value={form.position}
              onChange={handleChange}
              required
            />
            <Input
              label="Laptop Manufacturer"
              name="laptop_manufacturer"
              value={form.laptop_manufacturer}
              onChange={handleChange}
              required
            />
            <Input
              label="Laptop Model"
              name="model"
              value={form.model}
              onChange={handleChange}
              required
            />
            <Input
              label="Laptop Serial"
              name="serial_number"
              value={form.serial_number}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="mt-6">
            Submit
          </Button>
        </form>
      </div>
    </main>
  );
}
