import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }


  formatDate(date: Date) {
    const intermidiateDate = new Date(date);
    return intermidiateDate.toLocaleDateString(undefined, {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  }

  formatDateDash(date: Date) {
    const days = new Date(date).getDay();
    const month = new Date(date).getMonth();
    const year = new Date(date).getFullYear();

    let daysString = days < 10 ? `0${days}` : days.toString();
    let monthString = month < 10 ? `0${month}` : month.toString();

    console.log(days, month, year);
    return `${year.toString()}-${monthString.toString()}-${daysString.toString()}`
  }
}
