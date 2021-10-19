import { Component, OnInit } from '@angular/core';
import { Phone } from '../phone';
import { PhoneService } from '../phone.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: 'app-phone-details',
  templateUrl: './phone-details.component.html',
  styleUrls: ['./phone-details.component.css'],
  providers: [PhoneService]
})
export class PhoneDetailsComponent implements OnInit {

  constructor(
    private phoneService: PhoneService,
    private route: ActivatedRoute,
    public auth: AuthService
  ) { }

  phone: Phone;

  phoneImagePath = '../../assets/phones/';

  pageContent = {
    header: {
      title: '',
      subtitle:''
    },
  };

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params: Params) => {
        return this.phoneService.getSinglePhone(params.phoneid);
      }))
      .subscribe((phone: any) => {
        this.phone = phone;
        this.phone.cpu = phone.specs.cpu;
        this.phone.ramSize = phone.specs.ramSize;
        this.phone.storage = phone.specs.storage;
        this.pageContent.header.title = phone.brand + " " + phone.name;
        if (!phone.image) {
          this.phone.image = this.phoneImagePath + 'no-image.png';
        } else {
          this.phone.image = this.phoneImagePath + phone.image;
        }
      });
  }

}
