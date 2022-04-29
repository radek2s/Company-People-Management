import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/entities';



@Component({
  selector: 'app-employee-creator-dialog',
  templateUrl: './employee-creator.component.html',
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
