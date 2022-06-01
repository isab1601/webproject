import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../shared/message";
import {Subject} from "../shared/subject";
import {SubjectFactory} from "../shared/subject-factory";
import {MessageFactory} from "../shared/message-factory";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "../shared/message.service";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../shared/user.service";
import {User} from "../shared/user";
import {UserFactory} from "../shared/user-factory";
import {AuthenticationService} from "../shared/authentication.service";
import {Offer} from "../shared/offer";

@Component({
  selector: 'div.bs-message',
  templateUrl: './message.component.html',
  styles: []
})
export class MessageComponent implements OnInit {
  @Input() message: Message | undefined
  @Input() offer: Offer| undefined
  user: User = UserFactory.empty();
  currentuser: User = UserFactory.empty();


  constructor(private authService: AuthenticationService,
              private ms: MessageService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private us: UserService) {
  }

  ngOnInit(): void {
    //get the user of message
    if (this.message?.user_id){
      this.us.getSingle(this.message?.user_id.toString()).subscribe(u => this.user = u)
    }

    this.us.getSingle(this.authService.getCurrentUserId().toString()).subscribe(u => this.currentuser = u);

  }

  //remove message
  removeMessage() {
    //confirmation needed before offer is deleted
    if (confirm('Möchtest du die Nachricht wirklich löschen?')) {
      if (this.message) {
        this.ms.remove(this.message.id.toString())
          .subscribe(res => {
            this.message = MessageFactory.empty();
            this.toastr.success("Die Nachricht wurde erfolgreich gelöscht"),
            this.router.navigate(['../'], {
              relativeTo:
              this.route
            });
          });
      }
    }
  }

}
