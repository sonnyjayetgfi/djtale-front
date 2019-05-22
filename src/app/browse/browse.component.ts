import { Component, OnInit } from '@angular/core';
import { BrowseService} from './browse.service';
@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  searchInput: string = '';
  results: Array<string> = [];
  constructor(private browseService: BrowseService) { }

  ngOnInit() {
    this.searchInput = "type"
  }

  search() {
    console.log(this.searchInput);
    this.browseService.search(this.searchInput).subscribe(res => {
      // console.log(res);
      res.forEach(item => {
        item.url = "https://www.youtube.com/watch?v="+ item.id.videoId;
        console.log(item.url)
      })
      this.results = res;
    })

  }

}
