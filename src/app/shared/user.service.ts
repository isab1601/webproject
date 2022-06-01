import {Injectable} from '@angular/core';
import {User} from "./user";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = 'http://tutoring22.s1910456003.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {
  }

  getSingle(id: string): Observable<User> {
    return this.http.get<User>(`${this.api}/users/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //throw error if there is no connection to server
  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
