import { Component, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { Phone } from '../phone';
import { PhoneService } from '../phone.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [PhoneService]
})
export class CatalogComponent implements OnInit {

  phones: Phone[];
  availablePhones: Phone[];
  phoneImagePath = '../../assets/phones/';

  pageContent = {
    header : {
      title : 'Our Catalog',
      subtitle : 'Your next mobile device is here.'
    }
  }

  constructor(private phoneService: PhoneService, private router: Router) { }

  ngOnInit(): void {
    this.phoneService
      .getPhones()
      .then((phones: Phone[]) => {
        this.availablePhones = phones.filter(phone => phone.available);
        this.availablePhones.forEach(phone =>{
          if (phone.image) {
            phone.image = this.phoneImagePath + phone.image;
          } else {
            phone.image = this.phoneImagePath + 'no-image.png';
          }
        })
      });
  }

  public phoneClick(phone: Phone) {
    this.router.navigateByUrl('/phone/' + phone._id);
  }

}
