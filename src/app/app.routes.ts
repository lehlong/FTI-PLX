import { Routes } from '@angular/router'
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component'
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component'
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component'
import { HomeComponent } from './home/home.component'
import { AuthGuard } from './guards/auth.guard'
import { UnauthGuard } from './guards/unauth.guard'
import { masterDataRoutes } from './master-data/master-data.routes'
import { reportRoutes } from './report/report.routes'
import { systemManagerRoutes } from './system-manager/system-manager.routes'
import { businessRoutes } from './business/business.routes'
import { NotFoundComponent } from './not-found/not-found.component'
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component'
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component'
import { incidentRoutes } from './incident/incident.routes'
import { performanceRoutes } from './performance/performance.routes'

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      {
        path: 'master-data',
        children: masterDataRoutes,
        canActivate: [AuthGuard],
      },
      { path: 'report', children: reportRoutes, canActivate: [AuthGuard] },
      {
        path: 'system-manager',
        children: systemManagerRoutes,
        canActivate: [AuthGuard],
      },
      { path: 'business', children: businessRoutes, canActivate: [AuthGuard] },
      { path: 'incident', children: incidentRoutes, canActivate: [AuthGuard] },
      { path: 'performance', children: performanceRoutes, canActivate: [AuthGuard] },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, canActivate: [UnauthGuard] },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [UnauthGuard],
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [UnauthGuard],
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        canActivate: [UnauthGuard],
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
]
