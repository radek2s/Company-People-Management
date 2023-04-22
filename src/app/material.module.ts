import { NgModule } from "@angular/core";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';






@NgModule({
  imports: [
    DragDropModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule
  ],
  exports: [
    DragDropModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule
  ]
})
export class MaterialModule { }
