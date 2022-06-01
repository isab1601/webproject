import {Component, Input, OnInit} from '@angular/core';
import {Offer} from "../shared/offer";
import {User} from "../shared/user";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'a.bs-tutoring-list-item',
  templateUrl: './tutoring-list-item.component.html',
  styles: []
})
export class TutoringListItemComponent implements OnInit {
  //read data from parentcomponant
  @Input() offer: Offer | undefined
  @Input()  user: User | undefined
  constructor(private us: UserService) { }

  ngOnInit(): void {

  }

}
