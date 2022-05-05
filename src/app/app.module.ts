import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/layout';
import { MaterialModule } from './material.module';
import { ConfirmDialogComponent } from './components/shared';
import { EmployeeCreatorDialogComponent } from './components/employee/employee-creator.component';
import { EmployeeInfoCardComponent } from './components/employee/employee-card.component';
import { DepartmentInfoCardComponent } from './components/department/department-card.component';
import { LocationInfoCardComponent } from './components/locations/location-card.component';
import { DepartmentsComponent, EmployeesComponent, HomeComponent, LocationsComponent, SettingsComponent } from './views';
import { LocationCreatorDialogComponent } from './components/locations/location-creator.component';
import { DepartmentCreatorDialogComponent } from './components/department/department-creator.component';
import { DepartmentEmployeeSelectorDialogComponent } from './components/department/department-employee.component';
import { TransitionComponent } from './components/transition/transition.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConfirmDialogComponent,
    SettingsComponent,
    HomeComponent,
    EmployeesComponent,
    EmployeeInfoCardComponent,
    EmployeeCreatorDialogComponent,
    DepartmentsComponent,
    DepartmentInfoCardComponent,
    DepartmentCreatorDialogComponent,
    DepartmentEmployeeSelectorDialogComponent,
    LocationsComponent,
    LocationInfoCardComponent,
    LocationCreatorDialogComponent,
    TransitionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
