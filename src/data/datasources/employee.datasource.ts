import EmployeeDatasourceContract from "@/domain/contracts/employeeDatasource.contract";
import {
  EmployeeListModel,
  EmployeeListSchema,
  EmployeeModel,
  EmployeeSchema,
} from "@/domain/models/employee.model";
import {
  GetEmployeeByIdParams,
  UpdateEmployeeParams,
} from "@/domain/params/employee.param";

export default class EmployeeDatasource extends EmployeeDatasourceContract {
  public async getEmployeeList(): Promise<EmployeeListModel | undefined> {
    try {
      const response = await fetch(
        "https://dummy.restapiexample.com/api/v1/employees"
      );
      if (response.status !== 200) {
        return undefined;
      }

      const json = await response.json();
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
      console.error("Error creating employee:", exception);
      return undefined;
    }
  }

  public async getEmployeeById(
    params: GetEmployeeByIdParams
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/employee/${params.id}`
      );

      if (response.status === 429) {
        throw new Error("Too many requests. Please try again later.");
      }

      if (response.status !== 200) {
        throw new Error(
          `Failed to fetch employee. Status code: ${response.status}`
        );
      }

      const json = await response.json();
      const data = json["data"];

      return EmployeeSchema.parse(data);
    } catch (exception) {
      console.error(exception);
      throw new Error(
        `An error occurred while fetching the employee: ${exception}`
      );
    }
  }

  public async updateEmployeeById(
    params: UpdateEmployeeParams & { id: number }
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/update/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: params.name,
            age: params.age,
            salary: params.salary,
          }),
        }
      );

      if (response.status === 429) {
        throw new Error("Too many requests. Please try again later.");
      }

      if (response.status !== 200) {
        throw new Error(
          `Failed to update employee. Status code: ${response.status}`
        );
      }

      const json = await response.json();
      const data = json["data"];

      return EmployeeSchema.parse(data);
    } catch (exception) {
      console.error("Error updating employee by ID:", exception);

      if (exception instanceof Error) {
        throw new Error(
          `An error occurred while updating the employee: ${exception.message}`
        );
      } else {
        throw new Error(
          "An unknown error occurred while updating the employee."
        );
      }
    }
  }

  public async deleteEmployeeById(
    params: GetEmployeeByIdParams
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/delete/${params.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 429) {
        throw new Error("Too many requests. Please try again later.");
      }

      if (response.status !== 200) {
        throw new Error(
          `Failed to delete employee. Status code: ${response.status}`
        );
      }

      const json = await response.json();
      const data = json["data"];

      return EmployeeSchema.parse(data);
    } catch (exception) {
      console.error("Error deleting employee by ID:", exception);

      if (exception instanceof Error) {
        throw new Error(
          `An error occurred while deleting the employee: ${exception.message}`
        );
      } else {
        throw new Error(
          "An unknown error occurred while deleting the employee."
        );
      }
    }
  }
}
