import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import DataSourceService from 'src/app/services/datasources';
import { Department, Employee } from 'src/app/models/entities';
import { DepartmentEmployee } from 'src/app/models/dto/department-employee';



@Component({
    selector: 'app-transition-component',
    templateUrl: './transition.component.html',
    styleUrls: ['./transition.component.scss']
})
export class TransitionComponent implements OnInit {

    
    department!: Department
    departmentList: Department[]
    employeeList: DepartmentEmployee[]
    temporal: DepartmentEmployee[];

    constructor(
        private ds: DataSourceService,
    ) {
        this.employeeList = [];
        this.departmentList = [];
        this.temporal = [];
    }

    ngOnInit(): void {
        this.getDepartments();
        this.getTemporalEmployees();
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
            console.log(event.container.element.nativeElement.className.includes("source"))
            if(!event.container.element.nativeElement.className.includes("source")) {
                this.ds.addEmployeeToTemporalList(empl.id)
            } else {
                this.ds.removeEmployeeFromTemporalList(empl.id)
                this.ds.removeEmployeeFromDepartment(empl.id)
                this.ds.addEmployeeToDepartment(empl.id, this.department.id, "employee")
            }
            
        }
    }

    getDepartments() {
        this.ds.getAllDepartments().then(deps => {
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

    selectDepartment() {
        this.loadEmployees(this.department.id)
    }

    loadEmployees(id: number) {
        this.ds.getAllEmployeesInDepartment(id).then(r => {
            const tempIds = this.temporal.map(d => d.id)

            this.employeeList = r.filter(e => { return tempIds.indexOf(e.id) > -1 });
            
        })
    }



}
