import { Component, OnInit } from '@angular/core';
import {Subject} from "../shared/subject";
import {SubjectService} from "../shared/subject.service";
import {AuthenticationService} from "../shared/authentication.service";
import {User} from "../shared/user";
import {UserFactory} from "../shared/user-factory";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'bs-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  user: User = UserFactory.empty();

  subjects: Subject[] = [];

  constructor(private authService : AuthenticationService,  private us: UserService, private ss: SubjectService) { }

  ngOnInit(): void {
    //get user to welcome her/him
    this.us.getSingle(this.authService.getCurrentUserId().toString()).subscribe(u => this.user = u);
  }

  //check if user is logged in to adapt welcome-text in template
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
