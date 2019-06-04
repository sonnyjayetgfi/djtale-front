import { Component, OnInit } from '@angular/core';
import { RoomListService } from './room-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  createRoomName: string;
  createRoomDescription: string;
  
  constructor(private roomListService: RoomListService, private router: Router) { }
  roomList : Array<any>;
  displayedColumns: string[] = ['name', 'description', 'creatorName', 'action'];
  ngOnInit() {
    this.getAllRooms();
  }

  createRoom() {
    this.roomListService.createRoom(this.createRoomName, this.createRoomDescription).subscribe(res => {
      console.log(res);
      this.getAllRooms();
    })
  }

  getAllRooms() {
    this.roomListService.getAllRooms().subscribe(res => {
      this.roomList = res.data;
    })
  }

  joinRoom(room) {
    this.router.navigate(['room/'+room._id]);
  }

}
