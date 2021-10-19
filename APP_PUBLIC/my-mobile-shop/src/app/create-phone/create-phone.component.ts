import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Phone } from '../phone';
import { PhoneService } from '../phone.service';

@Component({
  selector: 'app-create-phone',
  templateUrl: './create-phone.component.html',
  styleUrls: ['./create-phone.component.css'],
  providers: [PhoneService],
})
export class CreatePhoneComponent implements OnInit {

  pageContent = {
    header: {
      title: 'New Phone',
    },
  };

  public newPhone: Phone = {
    _id: '',
    name: '',
    brand: '',
    price: null,
    description: '',
    cpu: '',
    ramSize: '',
    storage: '',
    rating: null,
    available: true,
    image: '',
  };

  constructor(private phoneService: PhoneService, private router: Router) {}

  ngOnInit(): void {}

  /**
   * createNewPhone
   */
  public createNewPhone(newPhone: Phone): void {
    newPhone.description = newPhone.description ? newPhone.description : '';
    newPhone.ramSize = newPhone.ramSize ? newPhone.ramSize : '';
    newPhone.rating = newPhone.rating ? newPhone.rating : 0;
    newPhone.image = newPhone.image ? newPhone.image : '';

    this.phoneService
      .createPhone(newPhone)
      .then(() => {
        this.router
          .navigateByUrl('/admin-catalog');
      });
  }

  public clearForm() {
    this.newPhone = {
      _id: '',
      name: '',
      brand: '',
      price: null,
      description: '',
      cpu: '',
      ramSize: '',
      storage: '',
      rating: null,
      available: true,
      image: '',
    };
  }
}
