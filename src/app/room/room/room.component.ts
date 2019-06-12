import { Component, OnInit } from '@angular/core';
import { RoomService } from './room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscription } from 'rxjs';
import { BrowseService } from 'src/app/old/browse/browse.service';

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
  searchInput : string;
  searchResults : Array<any>;
  formName : string;
  formUrl: string;
  chatMessageInput: string;
  constructor(private browseService: BrowseService, private socket: Socket, private roomService: RoomService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getRoomInfo();
    // this.roomSubscribe = this.roomService.currentRoom.subscribe(room => this.currentRoom = room);
    
  }

  getBackToHome() {
    this.roomService.leaveRoom(this.roomId);
    this.router.navigate(['/']);
  }

  getRoomInfo() {
    this.route.params.subscribe(params => {
      const roomId = params['id'];
      this.roomId = roomId;
      this.roomService.getRoom(roomId);
      this.socket.fromEvent('room-'+roomId).subscribe(room => this.currentRoom = room);
      // this.socket.on('room-'+roomId, (data) => {
      //   console.log(data);
      // })
    });
  }

  postMessage() {
    this.roomService.addMessageToRoomChat(this.roomId, this.chatMessageInput);
  }

  addSongToPlaylist(searchResult) {
    let obj = {
      name : searchResult.snippet.title,
      url : searchResult.url
    }
    this.roomService.addSongToRoomPlaylist(this.roomId, obj);
  }

  searchSong() {
    this.browseService.search(this.searchInput).subscribe(res => {
      res.forEach(item => {
        item.url = "https://www.youtube.com/watch?v="+ item.id.videoId;
      })
      this.searchResults = res;
    })

  }




}
