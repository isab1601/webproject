import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from 'rxjs/operators';
import {Message} from "./message";


@Injectable()
export class MessageService {

  private api = 'http://tutoring22.s1910456003.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {
  }

  getAllbyOffer(offerId: string): Observable<Array<Message>> {
    return this.http.get<Array<Message>>(`${this.api}/messages/${offerId}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }


  create(message: Message): Observable<any> {
    return this.http.post(`${this.api}/messages`, message)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.api}/messages/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //throw error if there is no connection to server
  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

}
