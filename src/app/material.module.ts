import { NgModule } from "@angular/core";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';





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
    MatSelectModule
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
    MatSelectModule
  ]
})
export class MaterialModule { }
