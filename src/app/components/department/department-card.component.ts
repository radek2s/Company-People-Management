import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DepartmentEmployee } from "src/app/models/dto/department-employee";
import { Department, Employee } from "src/app/models/entities";
import DataSourceService from "src/app/services/datasources";
import { DepartmentEmployeeSelectorDialogComponent } from "./department-employee.component";
import {MatTableDataSource} from '@angular/material/table';



@Component({
    selector: "department-info-card",
    templateUrl: "./department-card.component.html",
    styleUrls: ["./department-card.component.scss"]
})
export class DepartmentInfoCardComponent {

    @Input() department!: Department;
    @Output() edit = new EventEmitter<Department>();
    @Output() delete = new EventEmitter<number>();
    employees!: DepartmentEmployee[];
    extended: boolean = false;
    dataSource = new MatTableDataSource<DepartmentEmployee>()
    displayedColumns= ['role', 'name', 'surname', 'joined']

    constructor(
        private ds: DataSourceService,
        private dialog: MatDialog
    ) {}

    editDepartment() {
        this.edit.emit(this.department);
    }

    loadEmployees() {
        this.extended = !this.extended
        if(this.extended) {
            this.ds.getAllEmployeesInDepartment(this.department.id).then(r => {
                this.employees = r;
                this.dataSource = new MatTableDataSource(r)
            })
        }
    }

    isExtended() {
        
    }

    addEmployee() {
        const dialogRef = this.dialog.open(DepartmentEmployeeSelectorDialogComponent)
        dialogRef.afterClosed().subscribe(user => {
            if(!!user) {
                this.ds.addEmployeeToDepartment(user.id, this.department.id, user.role)
            }
        })

    }

    deleteDepartment() {
        this.delete.emit(this.department.id)
    }

}