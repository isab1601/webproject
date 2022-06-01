export class ErrorMessage {

  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}
export const TutoringFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Es muss ein Angebotstitel angegeben werden!'),
  new ErrorMessage('description', 'required', 'Fügen Sie eine Beschreibung hinzu!'),
  new ErrorMessage('subject_id', 'required', 'Wählen Sie ein Fach aus!')
];
