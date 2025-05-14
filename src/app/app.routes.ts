import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './pages/user/user.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { CertificateComponent } from './certificate/certificate.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forget-password/forgot-password.component';
import { authGuard } from '../service/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { HistoryComponent } from './pages/history/history.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { EnquiryComponent } from './pages/enquiry/enquiry.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent }, // Default route
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'dashboard', component: DashboardComponent, canActivate:[authGuard] },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'history', component: HistoryComponent },
  {path:"enquiry", component:EnquiryComponent},
  { path: 'about', component: AboutComponent },
  { path: 'product/:id', component: ProductsComponent },
  { path: 'certificate', component: CertificateComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'user', component: UserComponent },
  { path: 'resetPassword/:token', component: ResetPasswordComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'privacy_policy', component: PrivacyPolicyComponent },
  { path: 'terms&conditions', component: TermsAndConditionsComponent },

  // Catch-all wildcard route (optional: redirect to home or 404 page)
  { path: '**', component: HomeComponent  }  
];
