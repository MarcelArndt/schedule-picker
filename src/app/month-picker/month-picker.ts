import { Component } from '@angular/core';
import { MonthComponent } from './month-component/month-component';

@Component({
  selector: 'app-month-picker',
  imports: [MonthComponent],
  templateUrl: './month-picker.html',
  styleUrl: './month-picker.scss',
})
export class MonthPicker {

}
