import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import {RestaurantDialog, SearchComponent} from './pages/search/search.component';
import { AccountComponent } from './pages/account/account.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginErrorInterceptor } from './interceptors/LoginErrorInterceptor';
import { JwtInterceptor } from './interceptors/JwtInterceptor';
import { CartComponent } from './pages/cart/cart.component';
import { CartItemComponent } from './pages/cart/cart-item/cart-item.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { RestaurantItemComponent } from './pages/restaurant/restaurant-item/restaurant-item.component';
import { ShopComponent } from './pages/shop/shop.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderComponent } from './pending-orders/order/order.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { LoginFormComponent } from './pages/login/login-form/login-form.component';
import { RegisterFormComponent } from './pages/login/register-form/register-form.component';
import { UserDetailsComponent } from './pages/account/user-details/user-details.component';
import { UserEmailComponent } from './pages/account/user-email/user-email.component';
import { UserOrdersComponent } from './pages/account/user-orders/user-orders.component';
import { UserSettingsComponent } from './pages/account/user-settings/user-settings.component';
import { DeleteAccountDialogComponent } from './pages/account/delete-account-dialog/delete-account-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SearchComponent,
    RestaurantDialog,
    AccountComponent,
    CartComponent,
    CartItemComponent,
    RestaurantComponent,
    RestaurantItemComponent,
    ShopComponent,
    OrderComponent,
    PendingOrdersComponent,
    LoginFormComponent,
    RegisterFormComponent,
    UserDetailsComponent,
    UserEmailComponent,
    UserOrdersComponent,
    UserSettingsComponent,
    DeleteAccountDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    NgbModule,
    NoopAnimationsModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
