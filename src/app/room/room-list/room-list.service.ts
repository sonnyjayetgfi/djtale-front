import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BackEndResponse } from 'src/core/backEndResponse';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomListService {

  constructor(private http: HttpClient) { }
  
  public getAllRooms(): Observable<BackEndResponse> {
    return this.http
      .get<BackEndResponse>(`${environment.backEndUrl}/${environment.room.getAll}`)
      .pipe(map(res => {
        return res;
      }), catchError((e): Observable<BackEndResponse> => {
        const res: BackEndResponse = e.error;
        return of(res);
      }));
  }

  public createRoom(name, description): Observable<BackEndResponse> {
    return this.http
      .post<BackEndResponse>(`${environment.backEndUrl}/${environment.room.create}`, {
        name : name,
        description : description
      })
      .pipe(
        map(res => {
          return res;
        }),
        catchError((e): Observable<BackEndResponse> => {
          const res: BackEndResponse = e.error;
          return of(res);
        })
      );
  }
}
