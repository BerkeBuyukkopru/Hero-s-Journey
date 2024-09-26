import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnemyService {
  
  private path ='http://localhost:5000/api/enemy/'; // Backend API URL'si

  constructor(private httpClient:HttpClient) { }

  GetRandomEnemyByLevel(level:number): Observable<any>{
    
    return this.httpClient.get(`${this.path}GetRandomEnemyByLevel?level=${level}`,{ responseType: 'text'}).pipe(map((response: any)=>{
      
      return JSON.parse(response);
    }));
  }
}