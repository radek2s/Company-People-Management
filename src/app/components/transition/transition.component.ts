import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import DataSourceService from 'src/app/services/datasources';
import { Department, Employee, Location } from 'src/app/models/entities';
import { DepartmentEmployee } from 'src/app/models/dto/department-employee';
import { MatDialog } from '@angular/material/dialog';
import { RoleDialogComponent } from '../shared/dialogs/role-dialog.component';



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
        private editorDialog: MatDialog,
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
            const listId = event.container.element.nativeElement.id
            const prevListId = event.previousContainer.element.nativeElement.id

            switch(listId) {
                case 'list-department':
                    const dialogRef = this.editorDialog.open(RoleDialogComponent)
                    dialogRef.afterClosed().subscribe(role => {
                        if(!!role) {
                            if(prevListId === 'list-temporal') {
                                this.ds.removeEmployeeFromTemporalList(empl.id)
                                this.ds.removeEmployeeFromDepartment(empl.id)
                            }
                            this.ds.addEmployeeToDepartment(empl.id, this.department.id, role)
                        } else {
                            transferArrayItem(                                
                                event.container.data,
                                event.previousContainer.data,
                                event.currentIndex,
                                event.previousIndex,
                            );
                        }
                        
                    })
                    
                    break
                case 'list-temporal':
                    this.ds.addEmployeeToTemporalList(empl.id)
                    break
                case 'list-not-assigned':
                    break
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
