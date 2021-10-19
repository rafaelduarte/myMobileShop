import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PhoneService } from '../phone.service';
import { switchMap } from "rxjs/operators";
import { Phone } from '../phone';

@Component({
  selector: 'app-edit-phone',
  templateUrl: './edit-phone.component.html',
  styleUrls: ['./edit-phone.component.css'],
  providers: [PhoneService]
})
export class EditPhoneComponent implements OnInit {

  phone: Phone;

  // phoneImagePath = '../../assets/phones/';

  pageContent = {
    header: {
      title: 'Edit Phone',
      subtitle: '',
    },
  };

  constructor(
    private phoneService: PhoneService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap((params: Params) => {
        return this.phoneService.getSinglePhone(params.phoneid);
      }))
      .subscribe((phone: any) => {
        this.phone = phone;
        this.phone.cpu = phone.specs.cpu;
        this.phone.ramSize = phone.specs.ramSize;
        this.phone.storage = phone.specs.storage;
        // if (!phone.image) {
        //   this.phone.image = this.phoneImagePath + 'no-image.png';
        // } else {
        //   this.phone.image = this.phoneImagePath + phone.image;
        // }
      });
  }

  public editPhone(phone: Phone): void {
    phone.description = phone.description ? phone.description : '';
    phone.ramSize = phone.ramSize ? phone.ramSize : '';
    phone.rating = phone.rating ? phone.rating : 0;
    phone.image = phone.image ? phone.image : '';

    this.phoneService
      .updatePhone(phone._id, phone)
      .then(() => {
        this.router
          .navigateByUrl('/admin-catalog');
      });
  }
}
