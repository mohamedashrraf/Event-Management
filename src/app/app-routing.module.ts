import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventHomeComponent } from './event/event-home/event-home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { LandingComponent } from './event/landing/landing.component';
import { ProfileComponent } from './event/profile/profile.component';
import { PlacesComponent } from './event/places/places.component';
import { AboutsComponent } from './event/abouts/abouts.component';
import { EventDetailsComponent } from './event/event-details/event-details.component';
import { HostsComponent } from './event/hosts/hosts.component';
import { HostDetailsComponent } from './event/host-details/host-details.component';
import { SubscriptionComponent } from './event/subscription/subscription.component';
import { ShatingComponent } from './shating/shating/shating.component';
import { ShatingLayoutComponent } from './shating/shating-layout/shating-layout.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: EventHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: AboutsComponent },
      { path: 'hosts', component: HostsComponent },
      { path: 'hosts/:hostId', component: HostDetailsComponent },
      { path: 'places', component: PlacesComponent },
    ],
  },
  {
    path: 'event/:id',
    component: EventDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'subscribe',
    component: SubscriptionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chat',
    component: ShatingLayoutComponent,
    canActivate: [AuthGuard],
    children: [{ path: ':id', component: ShatingComponent }],
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
