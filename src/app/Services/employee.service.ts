import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Employee } from '../Interfaces/employee';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class EmployeeService{
    // create the api's configuration variables
    private endpoint:string = environment.endPoint;
    
    // concat the endpoint with the api's name 
    private apiUrl:string = this.endpoint + "employee/" 

    constructor(private http: HttpClient){}

    // function to return the employee list
    getList():Observable<Employee>{
        return this.http.get<Employee>(`${this.apiUrl}list`);
    }

    add(model:Employee):Observable<Employee>{
        return this.http.post<Employee>(`${this.apiUrl}save`, model);
    }

    update(idEmployee:number, model:Employee):Observable<Employee>{
        return this.http.put<Employee>(`${this.apiUrl}update/${idEmployee}`, model);
    }

    delete(idEmployee:number):Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}delete/${idEmployee}`);
    }
}