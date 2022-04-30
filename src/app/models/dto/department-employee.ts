import { EmployeeRole } from "../types";

export class DepartmentEmployee {
    id!: number;
    name!: string;
    surname!: string;
    joined!: Date;
    role!: EmployeeRole
}