import { Component, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Employee } from 'src/app/models/entities';



@Component({
  selector: 'app-employee-creator-dialog',
  templateUrl: './employee-creator.component.html',
  styleUrls: ['../../../styles.scss']
})
export class EmployeeCreatorDialogComponent {

    employee: Employee;

    constructor(
        private dialogReference: MatDialogRef<EmployeeCreatorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (data && data.employee) {
            this.employee = data.employee;
        } else {
            this.employee = new Employee();
        }
    }

    onNoClick(): void {
        this.dialogReference.close();
    }
    
    onYesClick(): void {
        this.dialogReference.close(this.employee);
    }

}
