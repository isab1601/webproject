import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Subject} from "../shared/subject";
import {TutoringService} from "../shared/tutoring.service";
import {SubjectService} from "../shared/subject.service";
import {UserService} from "../shared/user.service";
import {ActivatedRoute} from "@angular/router";
import {SubjectFactory} from "../shared/subject-factory";


@Component({
  selector: 'bs-tutoring-list',
  templateUrl: './tutoring-list.component.html',
  styles: [
  ]
})
export class TutoringListComponent implements OnInit {

  subject: Subject = SubjectFactory.empty();

  constructor(private ts: TutoringService,
              private ss: SubjectService,
              private us: UserService,
              private route: ActivatedRoute)
  { }

  ngOnInit() {
    //Get a certain subject with all offers
    const params = this.route.snapshot.params;
    this.ss.getSingle(params['subid']).subscribe(res => this.subject = res);

  }

}
