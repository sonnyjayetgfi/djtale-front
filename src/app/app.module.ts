import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from '../core/angular-material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import {DragDropModule} from '@angular/cdk/drag-drop';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainComponent } from './main/main.component';
import { RoomListComponent } from './room/room-list/room-list.component';
import { RoomComponent } from './room/room/room.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


const socketIoConfig: SocketIoConfig = { url : 'http://172.16.99.7:4444', options: {}};


function tokenGetter() {
  const token = window.localStorage.getItem('jwt');
  return token;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    RoomListComponent,
    RoomComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['172.16.99.7:3333'],
        blacklistedRoutes: [
          '172.16.99.7:3333/auth/',
        ],
      }
    }),
    DragDropModule,
    SocketIoModule.forRoot(socketIoConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
