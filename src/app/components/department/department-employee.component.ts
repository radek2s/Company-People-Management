import { Component, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Employee } from 'src/app/models/entities';
import { EmployeeRole } from 'src/app/models/types';
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
<mat-form-field>
  <mat-label>Role</mat-label>
  <mat-select [(value)]="selectedRole">
    <mat-option *ngFor="let r of roles" [value]="r">
      {{r}}
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
    roles:EmployeeRole[] = ['employee', 'leader', 'manager', 'other', 'principal', 'support']
    selected: number;
    selectedRole: EmployeeRole;


    constructor(
        private dialogReference: MatDialogRef<DepartmentEmployeeSelectorDialogComponent>,
        private ds: DataSourceService
    ) {
        this.selected = -1;
        this.selectedRole = 'employee';
        this.ds.getAllEmployees().then(r => { this.employees = r});
    }

    onNoClick(): void {
        this.dialogReference.close();
    }
    onYesClick(): void {
        this.dialogReference.close({id: this.selected, role: this.selectedRole});
    }

}
