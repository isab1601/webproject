import {ActivatedRoute, Router} from "@angular/router";
import {Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from "@angular/forms";
import {TutoringFactory} from "../shared/tutoring-factory";
import {TutoringService} from "../shared/tutoring.service";
import {Offer, Subject} from "../shared/offer";
import {TutoringFormErrorMessages} from "./tutoring-form-error-messages";
import {formatDate} from "@angular/common";
import {SubjectService} from "../shared/subject.service";
import {AuthenticationService} from "../shared/authentication.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'bs-tutoring-form',
  templateUrl: './tutoring-form.component.html',
  styles: []
})
export class TutoringFormComponent implements OnInit {

  tutoringForm: FormGroup;
  offer = TutoringFactory.empty();
  subjects: Subject[] = [];

  errors: { [key: string]: string } = {};
  //indicator if we create or update an offer, standard= new Offer
  isUpdatingOffer = false;
  //more than one Appointment possible
  appointments: FormArray;

  constructor(
    private fb: FormBuilder,
    private ts: TutoringService,
    private ss: SubjectService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.tutoringForm = this.fb.group({});
    this.appointments = this.fb.array([]);
  }

  ngOnInit(): void {
    //get subjects for selection
    this.ss.getAll().subscribe(res => this.subjects = res);

    //prove if there is an id
    const id = this.route.snapshot.params["id"];
    //when id exists, than update offer
    if (id) {
      this.isUpdatingOffer = true;
      this.ts.getSingle(id).subscribe(offer => {
        this.offer = offer;
        this.initOffer();
      });
    }
    //fill form with data from offer with id
    this.initOffer();

  }

  //Fill form with data
  initOffer() {
    //fill Form-Array with dates
    this.buildDatesArray();
    //Fill the whole form with compomnents of the formgroup
    this.tutoringForm = this.fb.group({
      id: this.offer.id,
      title: [this.offer.title, Validators.required],
      description: [this.offer.description, Validators.required],
      appointments: this.appointments,
      subject_id: [this.offer.subject_id, Validators.required]
    });
    //Update error messages if state of form changes
    this.tutoringForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }

  buildDatesArray() {
    if (this.offer.appointments) {
      this.appointments = this.fb.array([]);
      //fill Array with appointments
      for (let d of this.offer.appointments) {
        let fg = this.fb.group({
          id: new FormControl(d.id),
          date: new FormControl(formatDate(new Date(d.date), 'yyyy-MM-dd', 'en'), [Validators.required]),
          from: new FormControl(this.formatDate(d.to), [Validators.required]),
          to: new FormControl(this.formatDate(d.from), [Validators.required]),
        });
        this.appointments.push(fg);
      }
    }
  }

  //add a new Controlfield when user clicks plus-button
  addDatesControl() {
    this.appointments.push(this.fb.group({id: 0, date: null, from: null, to: null}));
  }

  submitForm() {
    //check values of appointments
    this.tutoringForm.value.appointments = this.tutoringForm.value.appointments.filter(
      (appointment: { date: string }) => appointment.date,
      (appointment: { from: string }) => appointment.from,
      (appointment: { to: string }) => appointment.to,
    );

    //create object of type offer
    const offer: Offer = TutoringFactory.fromObject(this.tutoringForm.value);
    //check if updating
    if (this.isUpdatingOffer) {
      //call update method
      this.ts.update(offer).subscribe(res => {
        this.toastr.success("Dein Angebot wurde erfolgreich bearbeitet");
        this.router.navigate(["/personalspace"], {
          relativeTo: this.route
        });
      });
      //when creating a new offer
    } else {
      //get id of user logged in
      offer.user_id = this.authService.getCurrentUserId();
      //call create method
      this.ts.create(offer).subscribe(res => {
        //reset form (not necessary cause of redirect)
        this.offer = TutoringFactory.empty();
        this.tutoringForm.reset(TutoringFactory.empty());
        this.toastr.success("Dein Angebot wurde erfolgreich erstellt");
        //redirect to list
        this.router.navigate(["/personalspace"]);
      });
    }
  }

  //update ErrorMessages when form changes
  updateErrorMessages() {
    console.log("Is invalid? " + this.tutoringForm.invalid);
    //initialize error object when form changes
    this.errors = {};
    for (const message of TutoringFormErrorMessages) {
      //get certain field by name
      const control = this.tutoringForm.get(message.forControl);
      if (
        control &&
        //only show error if tried at least once to fill the field
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  //format the date
  formatDate(date: any) {
    let newDate = date.toString();
    let res = newDate.replace(" ", "T");
    return res;
  }

}
