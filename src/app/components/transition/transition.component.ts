import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import DataSourceService from 'src/app/services/datasources';
import { Department, Employee, Location } from 'src/app/models/entities';
import { DepartmentEmployee } from 'src/app/models/dto/department-employee';



@Component({
    selector: 'app-transition-component',
    templateUrl: './transition.component.html',
    styleUrls: ['./transition.component.scss']
})
export class TransitionComponent implements OnInit {

    
    department!: Department
    departmentList: Department[]
    location!: Location
    locationList: Location[]
    employeeList: DepartmentEmployee[]
    temporal: DepartmentEmployee[];
    notAssignedList: DepartmentEmployee[];

    constructor(
        private ds: DataSourceService,
    ) {
        this.locationList = [];
        this.departmentList = [];
        this.employeeList = [];
        this.temporal = [];
        this.notAssignedList = [];
    }

    ngOnInit(): void {
        this.getAllLocations()
        
    }

    drop(event: CdkDragDrop<DepartmentEmployee[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
            const empl = event.container.data[event.currentIndex];
            if(!event.container.element.nativeElement.className.includes("source")) {
                this.ds.addEmployeeToTemporalList(empl.id)
            } else {
                if(event.previousContainer.element.nativeElement.className.includes("temporal")) {
                    this.ds.removeEmployeeFromTemporalList(empl.id)
                    this.ds.removeEmployeeFromDepartment(empl.id)
                }
                this.ds.addEmployeeToDepartment(empl.id, this.department.id, "employee")
            }
            
        }
    }

    getAllLocations() {
        this.ds.getAllLocations().then(r => this.locationList = r)
    }

    getDepartments() {
        this.ds.getAllDepartmentsInLocation(this.location.id).then(deps => {
            this.departmentList = deps
        });
    }

    getTemporalEmployees() {
        this.ds.getAllEmployeesInTemporalList().then(emp => {
            this.temporal = emp.map((e) => { 
                const d = new DepartmentEmployee()
                d.id = e.id
                d.name = e.name
                d.surname = e.surname
                return d
            });
        })
    }

    getAllUnassignedEmployees() {
        this.ds.getAllEmployeesNotAssigned().then(r => {
            this.notAssignedList = r.map((e) => {
                const d = new DepartmentEmployee()
                d.id = e.id
                d.name = e.name
                d.surname = e.surname
                return d
            })
        })
    }
    selectLocation() {
        this.getDepartments()
    }
    selectDepartment() {
        this.loadEmployees(this.department.id)
        this.getTemporalEmployees();
        this.getAllUnassignedEmployees()
    }

    loadEmployees(id: number) {
        this.ds.getAllEmployeesInDepartment(id).then(r => {
            const tempIds = this.temporal.map(d => d.id)
            this.employeeList = r.filter(e => { return tempIds.indexOf(e.id) === -1 });
        })
    }



}
