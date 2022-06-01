import {Component, Input, OnInit} from '@angular/core';
import {Appointment, Offer} from "../shared/offer";
import {AuthenticationService} from "../shared/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../shared/user.service";
import {TutoringService} from "../shared/tutoring.service";
import {AppointmentFactory} from "../shared/appointment-factory";
import {User} from "../shared/user";
import {UserFactory} from "../shared/user-factory";
import {TutoringFactory} from "../shared/tutoring-factory";

@Component({
  selector: 'div.bs-appointment',
  templateUrl: './appointment.component.html',
  styles: [
  ]
})
export class AppointmentComponent implements OnInit {
  @Input()  appointment: Appointment = AppointmentFactory.empty();
  @Input()  offer: Offer = TutoringFactory.empty();
  user: User = UserFactory.empty();

  constructor(private authService: AuthenticationService,
              private ts: TutoringService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private us: UserService) { }

  ngOnInit(): void {
    //get the user logged-in
    this.us.getSingle(this.authService.getCurrentUserId().toString()).subscribe(u => this.user = u);
  }

  //check if user is logged in
  isLoggedIn() {
    return this.authService.isLoggedIn();

  }

  //book a certain appointment
  bookAppointment(appointment: Appointment) {
    appointment.user_id = this.user.id;
    if(confirm('Möchtest du den Termin wirklich buchen?')) {
      this.ts.bookAppointment(appointment).subscribe(res => {
        this.toastr.success("Du hast den Termin erfolgreich gebucht");
        this.router.navigate(['/personalspace'] );
      });
    }
  }

  //remove message
  removeAppointment() {
    //confirmation needed before offer is deleted
    if (confirm('Möchtest du den Termin wirklich löschen?')) {
      if (this.appointment) {
        this.ts.removeAppointment(this.appointment.id.toString())
          .subscribe(res => {
            this.appointment = AppointmentFactory.empty();
            this.toastr.success("Der Termin  wurde erfolgreich gelöscht"),
              this.router.navigate(['../'], {
                relativeTo:
                this.route
              });
          });
      }
    }
  }

}
