import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from '../auth/services/auth-services.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private authService : AuthServicesService) { }

  ngOnInit() {
    this.authService.test().subscribe(res => {
      console.log(res);
    })
  }
  

}
