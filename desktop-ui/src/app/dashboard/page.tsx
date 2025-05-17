"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
      setToken(storedToken);
    }
  }, [router]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${baseUrl}/employees/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(res.data.employees);
        setTotalPages(Math.ceil(res.data.total / 10))
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const message =
            err.response?.data?.message ||
            err.message ||
            "Failed to fetch employee";
          console.error(message);
          toast.error(message);
        } else {
          console.error(err);
          toast.error("Something went wrong");
        }
      }
    };

    fetchEmployees();
  }, [token, page, baseUrl]);

  return (
    
    <main className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-gray-900 p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Employee List</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-white">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">National ID</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Position</th>
                <th className="px-4 py-2">Laptop</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-t border-gray-700">
                  <td className="px-4 py-2">
                    {emp.firstname} {emp.lastname}
                  </td>
                  <td className="px-4 py-2">{emp.nationalIdentity}</td>
                  <td className="px-4 py-2">{emp.telephone}</td>
                  <td className="px-4 py-2">{emp.department}</td>
                  <td className="px-4 py-2">{emp.position}</td>
                  <td className="px-4 py-2">
                    {emp.laptop_manufacturer} - {emp.model} ({emp.serial_number}
                    )
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <Button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>Previous</Button>
          <span className="text-sm text-gray-400">Page {page} of {totalPages}</span>
          <Button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}>Next</Button>
        </div>
      </div>
    </main>
  );
}
