import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
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
        // private editorDialog: MatDialog
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

    // addSite() {
    //     const dialogRef = this.editorDialog.open(SiteCreatorDialogComponent)

    //     dialogRef.afterClosed().subscribe(site => {
    //         if(!!site) {
    //             this.service.addSite(site);
    //         }
    //     })
    // }
    
}