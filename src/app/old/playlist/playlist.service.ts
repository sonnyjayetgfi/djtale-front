import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BackEndResponse } from 'src/app/core/backEndResponse';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor(private http: HttpClient) { }

  public getMyPlaylists(userId): Observable<BackEndResponse> {
    return this.http
      .get<BackEndResponse>(`${environment.backEndUrl}/${environment.playlist.getByUser}?userId=${userId}`)
      .pipe(
        map(res => {
          const base1 = 'http://i1.ytimg.com/vi/';
          const base2 = '/default.jpg';
          res.data.forEach((playlist) => {
            playlist.songs.forEach((song) => {
              let songUrlPiece = song.url.split('watch?v=')[1];
              song.imgUrl = base1 + songUrlPiece + base2;
            })
          })
          return res;
        }),
        catchError((e): Observable<BackEndResponse> => {
          console.log(e);
          const res: BackEndResponse = { statusCode: 222, codeMessage: 'GetPlaylistsError' };
          return of(res);
        })
      );
  }

  public addPlaylist(userId, playlistName): Observable<BackEndResponse> {
    return this.http
      .post<BackEndResponse>(`${environment.backEndUrl}/${environment.playlist.add}`, {
        userId: userId,
        playlistName: playlistName
      })
      .pipe(map(res => {
        return res;
      }),
        catchError((e): Observable<BackEndResponse> => {
          const res: BackEndResponse = { statusCode: 222, codeMessage: 'CreatePlaylistError' };
          return of(res);
        }));
  }

  public updatePriority(userId, playlistId,songId, newPriority ): Observable<BackEndResponse> {
    return this.http
      .post<BackEndResponse>(`${environment.backEndUrl}/${environment.playlist.songs.updatePriority}`, {
        userId: userId,
        playlistId: playlistId,
        songId: songId,
        newPriority: newPriority
      })
      .pipe(map(res => {
        const base1 = 'http://i1.ytimg.com/vi/';
        const base2 = '/default.jpg';
        res.data.forEach((playlist) => {
          playlist.songs.forEach((song) => {
            let songUrlPiece = song.url.split('watch?v=')[1];
            song.imgUrl = base1 + songUrlPiece + base2;
          })
        })
        return res;
      }),
        catchError((e): Observable<BackEndResponse> => {
          const res: BackEndResponse = { statusCode: 222, codeMessage: 'CreatePlaylistError' };
          return of(res);
        }));
  }
}
