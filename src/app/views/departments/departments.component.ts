import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DepartmentCreatorDialogComponent } from "src/app/components/department/department-creator.component";
import { Department } from "src/app/models/entities";
import DataSourceService from "src/app/services/datasources";



@Component({
    selector: "app-departments",
    templateUrl: "./departments.component.html"
})
export class DepartmentsComponent implements OnInit {

    departments!: Department[];

    constructor(
        private datasource: DataSourceService,
        private editorDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadDepartments()
    }

    loadDepartments() {
        this.datasource.getAllDepartments().then(r => {
            this.departments = r;
        })
    }

    showEmployees(departmentId: number) {
        this.datasource.getAllEmployeesInDepartment(departmentId).then(r => {
            console.log(r);
        })
    }

    addDepartment() {
        const dialogRef = this.editorDialog.open(DepartmentCreatorDialogComponent)
        dialogRef.afterClosed().subscribe(dep => {
            if(!!dep) {
                this.datasource.addDepartmnet(dep)
                this.datasource.getAllDepartments().then(d => this.departments = d)
            }
        })
    }

    // addSite() {
    //     const dialogRef = this.editorDialog.open(SiteCreatorDialogComponent)

    //     dialogRef.afterClosed().subscribe(site => {
    //         if(!!site) {
    //             this.service.addSite(site);
    //         }
    //     })
    // }
    
}