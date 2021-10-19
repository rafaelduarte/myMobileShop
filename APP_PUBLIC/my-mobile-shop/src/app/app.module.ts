import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { APP_BASE_HREF } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthModule, AuthGuard } from "@auth0/auth0-angular";

import { FrameworkComponent } from './framework/framework.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CatalogComponent } from './catalog/catalog.component';
import { PhoneDetailsComponent } from './phone-details/phone-details.component';
import { CreatePhoneComponent } from './create-phone/create-phone.component';
import { EditPhoneComponent } from './edit-phone/edit-phone.component';
import { AboutComponent } from './about/about.component';
import { YesNoPipe } from './yes-no.pipe';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { AdminCatalogComponent } from './admin-catalog/admin-catalog.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    FrameworkComponent,
    HomepageComponent,
    HeaderComponent,
    CatalogComponent,
    PhoneDetailsComponent,
    CreatePhoneComponent,
    EditPhoneComponent,
    AboutComponent,
    YesNoPipe,
    AuthButtonComponent,
    AdminCatalogComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomepageComponent,
      },
      {
        path: 'catalog',
        component: CatalogComponent,
      },
      {
        path: 'admin-catalog',
        component: AdminCatalogComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'phone/:phoneid',
        component: PhoneDetailsComponent,
      },
      {
        path: 'new-phone',
        component: CreatePhoneComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-phone/:phoneid',
        component: EditPhoneComponent,
        canActivate: [AuthGuard],
      },
    ], {scrollPositionRestoration: "enabled"}),
    AuthModule.forRoot({
      domain: 'dev-oqq024iv.us.auth0.com',
      clientId: 'PJCjWpXt3Og3A158n2xOyGpme8oNnXiD'
    }),
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
