import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Area } from '../Interfaces/area';

@Injectable({
    providedIn: 'root'
})

export class AreaService{
    // create the api's configuration variables
    private endpoint:string = environment.endPoint;
    
    // concat the endpoint with the api's name 
    private apiUrl:string = this.endpoint + "area/" 

    constructor(private http: HttpClient){}

    // function to return the area list
    getList():Observable<Area[]>{
        return this.http.get<Area[]>(`${this.apiUrl}list`);
    }

}