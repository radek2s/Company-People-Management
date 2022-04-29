import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/entities';
import DataSourceService from 'src/app/services/datasources';


@Component({
    selector: 'app-confirm-dialog',
    template: `
  <h1 mat-dialog-title class="dialog-header">
      Select an employee
  </h1>
  <div mat-dialog-content>
  <mat-form-field *ngIf="employees">
  <mat-label>Employee</mat-label>
  <mat-select [(value)]="selected">
    <mat-option *ngFor="let emp of employees" [value]="emp.id">
      {{emp.name}}
    </mat-option>
  </mat-select>
</mat-form-field>
  </div>
  <div class="dialog-actions">
      <button mat-button mat-flat-button color="primary" class="margin-xs" (click)="onNoClick()">Cancel</button>
      <button mat-button mat-flat-button color="warn" class="margin-xs" (click)="onYesClick()">Save</button>
  </div>
`,
})
export class DepartmentEmployeeSelectorDialogComponent {
    employees!: Employee[];
    selected: number;

    constructor(
        private dialogReference: MatDialogRef<DepartmentEmployeeSelectorDialogComponent>,
        private ds: DataSourceService
    ) {
        this.selected = -1;
        this.ds.getAllEmployees().then(r => { this.employees = r});
    }

    onNoClick(): void {
        this.dialogReference.close(-1);
    }
    onYesClick(): void {
        this.dialogReference.close(this.selected);
    }

}
