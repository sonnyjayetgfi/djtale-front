import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainComponent } from './main/main.component';
import { IsLoggedInGuard } from './guards/isLoggedInGuard';
import { IsLoggedOutGuard } from './guards/isLoggedOutGuard';
import { RoomComponent } from './room/room/room.component';


const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [IsLoggedOutGuard]
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    canActivate: [IsLoggedOutGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login',
  },
  {
    path: 'home',
    component: MainComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'room/:id',
    component: RoomComponent,
    canActivate: [IsLoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
