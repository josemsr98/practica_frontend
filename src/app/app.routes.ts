import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import ConstRoutes from './shared/contants/const-routes';
import {UserListComponent} from "./features/user-list/user-list.component";
import {HomeComponent} from "./features/home/home.component";

export const routes: Routes = [
    { path: '', redirectTo: ConstRoutes.PATH_LOGIN, pathMatch: 'full' },
    { path: ConstRoutes.PATH_LOGIN, component: LoginComponent },
    { path: ConstRoutes.PATH_USUARIOS, component: UserListComponent },
    {path: 'home', component: HomeComponent}

];


