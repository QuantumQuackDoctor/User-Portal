import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from "./pages/orders/orders.component";
import { AccountComponent } from './pages/account/account.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { CartComponent } from './pages/cart/cart.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { ShopComponent } from './pages/shop/shop.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { LoginFormComponent } from './pages/login/login-form/login-form.component';
import { RegisterFormComponent } from './pages/login/register-form/register-form.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'account',
    component: LoginComponent,
    children: [
      {
        path: 'login',
        component: LoginFormComponent,
      },
      {
        path: 'register',
        component: RegisterFormComponent,
      },
    ],
  },
  { path: 'search', component: SearchComponent },
  { path: 'account', component: AccountComponent },
  { path: 'cart', component: CartComponent },
  { path: 'restaurant', component: RestaurantComponent },
  { path: 'shop/:id', component: ShopComponent },
  { path: 'vieworders', component: OrdersComponent },
  { path: 'my-account', component: AccountComponent },
  { path: 'activate/:token', component: ActivateAccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
