import {Injectable} from '@angular/core';
import {Subject} from "./subject";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from 'rxjs/operators';


@Injectable()
export class SubjectService {
  private api = 'http://tutoring22.s1910456003.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<Subject>> {
    return this.http.get<Array<Subject>>(`${this.api}/subjects`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingle(id: string): Observable<Subject> {
    return this.http.get<Subject>(`${this.api}/subjects/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //throw error if there is no connection to server
  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

}

