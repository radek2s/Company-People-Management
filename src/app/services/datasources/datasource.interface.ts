import { Subject } from "rxjs";
import { DepartmentEmployee } from "src/app/models/dto/department-employee";
import { Employee, Location, Department } from "src/app/models/entities";
import { EmployeeRole } from "src/app/models/types";

export enum DataSourceState {
    CONNECTING,
    ESTABLISHED,
    NOT_AVAILABLE
}

export default interface DataSource {

    status: Subject<DataSourceState>;
    
    connect(settings: any): Promise<void>;

    getAllEmployees(): Promise<Employee[]>;

    getEmployee(id: number): Promise<Employee>;

    addEmployee(employee: Employee): void;

    updateEmployee(employee: Employee): void;

    deleteEmployee(id: number): void;

    getAllDepartments(): Promise<Department[]>;

    getDepartment(id: number): Promise<Department>;

    addDepartment(department: Department): void;

    updateDepartment(department: Department): void;

    deleteDepartment(id: number): void;

    getAllEmployeesInDepartment(employeeId: number): Promise<DepartmentEmployee[]>;

    addEmployeeToDepartment(employeeId: number, siteId: number, role: EmployeeRole): void;

    getAllLocations(): Promise<Location[]>;

    getLocation(id: number): Promise<Location>;

    addLocation(location: Location): void;

    updateLocation(location: Location): void;

    deleteLocation(id: number): void;

    getAllDepartmentsInLocation(): void;

}