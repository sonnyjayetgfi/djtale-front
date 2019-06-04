import { Component, OnInit } from '@angular/core';
import { RoomService } from './room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  // room: any;
  // roomSocket : any;
  roomId: string;
  currentRoom: any;
  roomSubscribe : Subscription;
  formName : string;
  formUrl: string;
  constructor(private socket: Socket, private roomService: RoomService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getRoomInfo();
    // this.roomSubscribe = this.roomService.currentRoom.subscribe(room => this.currentRoom = room);
    
  }

  getBackToHome() {
    this.router.navigate(['/']);
  }

  getRoomInfo() {
    this.route.params.subscribe(params => {
      const roomId = params['id'];
      this.roomService.getRoom(roomId);
      this.socket.fromEvent('room-'+roomId).subscribe(room => this.currentRoom = room);
      this.socket.on('room-'+roomId, (data) => {
        console.log(data);
      })
    });
  }

  addSong() {
    let obj = {
      name : this.formName,
      url : this.formUrl
    }
    this.roomService.addSongToRoomPlaylist(this.roomId, obj).subscribe(res => console.log(res));
  }

  // getRoomById(id) {
  //   this.roomService.getRoomById(id).subscribe(res => {
  //     if (res.statusCode === 200) {
  //       this.room = res.data;
  //     } else {
  //       console.log('request error', res)
  //     }
  //   });
  // }

}
