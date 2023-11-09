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

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'home',
    component: EventHomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: '', component: AboutsComponent },
      { path: 'hosts', component: HostsComponent },
      { path: 'places', component: PlacesComponent },
    ],
  },
  {
    path: 'profile/host/:id',
    component: HostDetailsComponent,
  },
  { path: 'event/:id', component: EventDetailsComponent },
  {
    path: 'subscription',
    component: SubscriptionComponent,
  },
  {
    path: 'shating/:id',
    component: ShatingComponent,
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
