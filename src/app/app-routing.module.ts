import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './services/auth/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module').then( m => m.TestPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'all-service',
    loadChildren: () => import('./pages/all-service/all-service.module').then( m => m.AllServicePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'learner-license-application',
    loadChildren: () => import('./pages/learner-license-application/learner-license-application.module').then( m => m.LearnerLicenseApplicationPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'prerequisition-of-learner',
    loadChildren: () => import('./pages/prerequisition-of-learner/prerequisition-of-learner.module').then( m => m.PrerequisitionOfLearnerPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'learner-application-success',
    loadChildren: () => import('./pages/learner-application-success/learner-application-success.module').then( m => m.LearnerApplicationSuccessPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'driver-license-tagging',
    loadChildren: () => import('./pages/driver-license-tagging/driver-license-tagging.module').then( m => m.DriverLicenseTaggingPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vehicle-tagging',
    loadChildren: () => import('./pages/vehicle-tagging/vehicle-tagging.module').then( m => m.VehicleTaggingPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'driver-tagging',
    loadChildren: () => import('./pages/driver-tagging/driver-tagging.module').then( m => m.DriverTaggingPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./pages/user-profile/user-profile.module').then( m => m.UserProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notification-details',
    loadChildren: () => import('./pages/notification-details/notification-details.module').then(m => m.NotificationDetailsPageModule),
    canActivate: [AuthGuard]
 },
 {
  path: 'tin-information',
  loadChildren: () => import('./pages/tin-information/tin-information.module').then(m => m.TinInformationPageModule),
   canActivate: [AuthGuard]
},
{
    path: 'bill-info',
    loadChildren: () => import('./pages/bill-info/bill-info.module').then(m => m.BillInfoPageModule),
  canActivate: [AuthGuard]
},
{
  path: 'appointment',
  loadChildren: () => import('./pages/appointment/appointment.module').then(m => m.AppointmentPageModule),
  canActivate: [AuthGuard]
},
  {
    path: 'profiles',
    loadChildren: () => import('./pages/user/profiles/profiles.module').then( m => m.ProfilesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./pages/forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/change-password/change-password.module').then( m => m.ChangePasswordPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'otp',
    loadChildren: () => import('./pages/otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'learner-bill-info',
    loadChildren: () => import('./pages/learner-bill-info/learner-bill-info.module').then( m => m.LearnerBillInfoPageModule)
  },
  {
    path: 'prerequisition-of-appointment',
    loadChildren: () => import('./pages/prerequisition-of-appointment/prerequisition-of-appointment.module').then( m => m.PrerequisitionOfAppointmentPageModule)
  },
  {
    path: 'complain',
    loadChildren: () => import('./pages/complain/complain.module').then(m => m.ComplainPageModule)
  },
  {
    path: 're-exam',
    loadChildren: () => import('./pages/re-exam/re-exam.module').then( m => m.ReExamPageModule)
  },
  {
    path: 'nidverification',
    loadChildren: () => import('./pages/nidverification/nidverification.module').then( m => m.NidverificationPageModule)
  },
  {
    path: 'driving-license-application',
    loadChildren: () => import('./pages/driving-license-application/driving-license-application.module').then( m => m.DrivingLicenseApplicationPageModule)
  },
  {
    path: 'c-password',
    loadChildren: () => import('./pages/c-password/c-password.module').then( m => m.CPasswordPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
