import EmployeeDatasourceContract from "@/domain/contracts/employeeDatasource.contract";
import {
  EmployeeListModel,
  EmployeeListSchema,
  EmployeeModel,
  EmployeeSchema,
} from "@/domain/models/employee.model";
import { GetEmployeeByIdParams } from "@/domain/params/employee.param";

export default class EmployeeDatasource extends EmployeeDatasourceContract {
  public async getEmployeeList(): Promise<EmployeeListModel | undefined> {
    try {
      const response = await fetch(
        "https://dummy.restapiexample.com/api/v1/employees"
      );

      // Validate response
      if (response.status !== 200) {
        return undefined;
      }

      // Obtain json from response
      const json = await response.json();
      // Extract data
      const data = json["data"];

      return EmployeeListSchema.parse(data);
    } catch (exception) {
      return undefined;
    }
  }

  public async createEmployee(
    params: Partial<EmployeeModel>
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(
        "https://dummy.restapiexample.com/api/v1/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );

      if (response.status === 429) {
        throw new Error("Too many requests. Please try again later.");
      }

      if (response.status !== 201) {
        throw new Error(
          `Failed to create employee. Status code: ${response.status}`
        );
      }

      const json = await response.json();
      const data = json["data"];

      return EmployeeSchema.parse(data);
    } catch (exception) {
      return undefined;
    }
  }

  public async getEmployeeById(
    params: GetEmployeeByIdParams
  ): Promise<EmployeeModel | undefined> {
    throw new Error("Method not implemented.");
  }

  public async updateEmployeeById(
    params: unknown
  ): Promise<EmployeeModel | undefined> {
    throw new Error("Method not implemented.");
  }

  public deleteEmployeeById(
    params: unknown
  ): Promise<EmployeeModel | undefined> {
    throw new Error("Method not implemented.");
  }
}
