import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EmployeeCreatorDialogComponent } from "src/app/components/employee/employee-creator.component";
import { Employee } from "src/app/models/entities";

import DataSourceService from "src/app/services/datasources";


@Component({
    selector: "app-employees",
    templateUrl: "./employees.component.html",
    styleUrls: ["../../../styles.scss"]
    
})
export class EmployeesComponent implements OnInit {

    employees!: Employee[];

    constructor(
        private datasource: DataSourceService,
        private editorDialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.loadEmployees();
    }

    loadEmployees() {
        this.datasource.getAllEmployees().then(r => {
            this.employees = r;
            console.log(this.employees);
        });
    }

    getEmployees() {
        this.datasource.getEmployee(1).then(r => {
            console.log(r);
        })
    }

    editEmployee(employee: Employee) {
        console.log(employee);
        
        const dialogRef = this.editorDialog.open(EmployeeCreatorDialogComponent, {
            data: {
                employee: Object.assign({},employee)
            }
        });

        dialogRef.afterClosed().subscribe(e => {
            if(!!e) {
                const i = this.employees.findIndex(o => o.id === e.id);
                this.employees[i] = e;
                
                // this.service.updateEmployee(employee);
            }
        })
    }

    addEmployee() {
        const dialogRef = this.editorDialog.open(EmployeeCreatorDialogComponent);

        dialogRef.afterClosed().subscribe(employee => {
            if(!!employee) {
                this.datasource.addEmployee(employee);
            }
        })

        // this.service.addEmployee();
    }

    // showSites(emp: Employee) {
    //     this.service.getEmployeeSites(emp.id).then(r => {
    //         console.log(r);
    //     })
    // }
    
}