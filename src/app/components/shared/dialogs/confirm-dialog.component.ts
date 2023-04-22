import { Component, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';


@Component({
  selector: 'app-confirm-dialog',
  template: `
  <h1 mat-dialog-title class="dialog-header">
      {{data.title}}
  </h1>
  <div mat-dialog-content>
      <p>{{data.message}}</p>
  </div>
  <div class="dialog-actions">
      <button mat-button mat-flat-button color="primary" class="margin-xs" (click)="onNoClick()">{{btnTextCancel}}</button>
      <button mat-button mat-flat-button color="warn" class="margin-xs" (click)="onYesClick()">{{btnTextOk}}</button>
  </div>
`,
})
export class ConfirmDialogComponent {
    btnTextCancel = "Cancel";
    btnTextOk = "Accept";

    constructor(
        private dialogReference: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (data.btnTextCancel) {
            this.btnTextCancel = data.btnTextCancel;
        }
        if (data.btnTextOk) {
            this.btnTextOk = data.btnTextOk;
        }
    }

    onNoClick(): void {
        this.dialogReference.close(false);
    }
    onYesClick(): void {
        this.dialogReference.close(true);
    }

}
