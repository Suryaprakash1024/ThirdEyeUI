
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { position } from './object-home/object-home.component';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  ServiceUrl= 'https://localhost:7008';
  currentPosition =new BehaviorSubject<string>('');
 

  constructor(private http: HttpClient) {
  }
 
    SavePositions(param: position[]): Observable<any> {
    const apiType = 'Master/SavePositions';
    const url = `${this.ServiceUrl}/${apiType}`;
    return this.http.post(url+"?positions="+(JSON.stringify(param)),"")//,{ 'headers': headers })
        .pipe(map(data => {
            return data;    
        }));
    }
    UpdatePositions(param: position): Observable<any> {
        const apiType = 'Master/UpdatePositions';
        const url = `${this.ServiceUrl}/${apiType}`;
        return this.http.post(url+"?positions="+(JSON.stringify(param)),"")//,{ 'headers': headers })
            .pipe(map(data => {
                return data;    
            }));
        }
    GetObjects():Observable<any>{
    const apiType = 'Master/GetObjects';
    const url = `${this.ServiceUrl}/${apiType}`;
    
    return this.http.get(url)
        .pipe(map(data => {
            return data;
        }));
    }
    GetPositions():Observable<any>{
        const apiType = 'Master/GetPositions';
        const url = `${this.ServiceUrl}/${apiType}`;
        
        return this.http.get(url)
            .pipe(map(data => {
                return data;
            }));
    }
    GetPositionsById(Id : string):Observable<any>{
        const apiType = 'Master/GetPositionsById';
        const url = `${this.ServiceUrl}/${apiType}?Id=${Id}`;
        return this.http.get(url)
            .pipe(map(data => {
                return data;
            }));
    }
}
