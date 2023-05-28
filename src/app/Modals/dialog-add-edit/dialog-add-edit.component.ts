import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { Area } from '../../Interfaces/area';
import { Employee } from '../../Interfaces/employee';
import { AreaService } from '../../Services/area.service';
import { EmployeeService } from '../../Services/employee.service';

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
}

@Component({
    selector: 'app-dialog-add-edit',
    templateUrl: './dialog-add-edit.component.html',
    styleUrls: ['./dialog-add-edit.component.css'],
    providers: [{ provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FORMATS }]
})

export class DialogAddEditComponent implements OnInit {

    formEmployee: FormGroup;
    actionTitle: string = "New";
    actionButton: string = "Save";
    areaList: Area[] = [];

    // dependency inyection
    constructor(
        private dialogReference: MatDialogRef<DialogAddEditComponent>,
        private fb: FormBuilder,
        private _snackBar: MatSnackBar,
        private _areaService: AreaService,
        private _employeeService: EmployeeService,
        @Inject(MAT_DIALOG_DATA) public dataEmployee: Employee,
    ) {
        // specify all camps in the form
        this.formEmployee = this.fb.group({
            completeName: ["", Validators.required],
            idArea: ["", Validators.required],
            salary: ["", Validators.required],
            hireDate: ["", Validators.required]
        })

        this._areaService.getList().subscribe({
            // if status.ok
            next: (data) => {
                this.areaList = data;
                //this.areaList = [data];
            }, error: (e) => {
                console.log(e);
            }
        })
    }

    displayAlert(message: string, action: string) {
        this._snackBar.open(message, action, {
            horizontalPosition: "end",
            verticalPosition: "top",
            duration: 3000
        });
    }

    // method to put the employee in the table
    addEditEmployee() {

        console.log(this.formEmployee.value)

        const model: Employee = {
            idEmployee: 0,
            completeName: this.formEmployee.value.completeName,
            idArea: this.formEmployee.value.idArea,
            salary: this.formEmployee.value.salary,
            hireDate: moment(this.formEmployee.value.hireDate).format('DD/MM/YYYY')
        }

        if (this.dataEmployee == null) {

            this._employeeService.add(model).subscribe({
                next: (data) => {
                    this.displayAlert("Employee was created", "Done");
                    this.dialogReference.close("Created");
                }, error: (e) => {
                    this.displayAlert("Employee creation failed", "Error");
                }
            })
        }
        else {
            this._employeeService.update(this.dataEmployee.idEmployee, model).subscribe({
                next: (data) => {
                    this.displayAlert("Employee was edited", "Done");
                    this.dialogReference.close("Updated");
                }, error: (e) => {
                    this.displayAlert("Employee creation failed", "Error");
                }
            })
        }
    }

        ngOnInit(): void {
            if(this.dataEmployee) {
            this.formEmployee.patchValue({
                completeName: this.dataEmployee.completeName,
                idArea: this.dataEmployee.idArea,
                salary: this.dataEmployee.salary,
                hireDate: moment(this.dataEmployee.hireDate, 'DD/MM/YYYY')
            });

            this.actionTitle = "Edit";
            this.actionButton = "Update";

        }
    }
}