import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { URL } from './confi';
@Injectable({
  providedIn: 'root',
})
export class DatpickerApiService {
  http = inject(HttpClient)

 async getListSchedule(){
    const response = await firstValueFrom(this.http.get(URL.base + URL.schedule));
    console.log(response);
    return response
  }

  async getListHolidays(){
    const response = await firstValueFrom(this.http.get(URL.base + URL.holiday));
    console.log(response);
    return response
  }

  async getAllData(){
    await this.getListSchedule();
    await this.getListHolidays();
  }

}
