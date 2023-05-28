import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from './Interfaces/employee';
import { EmployeeService } from './Services/employee.service';
import { DialogAddEditComponent } from './Modals/dialog-add-edit/dialog-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogDeleteComponent } from './Modals/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit, OnInit {
  // columns origin
  displayedColumns:string[]=['CompleteName', 'Area', 'Salary', 'HireDate', 'Actions'];
  // data origin
  dataSource = new MatTableDataSource<Employee>();
 
  constructor(private _employeeService: EmployeeService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.displayEmployees();
  }

  // added "!" after paginator to avoid problems with it
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayEmployees() {
    this._employeeService.getList().subscribe({
      // if response is satus.ok
      next: (dataResponse) => {
        console.log(dataResponse)
        this.dataSource.data = dataResponse;
        //this.dataSource.data = [dataResponse];
      }, error: (e) => { }
    })
  }

  dialogNewEmployee() {
    this.dialog.open(DialogAddEditComponent, {
      disableClose: true,
      width: "350px"
    }).afterClosed().subscribe(result => {
      if (result === "Done")
        this.displayEmployees();
    });
  }

  dialogEditEmployee(dataEmployee: Employee) {
    this.dialog.open(DialogAddEditComponent, {
      disableClose: true,
      width: "350px",
      data: dataEmployee
    }).afterClosed().subscribe(result => {
      if (result === "Updated")
        this.displayEmployees();
    });
  }

  displayAlert(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  dialogDeleteEmployee(dataEmployee: Employee) {
    this.dialog.open(DialogDeleteComponent, {
      disableClose: true,
      data: dataEmployee
    }).afterClosed().subscribe(result => {
      if (result === "Delete")
        this._employeeService.delete(dataEmployee.idEmployee).subscribe({
          next: (data => {
            this.displayAlert("Employee was deleted", "Done");
            this.displayEmployees();
          }),
          error: (e) => {
            console.log(e)
          }
        })
    });
  }

}