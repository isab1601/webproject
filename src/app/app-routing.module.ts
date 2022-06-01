import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TutoringDetailsComponent} from './tutoring-details/tutoring-details.component';
import {TutoringListComponent} from './tutoring-list/tutoring-list.component';
import {HomeComponent} from './home/home.component';
import {SubjectListComponent} from './subject-list/subject-list.component';
import {TutoringFormComponent} from './tutoring-form/tutoring-form.component';
import {LoginComponent} from "./login/login.component";
import {PersonalSpaceComponent} from "./personal-space/personal-space.component";
import {MessageComponent} from "./message/message.component";
import {CanNavigateToAdminGuard} from "./can-navigate-to-admin.guard";
import {CanNavigateToPersonalspaceGuard} from "./can-navigate-to-personalspace.guard";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'subjects', component: SubjectListComponent},
  {path: 'subjects/:subid', component: TutoringListComponent},
  {path: 'personalspace', component: PersonalSpaceComponent, canActivate:[CanNavigateToPersonalspaceGuard]},
  {path: 'personalspace/:id', component: TutoringDetailsComponent, canActivate:[CanNavigateToPersonalspaceGuard]},
  {path: 'subjects/:subid/:id', component: TutoringDetailsComponent},
  {path: 'admin', component: TutoringFormComponent, canActivate:[CanNavigateToAdminGuard]},
  {path: 'admin/:id', component: TutoringFormComponent,canActivate:[CanNavigateToAdminGuard]},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
