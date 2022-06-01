import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {TutoringListComponent} from './tutoring-list/tutoring-list.component';
import {TutoringListItemComponent} from './tutoring-list-item/tutoring-list-item.component';
import {TutoringDetailsComponent} from './tutoring-details/tutoring-details.component';
import {TutoringService} from "./shared/tutoring.service";
import {HomeComponent} from './home/home.component';
import {TutoringFormComponent} from './tutoring-form/tutoring-form.component';
import {SubjectListComponent} from './subject-list/subject-list.component';
import {SubjectService} from "./shared/subject.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './login/login.component';
import {AuthenticationService} from "./shared/authentication.service";
import {PersonalSpaceComponent} from './personal-space/personal-space.component';
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {MessageService} from "./shared/message.service";
import localeDE from '@angular/common/locales/de';
import {registerLocaleData} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { MessageComponent } from './message/message.component';
import {LoginInterceptorService} from "./shared/login-interceptor.service";
import {CanNavigateToAdminGuard} from "./can-navigate-to-admin.guard";
import {CanNavigateToPersonalspaceGuard} from "./can-navigate-to-personalspace.guard";
import { AppointmentComponent } from './appointment/appointment.component';

registerLocaleData(localeDE);

@NgModule({
  declarations: [
    AppComponent,
    TutoringListComponent,
    SubjectListComponent,
    TutoringListItemComponent,
    TutoringDetailsComponent,
    HomeComponent,
    TutoringFormComponent,
    LoginComponent,
    PersonalSpaceComponent,
    MessageComponent,
    AppointmentComponent,
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, BrowserAnimationsModule,
    ToastrModule.forRoot()


  ],

  providers: [TutoringService, CanNavigateToAdminGuard,CanNavigateToPersonalspaceGuard, MessageService, AuthenticationService, SubjectService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }, {
    provide:HTTP_INTERCEPTORS,
    useClass: LoginInterceptorService,
    multi:true
  },
    {
    provide: LOCALE_ID,
    useValue: 'de'
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
