import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Employee } from "src/app/models/entities";



@Component({
    selector: "employee-info-card",
    templateUrl: "./employee-card.component.html",
})
export class EmployeeInfoCardComponent {

    @Input() employee!: Employee;
    @Output() edit = new EventEmitter<Employee>();
    @Output() delete = new EventEmitter<number>();
    @Output() debuger = new EventEmitter<Employee>();

    editEmployee() {
        this.edit.emit(this.employee);
    }

    deleteEmployee() {
        this.delete.emit(this.employee.id)
    }

    debug() {
        this.debuger.emit(this.employee);
    }

}