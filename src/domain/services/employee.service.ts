import EmployeeDatasource from "@/data/datasources/employee.datasource";
import { NewEmployeeModel } from "@/utils/types";
import EmployeeDatasourceContract from "../contracts/employeeDatasource.contract";
import { EmployeeListModel, EmployeeModel } from "../models/employee.model";
import {
  GetEmployeeByIdParams,
  UpdateEmployeeParams,
} from "../params/employee.param";

export default class EmployeeService {
  private static _instance: EmployeeService;
  public static getInstance(): EmployeeService {
    if (!EmployeeService._instance) {
      EmployeeService._instance = new EmployeeService();
    }
    return EmployeeService._instance;
  }

  private constructor(
    private datasource: EmployeeDatasourceContract = new EmployeeDatasource()
  ) {}

  public getEmployeeList(): Promise<EmployeeListModel | undefined> {
    return this.datasource.getEmployeeList();
  }

  public createEmployee(
    params: NewEmployeeModel
  ): Promise<EmployeeModel | undefined> {
    return this.datasource.createEmployee(params);
  }

  public getEmployeeById(
    params: GetEmployeeByIdParams
  ): Promise<EmployeeModel | undefined> {
    return this.datasource.getEmployeeById(params);
  }

  public updateEmployeeById(
    params: UpdateEmployeeParams & { id: number }
  ): Promise<EmployeeModel | undefined> {
    return this.datasource.updateEmployeeById(params);
  }

  public deleteEmployeeById(
    params: GetEmployeeByIdParams
  ): Promise<EmployeeModel | undefined> {
    return this.datasource.deleteEmployeeById(params);
  }
}
