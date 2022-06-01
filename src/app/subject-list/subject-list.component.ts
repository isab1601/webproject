import { Component, OnInit } from '@angular/core';
import {Subject} from "../shared/subject";
import {SubjectService} from "../shared/subject.service";

@Component({
  selector: 'bs-subject-list',
  templateUrl: './subject-list.component.html',
  styles: [
  ]
})
export class SubjectListComponent implements OnInit {
  subjects: Subject[] = [];

  constructor(private ss: SubjectService) { }

  ngOnInit(): void {
    //get all subjects to create list of subjects
    this.ss.getAll().subscribe(res => this.subjects = res);

  }

}
