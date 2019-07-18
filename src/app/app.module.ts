import { AdminAuthGaurd } from './services/admin-auth-gaurd.service';
import { AuthGaurd } from './services/auth-gaurd.service';
import { fakeBackendProvider } from './helpers/fake-backend';
import { OrderService } from './services/order.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NoAccessComponent } from './no-access/no-access.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    HomeComponent,
    NotFoundComponent,
    NoAccessComponent,
  ],
  imports: [
    
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGaurd, AdminAuthGaurd]},
      { path: 'login', component: LoginComponent },
      { path: 'no-access', component: NoAccessComponent }
    ])
  ],
  providers: [
    OrderService,

    AuthService,

    AuthGaurd,

    AdminAuthGaurd,

    // For creating a mock back-end. You don't need these in a real app. \
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }