import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BackEndResponse } from 'src/core/backEndResponse';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient, private socket: Socket) { }
  // currentRoom = this.socket.fromEvent('room');

  public getRoomById(id): Observable<BackEndResponse> {
    return this.http
      .get<BackEndResponse>(`${environment.backEndUrl}/${environment.room.getById}?roomId=${id}`)
      .pipe(map(res => {
        return res;
      }), catchError((e): Observable<BackEndResponse> => {
        const res: BackEndResponse = e.error;
        return of(res);
      }));
  }

  public addSongToRoomPlaylist(roomId, song): Observable<BackEndResponse> {
    return this.http.post<BackEndResponse>(`${environment.backEndUrl}/${environment.room.playlist.addSong}`, {
      roomId, ...song
    })
  }

  public getRoom(id) {
    // const user = window.localStorage.getItem('user');
    this.socket.emit('join', { roomId: id });
  }
}

