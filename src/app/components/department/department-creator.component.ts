import { Component, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Department, Location } from 'src/app/models/entities';
import DataSourceService from 'src/app/services/datasources';



@Component({
  selector: 'app-department-creator-dialog',
  templateUrl: './department-creator.component.html',
})
export class DepartmentCreatorDialogComponent {

    department: Department;
    locations!: Location[];
    selectedLocation: number = -1

    constructor(
        private dialogReference: MatDialogRef<DepartmentCreatorDialogComponent>,
        private datasource: DataSourceService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.initLocations()
        if (data && data.department) {
            this.department = data.department;
        } else {
            this.department = new Department();
        }
    }

    private async initLocations() {
        this.locations = await this.datasource.getAllLocations();
    }

    onNoClick(): void {
        this.dialogReference.close();
    }
    
    onYesClick(): void {
        this.dialogReference.close({dep: this.department, loc: this.selectedLocation});
    }

}
