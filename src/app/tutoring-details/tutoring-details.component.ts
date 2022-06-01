import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Appointment, Offer, Subject} from "../shared/offer";
import {TutoringService} from "../shared/tutoring.service";
import {UserService} from "../shared/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TutoringFactory} from "../shared/tutoring-factory";
import {AuthenticationService} from "../shared/authentication.service";
import {Message} from "../shared/message";
import {MessageFactory} from "../shared/message-factory";
import {MessageService} from "../shared/message.service";
import {User} from "../shared/user";
import {UserFactory} from "../shared/user-factory";
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder, FormGroup, FormArray, Validators, FormControl
} from "@angular/forms";


@Component({
  selector: 'bs-tutoring-details',
  templateUrl: './tutoring-details.component.html',
  styles: []
})
export class TutoringDetailsComponent {
  messageForm: FormGroup;

  offer: Offer = TutoringFactory.empty();
  messages: Message [] = [];
  message = MessageFactory.empty();
  user: User = UserFactory.empty();


  constructor(
    private fb: FormBuilder,
    private ts: TutoringService,
    private us: UserService,
    private ms: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) {

    this.messageForm = this.fb.group({});
  }

  ngOnInit() {
    //get a certain offer for detailview
    const params = this.route.snapshot.params;
    this.ts.getSingle(params['id']).subscribe(o => this.offer = o);

    //get all messages from the offer with the user
    this.ms.getAllbyOffer(params['id']).subscribe(m => this.messages = m);

    //get the user logged-in
    this.us.getSingle(this.authService.getCurrentUserId().toString()).subscribe(u => this.user = u);

    //initialize Message
    this.initMessage();
  }

  //remove offer
  removeOffer() {
    //confirmation needed before offer is deleted
    if (confirm('Möchtest du das Angebot wirklich löschen?')) {
      this.ts.remove(this.offer.id.toString())
        .subscribe(res => this.router.navigate(['../'], {
          relativeTo:
          this.route
        }));
    }
  }

  //check if user is logged in
  isLoggedIn() {
    return this.authService.isLoggedIn();

  }

  //Fill form with data
  initMessage() {
    this.messageForm = this.fb.group({
      id: this.message.id,
      text: [this.message.text,  Validators.required]
    });
  }

  //submit input for message
  submitForm() {
    const message: Message = MessageFactory.fromObject(this.messageForm.value);
    message.user_id = this.user.id;
    message.user = this.user;
    message.offer_id = this.offer.id;
    this.ms.create(message).subscribe(res => {
      this.message = MessageFactory.empty();
      this.toastr.success("Deine Nachricht wurde erfolgreich gesendet");
      this.router.navigate(['../'], {
        relativeTo:
        this.route
      });
    });
  }
}
