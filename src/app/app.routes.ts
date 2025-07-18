import { Routes } from '@angular/router';
import { authGuard } from '../service/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },

  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },

  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) /*, canActivate: [authGuard] */ },

  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'profile', loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent) },
  { path: 'enquiry', loadComponent: () => import('./pages/enquiry/enquiry.component').then(m => m.EnquiryComponent) },

  { path: 'about', loadComponent: () => import('./about/about.component').then(m => m.AboutComponent) },
  { path: 'product/:item', loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent) },
  { path: 'certificate', loadComponent: () => import('./certificate/certificate.component').then(m => m.CertificateComponent) },
  { path: 'blog', loadComponent: () => import('./blog/blog.component').then(m => m.BlogComponent) },
  { path: 'contact', loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent) },

  { path: 'user', loadComponent: () => import('./pages/user/user.component').then(m => m.UserComponent) },
  { path: 'resetPassword/:token', loadComponent: () => import('./reset-password/reset-password.component').then(m => m.ResetPasswordComponent) },
  { path: 'forgotPassword', loadComponent: () => import('./forget-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },

  { path: 'privacy_policy', loadComponent: () => import('./privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent) },
  { path: 'terms&conditions', loadComponent: () => import('./terms-and-conditions/terms-and-conditions.component').then(m => m.TermsAndConditionsComponent) },

  { path: '**', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) }
];
