import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Phone } from '../phone';
import { PhoneService } from '../phone.service';

@Component({
  selector: 'app-admin-catalog',
  templateUrl: './admin-catalog.component.html',
  styleUrls: ['./admin-catalog.component.css'],
  providers: [PhoneService]
})
export class AdminCatalogComponent implements OnInit {

  phones: Phone[];

  pageContent = {
    header : {
      title : 'Admin Catalog',
      subtitle : ''
    }
  }


  constructor(private phoneService: PhoneService, private router: Router) { }

  ngOnInit(): void {
    this.phoneService
      .getPhones()
      .then((phones: Phone[]) => {
        this.phones = phones.map(phone => {
          return phone;
        })
      });
  }

  public deletePhone(phoneId: string) {
    this.phoneService
      .deletePhone(phoneId)
      .then(() => {
        const currentRoute = this.router.url;
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([currentRoute]);
          });
      });
  }
}
