import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'welcome' },
    { path: 'isuite', pathMatch: 'full', redirectTo: 'welcome' },
    { path: 'welcome', loadChildren: './modules/welcome/welcome.module#WelcomeModule' },
     { path: 'home', loadChildren: './modules/home/home.module#HomeModule' },
      { path: 'users', loadChildren: './modules/users/users.module#UsersModule' },
      { path: 'databasemgmt', loadChildren: './modules/databasemgmt/databasemgmt.module#DatabasemgmtModule' },
      { path: 'messageboard', loadChildren: './modules/messageboard/messageboard.module#MessageboardModule' },
      { path: 'incidents', loadChildren: './modules/incidents/incidents.module#IncidentsModule' },
];

@NgModule({
    imports: [RouterModule.forRoot(
        routes,
        { enableTracing: true })], // <-- debugging purposes only)],
    exports: [RouterModule]
})

export class AppRoutingModule {}

export const routingComponents = [
];
