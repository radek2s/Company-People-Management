import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeRole } from 'src/app/models/types';


@Component({
  selector: 'app-role-dialog',
  template: `
  <h1 mat-dialog-title class="dialog-header">
      Choose Employee role
  </h1>
  <div mat-dialog-content>
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
      <button mat-button mat-flat-button color="primary" class="margin-xs" (click)="onNoClick()">Close</button>
      <button mat-button mat-flat-button color="warn" class="margin-xs" (click)="onYesClick()">Apply</button>
  </div>
`,
})
export class RoleDialogComponent {
    roles:EmployeeRole[] = ['employee', 'leader', 'manager', 'other', 'principal', 'support']
    selectedRole: EmployeeRole;

    constructor(private dialogReference: MatDialogRef<RoleDialogComponent>) {
        this.selectedRole = 'employee'
    }

    onNoClick(): void {
        this.dialogReference.close();
    }
    onYesClick(): void {
        this.dialogReference.close(this.selectedRole);
    }

}
