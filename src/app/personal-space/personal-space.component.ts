import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../shared/authentication.service";
import {Router} from "@angular/router";
import {UserService} from "../shared/user.service";
import {TutoringService} from "../shared/tutoring.service";
import {UserFactory} from "../shared/user-factory";
import {User} from "../shared/user";
import {Appointment} from "../shared/appointment";
import {Offer} from "../shared/offer";
import {TutoringFactory} from "../shared/tutoring-factory";
import {MessageService} from "../shared/message.service";
import {Message} from "../shared/message";

@Component({
  selector: 'bs-personal-space',
  templateUrl: './personal-space.component.html',
  styles: []
})
export class PersonalSpaceComponent {
  user: User = UserFactory.empty();
  appointments : Appointment[] = [];
  messages : Message[] = [];
  offers : Offer[] = [];


  constructor(private authService: AuthenticationService,
              private router: Router,
              private us: UserService,
              private ts: TutoringService,
              private ms: MessageService) {
  }

  ngOnInit(): void {

    //get the current user with his/her offers
    this.us.getSingle(this.authService.getCurrentUserId().toString()).subscribe(u => this.user = u);

    //get all booked Appointments of User
    this.ts.getAllbyUser(this.authService.getCurrentUserId().toString()).subscribe(a => this.appointments = a);

    this.ts.getOffersbyUser(this.authService.getCurrentUserId().toString()).subscribe(res => this.offers = res);

  }

  //check if a appointment is in the future
  isPending(date: any){
    let d = new Date (date).getTime()
    return d >= new Date().getTime();
    console.log(d)
  }
}
