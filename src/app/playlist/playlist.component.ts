import { Component, OnInit } from '@angular/core';
import { PlaylistService } from './playlist.service';
import { Playlist } from '../core/playlist';
import  * as moment  from 'moment';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  playlistList: Array<Playlist>;
  user : any;
  selectedPlaylist: Playlist;
  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    this.user =  JSON.parse(window.localStorage.getItem('user'));
    this.playlistService.getMyPlaylists(this.user._id).subscribe(res => {
      console.log(res);
      this.playlistList = res.data;
      this.openPlaylist(this.playlistList[0]);
    })
  }

  addPlaylist() {
    const name = 'new playlist ' + moment().format('MM-DD HH-MM-SS');
    this.playlistService.addPlaylist(this.user._id, name).subscribe(res => {
      console.log(res);
      this.playlistList.push(res.data)
    })
  }

  openPlaylist(playlist) {
    this.selectedPlaylist = playlist;
  }

}
