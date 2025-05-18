"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";


interface Employee {
  id: number;
  firstname: string;
  lastname: string;
  nationalIdentity: string;
  telephone: string;
  department: string;
  position: string;
  model: string;
  serial_number: string;
  laptop_manufacturer: string;
}

export default function EmployeeDashboard() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [token, setToken] = useState<string | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          const message =
            err.response?.data?.message ||
            err.message ||
            "Failed to fetch employee";
          console.error(message);
          toast.error(message);

          if (status === 401 || status === 403) {
            // Token expired or unauthorized
            localStorage.removeItem("token");
            router.push("/login");
          }
        } else {
          console.error(err);
          toast.error("Something went wrong");
        }
      }
  }
}, [router]);

useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${baseUrl}/employees/allPerPage?page=${page}&limit=10`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(res.data.employees);
        setTotalPages(Math.ceil(res.data.total / 10));
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          const message =
            err.response?.data?.message ||
            err.message ||
            "Failed to fetch employee";
          console.error(message);
          toast.error(message);

          if (status === 401 || status === 403) {
            // Token expired or unauthorized
            localStorage.removeItem("token");
            router.push("/login");
          }
        } else {
          console.error(err);
          toast.error("Something went wrong");
        }
      }
    };

    fetchEmployees();
  }, [router, token, page, baseUrl]);


  return (
    <main className="min-h-[90vh] p-6">
      <div className="max-w-6xl mx-auto p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Employee List</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-800 border text-left text-white">
                <th className="p-4">Name</th>
                <th className="p-4">National ID</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Department</th>
                <th className="p-4">Position</th>
                <th className="p-4">Laptop</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border border-gray-700 text-black">
                  <td className="p-4">
                    {emp.firstname} {emp.lastname}
                  </td>
                  <td className="p-4">{emp.nationalIdentity}</td>
                  <td className="p-4">{emp.telephone}</td>
                  <td className="p-4">{emp.department}</td>
                  <td className="p-4">{emp.position}</td>
                  <td className="p-4">
                    {emp.laptop_manufacturer} - {emp.model} ({emp.serial_number}
                    )
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
            <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
              Previous
            </Button>
            <span className="text-sm text-gray-400">
              Page {page} of {totalPages}
            </span>
            <Button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
              Next
            </Button>
          </div>
      </div>
    </main>
  );
}
