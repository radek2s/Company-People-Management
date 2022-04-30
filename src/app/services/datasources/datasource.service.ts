import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DepartmentEmployee } from "src/app/models/dto/department-employee";
import { Department, Employee } from "src/app/models/entities";
import { Location } from "src/app/models/entities";
import { EmployeeRole } from "src/app/models/types";
import DataSource, { DataSourceState } from "./datasource.interface";
import { IndexedDBDataSource } from "./modules";

const DATABASE_NAME = "hr_db"

@Injectable({
    providedIn: 'root'
})
export class DataSourceService {

    private datasource!: DataSource;
    private settings: any = null;
    private connected: boolean = false;

    constructor() {
        this.initailize();
    }

    public getConnectionState(): Observable<DataSourceState> {
        return this.datasource.status.asObservable();
    }

    public getActiveDB(): string {
        if (this.datasource instanceof IndexedDBDataSource) return "indexeddb";
        return "mocked";
    }

    public initailize(dbName = "indexeddb") {
        // let db = JSON.parse(localStorage.getItem("db"));
        // if (!db) db = { name: "indexeddb", config: { name: "mydb", version: 1 } };
        // if (db.name == "indexeddb") {
        //     this.datasource = new IndexedDBDataSource();
        // } else if (db.name == "mocked") {
        //     this.datasource = new MockedDataSource();
        // }
        if(dbName == "indexeddb"){
            this.datasource = new IndexedDBDataSource();
            this.settings = DATABASE_NAME;
        } else if (dbName == "mocked") {
            // this.datasource = new MockedDataSource();
        }
        this.datasource.connect(this.settings).then(() => {
            console.log(this.datasource.constructor.name);
            this.connected = true;
        });
    }


    public getAllEmployees(): Promise<Employee[]> {
        return this.datasource.getAllEmployees();
    }

    public getEmployee(id: number): Promise<Employee> {
        return this.datasource.getEmployee(id)
    }

    public addEmployee(employee: Employee) {
        console.log("Adding employee DataSource service");

        if (this.connected) {
            console.log(employee);
            this.datasource.addEmployee(employee);
        }
    }

    public updateEmployee(employee: Employee) {
        this.datasource.updateEmployee(employee);
    }

    public deleteEmployee(id: number) {
        this.datasource.deleteEmployee(id);
    }

    public getAllDepartments() {
        return this.datasource.getAllDepartments()
    }

    public addDepartmnet(department: Department) {
        this.datasource.addDepartment(department)
    }

    public getAllLocations(): Promise<Location[]> {
        return this.datasource.getAllLocations()
    }

    public getAllEmployeesInDepartment(departmentId: number): Promise<DepartmentEmployee[]> {
        return this.datasource.getAllEmployeesInDepartment(departmentId)
    }

    public addEmployeeToDepartment(employeeId:number, departmentId: number, role: EmployeeRole) {
        this.datasource.addEmployeeToDepartment(employeeId, departmentId, role)
    }

}