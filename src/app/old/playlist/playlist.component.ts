// import { Component, OnInit } from '@angular/core';
// import { PlaylistService } from './playlist.service';
// import { Playlist } from '../core/playlist';
// import  * as moment  from 'moment';
// import { of } from 'rxjs';
// import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

// @Component({
//   selector: 'app-playlist',
//   templateUrl: './playlist.component.html',
//   styleUrls: ['./playlist.component.scss']
// })
// export class PlaylistComponent implements OnInit {
//   playlistList: Array<Playlist>;
//   user : any;
//   selectedPlaylist: Playlist;
//   constructor(private playlistService: PlaylistService) { }

//   ngOnInit() {
//     this.user =  JSON.parse(window.localStorage.getItem('user'));
//     this.playlistService.getMyPlaylists(this.user._id).subscribe(res => {
//       console.log(res);
//       this.playlistList = res.data;
//       this.openPlaylist(this.playlistList[0]);
//     })
//   }

//   addPlaylist() {
//     const name = 'new playlist ' + moment().format('MM-DD HH-MM-SS');
//     this.playlistService.addPlaylist(this.user._id, name).subscribe(res => {
//       console.log(res);
//       this.playlistList.push(res.data)
//     })
//   }

//   drop(event: CdkDragDrop<string[]>) {
//     // moveItemInArray(this.selectedPlaylist.songs, event.previousIndex, event.currentIndex);
//     this.setNewPriority(this.selectedPlaylist.songs[event.previousIndex], event.currentIndex);
//   }

//   openPlaylist(playlist) {
//     this.selectedPlaylist = playlist;
//   }


//   setNewPriority(song, priority) {
//     this.playlistService.updatePriority(this.user._id, this.selectedPlaylist._id, song._id, priority).subscribe(res => {
//       console.log(res)
//       this.playlistList = res.data;
//       this.selectedPlaylist = this.playlistList.filter(a => a._id == song.playlistId)[0];
//       this.selectedPlaylist.songs.sort( this.compare )
//     })
//   }

//   increasePriority(song){
//     if(song.priority === 0) {
//       return;
//     }
//     const currentPriority = song.priority;
//     this.setNewPriority(song, currentPriority -1);
//   }

//   reducePriority(song){
//     if(song.priority === this.selectedPlaylist.songs.length -1) {
//       return;
//     }
//     const currentPriority = song.priority;
//     this.setNewPriority(song, currentPriority +1);
//   }

//   compare(a, b) {
//     return a.priority < b.priority ? -1 : 1;
//   }

// }
