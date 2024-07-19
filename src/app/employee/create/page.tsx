"use client";
import { useCreateEmployee } from "@/domain/hooks/useCreateEmployee.hook";
import { NewEmployeeModel } from "@/utils/types";
import { useState } from "react";

export default function EditEmployeePage() {
  const [employeeData, setEmployeeData] = useState<NewEmployeeModel>({
    name: "",
    salary: 0,
    age: 0,
  });

  const createEmployeeMutation = useCreateEmployee();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: name === "salary" || name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createEmployeeMutation.mutate(employeeData);
  };

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4">
      <h1 className="text-2xl font-bold mb-4">Create Employee</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-full max-w-md"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={employeeData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
            placeholder="Enter employee name"
          />
        </div>
        <div>
          <label
            htmlFor="salary"
            className="block text-sm font-medium text-white-700"
          >
            Salary
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            required
            value={employeeData.salary}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
            placeholder="Enter salary"
          />
        </div>
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-white-700"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            required
            value={employeeData.age}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
            placeholder="Enter age"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          disabled={createEmployeeMutation.isPending}
        >
          {createEmployeeMutation.isPending ? "Creating..." : "Create Employee"}
        </button>
        {createEmployeeMutation.isError && (
          <div>An error occurred: {createEmployeeMutation.error.message}</div>
        )}
        {createEmployeeMutation.isSuccess && (
          <div>Employee created successfully!</div>
        )}
      </form>
    </main>
  );
}
