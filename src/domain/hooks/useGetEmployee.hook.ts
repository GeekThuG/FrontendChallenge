// src/hooks/useEmployee.hook.ts
import { EmployeeModel } from "@/domain/models/employee.model";
import EmployeeService from "@/domain/services/employee.service";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const service = EmployeeService.getInstance();

export const useEmployee = (
  id: number
): UseQueryResult<EmployeeModel, Error> => {
  return useQuery<EmployeeModel, Error>(
    ["employee", id],
    () => service.getEmployeeById({ id }),
    {
      enabled: !!id, // Ensure the query runs only if the id is valid
    }
  );
};
