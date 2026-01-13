import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePicker } from './date-picker/date-picker';
import { MonthPicker } from './month-picker/month-picker';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MonthPicker, DatePicker],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Shedule');
}
