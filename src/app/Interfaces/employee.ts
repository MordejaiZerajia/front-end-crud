export interface Employee {
    // initializing the props
    idEmployee:number,
    completeName:string,
    idArea:number,
    areaName?:string, // allow null
    salary:number,
    hireDate:string
}
