// src/hooks/useCreateEmployee.hook.ts
import { NewEmployeeModel } from "@/utils/types";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { EmployeeModel } from "../models/employee.model";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useCreateEmployee = (): UseMutationResult<
  EmployeeModel | undefined,
  Error,
  NewEmployeeModel,
  unknown
> => {
  return useMutation<EmployeeModel | undefined, Error, NewEmployeeModel>({
    mutationFn: async (newEmployee: NewEmployeeModel) => {
      return service.createEmployee(newEmployee);
    },
  });
};
