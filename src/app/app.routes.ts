import { Routes } from '@angular/router';

const authComponent = () => import('./auth/auth.component').then(m => m.AuthLayoutComponent);
const LoginComponent = () => import('./auth/components/login/login.component').then(m => m.LoginComponent);
const RegisterComponent = () => import('./auth/components/register/register.component').then(m => m.RegisterComponent);
const HomeComponent = () => import('./home/home.component').then(m => m.HomeLayoutComponent);
const VoteCategoryComponent = () => import('./home/pages/vote-category/vote-category.component').then(m => m.VoteCategoryComponent);
const SelectionComponent = () => import('./home/pages/selection/selection.component').then(m => m.SelectionComponent);
const ObligatoryPage = () => import('./home/pages/vote-category/pages/obligatory-page/obligatory-page.component').then(m => m.ObligatoryPageComponent);
const OptionalPage = () => import('./home/pages/vote-category/pages/optional-page/optional-page.component').then(m => m.OptionalPageComponent);
const SuggestionPageComponent = () => import('./home/pages/vote-category/pages/suggestion-page/suggestion-page.component').then(m => m.SuggestionPageComponent);
const MakeSuggestionPageComponent = () => import('./home/pages/vote-category/pages/make-suggestion-page/make-suggestion-page.component').then(m => m.MakeSuggestionPageComponent);

export const routes: Routes = [
    {path: 'auth', loadComponent: authComponent, children: [
        {path: 'login', loadComponent: LoginComponent},
        {path: 'register', loadComponent: RegisterComponent},
        {path: '', redirectTo: 'login', pathMatch: 'full'},
    ]},
    {path: '', loadComponent: HomeComponent, children: [
        {path: 'selection', loadComponent: SelectionComponent},
        {path: 'vote-category', loadComponent: VoteCategoryComponent, children: [
            {path: 'cat-obligatory', loadComponent: ObligatoryPage},
            {path: 'cat-optional', loadComponent: OptionalPage},
            {path: 'cat-suggestion', loadComponent: SuggestionPageComponent},
            {path: 'cat-make-suggestion', loadComponent: MakeSuggestionPageComponent},
            {path: '', redirectTo: 'cat-obligatory', pathMatch: 'full'},
        ]},
        {path: '', redirectTo: 'selection', pathMatch: 'full'},
    ]},
    {path: '**', redirectTo: '', pathMatch: 'full'},
];