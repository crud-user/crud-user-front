import { Routes } from '@angular/router';
import { FirstLoginFormUserComponent } from './component/first-login-form-user/first-login-form-user.component';
import { UserComponent } from './component/user/user.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { AuthGuardService } from './service/authService/auth-guard.service';
import { Inject } from '@angular/core';

export const routes: Routes = [
    { path: '', component: FirstLoginFormUserComponent, },
    {
        path:'signup',
        component: SignUpComponent
    },
    {
        path:'signin',
        component: FirstLoginFormUserComponent
    },
    {
        path:'allusers',
        component: UserComponent,
        canActivate : [AuthGuardService]
    }
];
