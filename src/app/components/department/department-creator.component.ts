import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Department } from 'src/app/models/entities';



@Component({
  selector: 'app-department-creator-dialog',
  templateUrl: './department-creator.component.html',
})
export class DepartmentCreatorDialogComponent {

    department: Department;

    constructor(
        private dialogReference: MatDialogRef<DepartmentCreatorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (data && data.department) {
            this.department = data.department;
        } else {
            this.department = new Department();
        }
    }

    onNoClick(): void {
        this.dialogReference.close();
    }
    
    onYesClick(): void {
        this.dialogReference.close(this.department);
    }

}
