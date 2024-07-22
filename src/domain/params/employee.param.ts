import { z } from "zod";
import { EmployeeIdSchema } from "../models/employee.model";

export const GetEmployeeByIdSchema = z.object({
  id: EmployeeIdSchema,
});
export type GetEmployeeByIdParams = z.infer<typeof GetEmployeeByIdSchema>;

export const UpdateEmployeeSchema = z.object({
  name: z.string().min(1),
  age: z.number().min(0),
  salary: z.number().min(0),
});
export type UpdateEmployeeParams = z.infer<typeof UpdateEmployeeSchema>;
