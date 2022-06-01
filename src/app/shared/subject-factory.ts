import {Subject} from './subject';

export class SubjectFactory {
  static empty(): Subject {
    return new Subject(0, '', '');
  }

  static fromObject(rawSubject: any): Subject {
    return new Subject(
      rawSubject.id,
      rawSubject.title,
      rawSubject.description,
    );
  }
}
