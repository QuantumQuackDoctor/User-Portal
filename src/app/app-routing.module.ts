import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { SearchComponent } from './pages/search/search.component'
import { CartComponent } from "./pages/cart/cart.component";
import {RestaurantComponent} from "./pages/restaurant/restaurant.component";
import {ShopComponent} from "./pages/shop/shop.component";
import {PendingOrdersComponent} from "./pending-orders/pending-orders.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchComponent },
  { path: 'account', component: AccountComponent },
  { path:'cart', component: CartComponent },
  { path:'restaurant', component: RestaurantComponent },
  { path:'shop', component: ShopComponent },
  { path:'pending', component: PendingOrdersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
