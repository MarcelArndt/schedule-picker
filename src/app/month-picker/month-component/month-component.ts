import { Component, inject } from '@angular/core';
import { DatpickerApiService } from '../../datepicker-api/datpicker-api.service';

interface selectedDate{
    year: number,
    month : number,
    day:number
}

@Component({
  selector: 'app-month-component',
  imports: [],
  templateUrl: './month-component.html',
  styleUrl: './month-component.scss',
})


export class MonthComponent {
  apiService = inject(DatpickerApiService)

  currentYear = 2020;
  currentMonth = 0; // 0 = Januar, 11 = Dezember
  currentDay = 0;
  
  systemMonth = new Date().getMonth();
  systemDay = new Date().getDate();
  selectedDate:selectedDate = {
    year: 0,
    month : 0,
    day:0
  };

  weeks: (Date | null)[][] = [];
  monthTitles = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"]

 async ngOnInit() {
    this.getCurrentDate();
    this.generateCalendar(this.currentYear, this.currentMonth);
    await this.apiService.getAllData()
  }

  calculatePreviousMonth(){
    this.currentYear = this.currentMonth - 1 < 0? this.currentYear - 1 : this.currentYear
    this.currentMonth = this.currentMonth - 1 < 0? 11 : this.currentMonth - 1;
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  calculateNextMonth(){
    this.currentYear = this.currentMonth + 1 > 11? this.currentYear + 1 : this.currentYear
    this.currentMonth = this.currentMonth + 1 > 11? 0 : this.currentMonth + 1;
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  getCurrentDate(){
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth();
    this.currentDay = new Date().getDate();
  }

  toggleDate(day:number){
    this.selectedDate.month = this.currentMonth;
    this.selectedDate.year = this.currentYear;
    this.selectedDate.day = day;
    console.log(this.selectedDate);
  }

  get year(){
    return this.currentYear
  }

  get month():number{
    return this.systemMonth 
  }

  get currentYearIsPast(){
    return this.currentYear > new Date().getFullYear()
  }

  get currentMonthIsPast():boolean{
    if(this.currentYearIsPast){
      return false;
    }
    if (this.currentMonth > new Date().getMonth()){
      return false;
    }
    return true;
  }

  get currentMonthTitle(){
    return this.monthTitles[this.currentMonth]
  }

  currentDayIsPast(day: Date): boolean {
    const checkCurrentYear:boolean = this.currentYear == new Date().getFullYear();
    const checkCurrentMonth:boolean = this.currentMonth == new Date().getMonth();
    const checkCurrentDay :boolean = day.getDate() >= new Date().getDate()

    if(this.currentYearIsPast){
      return false
    }

    if(this.currentMonth > new Date().getMonth() && this.currentYear >= new Date().getFullYear()){
      return false
    }

    if(checkCurrentYear && checkCurrentMonth && checkCurrentDay){
      return false
    }

    return true
  }

  generateCalendar(year: number, month: number) {
    this.weeks = [];

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let currentWeek: (Date | null)[] = [];

    // Montag als Wochenstart (0 = Montag)
    // Beispiel Sonntag -> (0 + 6) % 7 = Rest 6 -> Sonntag kommt an die 7. Stelle
    // Beispiel Montag-> (1 + 6) % 7 = Rest 0 -> Montag kommt an die 1. Stelle
    let startDay = (firstDay.getDay() + 6) % 7;

    // Leere Felder vor dem 1. Tag
    // Beispiel firstDay.getDay() ist Dienstag also gleich 2 da von Sonntag (0) gestartet wird
    // setzt für Sonntag bis Dienstag ein null im Array
    for (let i = 0; i < startDay; i++) {
      currentWeek.push(null);
    }

    //Fügt die Tage des Monats in sperate Wochen
    //Wenn alle 7 Tage gefüllt sind, wird diese this.weeks gepuscht.
    for (let day = 1; day <= lastDay.getDate(); day++) {
      currentWeek.push(new Date(year, month, day));

      if (currentWeek.length === 7) {
        this.weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // ist die Letzte Woche nicht vollständig, wird diese mit null ausgefüllt.
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      this.weeks.push(currentWeek);
    }
  }
}

