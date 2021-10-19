import { Injectable } from '@angular/core';
import { Phone } from './phone';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PhoneService {
  private phonesUrl = 'http://localhost:3000/api/phones';

  availablePhones: Phone[];
  phones: Phone[];

  constructor(private http: HttpClient) {}

  getPhones(): Promise<void | Phone[]> {
    return this.http
      .get(this.phonesUrl)
      .toPromise()
      .then((response) => {
        console.log('getPhones -> response', response);
        return response as Phone[];
      })
      .catch(this.handleError);
  }

  getSinglePhone(phoneId: string): Promise<void | Phone> {
    return this.http
      .get(this.phonesUrl + '/' + phoneId)
      .toPromise()
      .then((response) => {
        console.log('getSinglePhone -> response', response);
        return response as Phone;
      })
      .catch(this.handleError);
  }

  createPhone(newPhone: Phone): Promise<void | Phone> {
    return this.http
      .post(this.phonesUrl, newPhone)
      .toPromise()
      .then((response) => response as Phone)
      .catch(this.handleError);
  }

  deletePhone(phoneId: string): Promise<void | Phone>{
    return this.http
      .delete(this.phonesUrl + '/'+ phoneId)
      .toPromise()
      .then((response) => response as Phone)
      .catch(this.handleError);
  }

  updatePhone(phoneId: string, updatePhone: Phone): Promise<void | Phone> {
    return this.http
      .put(this.phonesUrl + '/' + phoneId, updatePhone)
      .toPromise()
      .then((response) => response as Phone)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.log('ERROR!', error);
  }
}
