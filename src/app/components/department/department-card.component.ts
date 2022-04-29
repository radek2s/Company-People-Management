import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DepartmentEmployee } from "src/app/models/dto/department-employee";
import { Department, Employee } from "src/app/models/entities";
import DataSourceService from "src/app/services/datasources";
import { DepartmentEmployeeSelectorDialogComponent } from "./department-employee.component";



@Component({
    selector: "department-info-card",
    templateUrl: "./department-card.component.html",
})
export class DepartmentInfoCardComponent {

    @Input() department!: Department;
    @Output() edit = new EventEmitter<Department>();
    @Output() delete = new EventEmitter<number>();
    employees!: DepartmentEmployee[];

    constructor(
        private ds: DataSourceService,
        private dialog: MatDialog
    ) {}

    editDepartment() {
        this.edit.emit(this.department);
    }

    loadEmployees() {
        this.ds.getAllEmployeesInDepartment(this.department.id).then(r => {
            this.employees = r;
        })
    }

    addEmployee() {
        const dialogRef = this.dialog.open(DepartmentEmployeeSelectorDialogComponent)
        dialogRef.afterClosed().subscribe(id => {
            if(id > -1) {
                this.ds.addEmployeeToDepartment(id, this.department.id)
            }
        })

    }

    deleteDepartment() {
        this.delete.emit(this.department.id)
    }

}