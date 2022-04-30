import { Observable, Subject } from "rxjs";
import { DepartmentEmployee } from "src/app/models/dto/department-employee";
import { Department, Employee, Location } from "src/app/models/entities";
import { EmployeeRole } from "src/app/models/types";
import DataSource, { DataSourceState } from "../datasource.interface";

const DATABASE_VERSION = 1

const SCHEMAS = {
    EMPLOYEES: 'employees',
    EMPLOYEES_DEPARTMENTS_ACTIVITY: 'employees_departments_activity',
    DEPARTMENTS: 'departments',
    DEPARTMENTS_LOCATIONS: 'departments_locations',
    LOCATIONS: 'locations'
}

enum DbAccessType {
    READWRITE = 'readwrite',
    READONLY = 'readonly'
}

export class IndexedDBDataSource implements DataSource {

    status: Subject<DataSourceState>;
    
    private db: any;

    constructor() {
        this.status = new Subject();
        this.status.next(DataSourceState.NOT_AVAILABLE)
    }
    

    async connect(databaseName: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.status.next(DataSourceState.CONNECTING);
            const openRequest = indexedDB.open(databaseName, DATABASE_VERSION);
            openRequest.onupgradeneeded = this.databaseUpgrade.bind(this);
            openRequest.onsuccess = async (event:any) => {
                resolve (await this.databaseConnected(event));
            }
            openRequest.onerror = () => {
                this.status.next(DataSourceState.NOT_AVAILABLE);
                reject();
            }
            openRequest.onblocked = () => {
                this.status.next(DataSourceState.NOT_AVAILABLE);
                reject();
            }
        })
    }

    getAllEmployees(): Promise<Employee[]> {
        return new Promise((resolve, reject) => {
            const t = this.db.transaction(SCHEMAS.EMPLOYEES, DbAccessType.READONLY)
            const store = t.objectStore(SCHEMAS.EMPLOYEES)
            const req = store.getAll();
            req.onsuccess = (event: any) => {
                resolve(event.target.result)
            }
            req.onerror = (e: any) => {
                reject(e)
            }
        })
    }
    
    getEmployee(id: number): Promise<Employee> {
        return new Promise((resolve, reject) => {
            const t = this.db.transaction(SCHEMAS.EMPLOYEES, DbAccessType.READONLY)
            const store = t.objectStore(SCHEMAS.EMPLOYEES)
            const req = store.get(id);
            req.onsuccess = (event: any) => {
                resolve(event.target.result)
            }
            req.onerror = (e: any) => {
                reject(e)
            }
        })
    }

    addEmployee(employee: Employee): void {
        const t = this.db.transaction(SCHEMAS.EMPLOYEES, DbAccessType.READWRITE);
        const store = t.objectStore(SCHEMAS.EMPLOYEES);
        const req = store.add(employee);
        req.onsuccess = () => {
            console.log("Employee added");
        }
    }
    updateEmployee(employee: Employee): void {
        const t = this.db.transaction(SCHEMAS.EMPLOYEES, DbAccessType.READWRITE);
        const store = t.objectStore(SCHEMAS.EMPLOYEES);
        const req = store.put(employee, employee.id);
        req.onsuccess = () => {
            console.log("Employee updated");
        }
    }
    deleteEmployee(id: number): void {
        const t = this.db.transaction(SCHEMAS.EMPLOYEES, DbAccessType.READWRITE);
        const store = t.objectStore(SCHEMAS.EMPLOYEES);
        const req = store.delete(id);
        req.onsuccess = () => {
            console.log("Employee deleted");
        }
    }
    getAllDepartments(): Promise<Department[]> {
        return new Promise((resolve, reject) => {
            const t = this.db.transaction(SCHEMAS.DEPARTMENTS, DbAccessType.READONLY)
            const store = t.objectStore(SCHEMAS.DEPARTMENTS)
            const req = store.getAll();
            req.onsuccess = (event: any) => {
                resolve(event.target.result)
            }
            req.onerror = (e: any) => {
                reject(e)
            }
        })
    }
    getDepartment(id: number): Promise<Department> {
        return new Promise((resolve, reject) => {
            const t = this.db.transaction(SCHEMAS.DEPARTMENTS, DbAccessType.READONLY)
            const store = t.objectStore(SCHEMAS.DEPARTMENTS)
            const req = store.get(id);
            req.onsuccess = (event: any) => {
                resolve(event.target.result)
            }
            req.onerror = (e: any) => {
                reject(e)
            }
        })
    }
    addDepartment(department: Department): void {
        const t = this.db.transaction(SCHEMAS.DEPARTMENTS, DbAccessType.READWRITE);
        const store = t.objectStore(SCHEMAS.DEPARTMENTS);
        const req = store.add(department);
        req.onsuccess = () => {
            console.log("Department added");
        }
    }
    updateDepartment(department: Department): void {
        const t = this.db.transaction(SCHEMAS.DEPARTMENTS, DbAccessType.READWRITE);
        const store = t.objectStore(SCHEMAS.DEPARTMENTS);
        const req = store.put(department, department.id);
        req.onsuccess = () => {
            console.log("Department updated");
        }
    }
    deleteDepartment(id: number): void {
        const t = this.db.transaction(SCHEMAS.DEPARTMENTS, DbAccessType.READWRITE);
        const store = t.objectStore(SCHEMAS.DEPARTMENTS);
        const req = store.delete(id);
        req.onsuccess = () => {
            console.log("Department deleted");
        }
    }
    getAllEmployeesInDepartment(departmentId: number): Promise<DepartmentEmployee[]> {
        return new Promise((resolve, reject) => {
            const t = this.db.transaction(SCHEMAS.EMPLOYEES_DEPARTMENTS_ACTIVITY, DbAccessType.READWRITE);
            const store = t.objectStore(SCHEMAS.EMPLOYEES_DEPARTMENTS_ACTIVITY);
            const req = store.getAll();
            req.onsuccess = (event: any) => {

                let empData = event.target.result.filter((res:any) => (res.departmentId === departmentId && !res.left))
                let empIds = empData.map((e: any) => {return e.employeeId})
                this.getAllEmployees().then((e) => {
                    let empList = []
                    const result = []
                    empList = e.filter(e => { return empIds.indexOf(e.id) > -1})
                    for(let i = 0; i < empList.length; i++) {
                        const de = new DepartmentEmployee()
                        de.id = empList[i].id
                        de.name = empList[i].name
                        de.surname = empList[i].surname
                        de.joined = empData[i].joined
                        de.role = empData[i].role
                        result.push(de)
                    }
                    resolve(result)
                })
            }
            req.onerror = (e: any) => {
                reject(e)
            }
        })
    }
    addEmployeeToDepartment(employeeId: number, departmentId: number, role: EmployeeRole): void {
        const t = this.db.transaction(SCHEMAS.EMPLOYEES_DEPARTMENTS_ACTIVITY, DbAccessType.READWRITE);
        const store = t.objectStore(SCHEMAS.EMPLOYEES_DEPARTMENTS_ACTIVITY);
        const req = store.add({employeeId, departmentId, joined: new Date(), left: null, role});
        req.onsuccess = () => {
            console.log("Department deleted");
        }
    }
    getAllLocations(): Promise<Location[]> {
        throw new Error("Method not implemented.");
    }
    getLocation(id: number): Promise<Location> {
        throw new Error("Method not implemented.");
    }
    addLocation(location: Location): void {
        throw new Error("Method not implemented.");
    }
    updateLocation(location: Location): void {
        throw new Error("Method not implemented.");
    }
    deleteLocation(id: number): void {
        throw new Error("Method not implemented.");
    }
    getAllDepartmentsInLocation(): void {
        throw new Error("Method not implemented.");
    }


    private databaseUpgrade(event: any):void {
        console.debug("⚙️ Database upgrade...")
        this.db = event.target.result;

        if (!this.db.objectStoreNames.contains(SCHEMAS.EMPLOYEES)) {
            console.log("Creating object store Employees");
            this.db.createObjectStore(SCHEMAS.EMPLOYEES, { keyPath: "id", autoIncrement: true });
        }
        if (!this.db.objectStoreNames.contains(SCHEMAS.LOCATIONS)) {
            console.log("Creating object store Locations");
            this.db.createObjectStore(SCHEMAS.LOCATIONS, { keyPath: "id" , autoIncrement: true});
        }
        if (!this.db.objectStoreNames.contains(SCHEMAS.DEPARTMENTS)) {
            console.log("Creating object store Departments");
            this.db.createObjectStore(SCHEMAS.DEPARTMENTS, { keyPath: "id" , autoIncrement: true});
        }
        if (!this.db.objectStoreNames.contains(SCHEMAS.EMPLOYEES_DEPARTMENTS_ACTIVITY)) {
            console.log("Creating object store Employees-Sites");
            this.db.createObjectStore(SCHEMAS.EMPLOYEES_DEPARTMENTS_ACTIVITY, { keyPath: ["employeeId", "departmentId"] });
        }
        if (!this.db.objectStoreNames.contains(SCHEMAS.DEPARTMENTS_LOCATIONS)) {
            console.log("Creating object store Employees-Sites");
            this.db.createObjectStore(SCHEMAS.DEPARTMENTS_LOCATIONS, { keyPath: ["employeeId", "departmentId"] });
        }
    }

    private async databaseConnected(event: any): Promise<void> {
        return new Promise(resolve => {
            this.db = event.target.result;
            
            this.db.onversionchange = () => {
                this.db.close();
                alert("Database is outdated, please reload page.")
            }

            this.databaseInitialization();
            this.status.next(DataSourceState.ESTABLISHED);

            resolve();
        })
    }

    private databaseInitialization() {
        let emp1 = new Employee();
        emp1.id = 1;
        emp1.name = "John";
        emp1.surname = "Doe";
        emp1.birthDate = "01/01/2000";
        emp1.birthPlace = "London";
        emp1.phoneNumber = "0123456789";
        emp1.email = "example@mail.com";
        this.addEmployee(emp1);
        let emp2 = new Employee();
        emp2.id = 2;
        emp2.name = "Mark";
        emp2.surname = "Stark";
        emp2.birthDate = "01/01/1990";
        emp2.birthPlace = "Poland";
        emp2.phoneNumber = "0123456789";
        emp2.email = "example2@mail.com";
        this.addEmployee(emp2);
        let department = new Department();
        department.id = 1;
        department.name = "Programmers"
        department.description = "Locker password is 1234"
        this.addDepartment(department);
        this.addEmployeeToDepartment(1,1, 'manager');
    }

}