import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
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
import { LoginFormComponent } from './pages/login/login-form/login-form.component';
import { RegisterFormComponent } from './pages/login/register-form/register-form.component';
import { UserDetailsComponent } from './pages/account/user-details/user-details.component';
import { UserSettingsComponent } from './pages/account/user-settings/user-settings.component';
import { DeleteAccountDialogComponent } from './pages/account/delete-account-dialog/delete-account-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OrdersComponent } from './pages/account/orders/orders.component';
import { OrderComponent } from './pages/account/orders/order/order.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SearchComponent,
    AccountComponent,
    CartComponent,
    CartItemComponent,
    RestaurantComponent,
    RestaurantItemComponent,
    ShopComponent,
    LoginFormComponent,
    RegisterFormComponent,
    UserDetailsComponent,
    UserSettingsComponent,
    DeleteAccountDialogComponent,
    OrderComponent,
    OrdersComponent,
    ActivateAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NoopAnimationsModule,
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
