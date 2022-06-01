import {Appointment} from "./appointment";

export class AppointmentFactory {
  static empty(): Appointment {
    return new Appointment(0, new Date(), new Date(), new Date(), 0,0, null);
  }
  static fromObject(rawAppointment: any): Appointment {
    return new Appointment(
      rawAppointment.id,
      rawAppointment.date,
      rawAppointment.from,
      rawAppointment.to,
      rawAppointment.offer_id,
      rawAppointment.user_id,
      rawAppointment.offer
    );
  }
}
