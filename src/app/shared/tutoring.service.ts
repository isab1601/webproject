import {Injectable} from '@angular/core';
import {Appointment, Offer} from "./offer";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from 'rxjs/operators';
import {Message} from "./message";


@Injectable()

export class TutoringService {

  private api = 'http://tutoring22.s1910456003.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {
  }

  removeAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.api}/appointments/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  bookAppointment(appointment: Appointment): Observable<any> {
    return this.http.put(`${this.api}/appointments/update/${appointment.id}`, appointment)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllbyUser(userId: string): Observable<Array<Appointment>> {
    return this.http.get<Array<Appointment>>(`${this.api}/appointments/${userId}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getOffersbyUser(userId: string): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(`${this.api}/offers/user/${userId}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }


  getAll(): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(`${this.api}/offers`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingle(id: string): Observable<Offer> {
    return this.http.get<Offer>(`${this.api}/offers/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  create(offer: Offer): Observable<any> {
    return this.http.post(`${this.api}/offers`, offer)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  update(offer: Offer): Observable<any> {
    return this.http.put(`${this.api}/offers/${offer.id}`, offer)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.api}/offers/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //throw error if there is no connection to server
  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

}
