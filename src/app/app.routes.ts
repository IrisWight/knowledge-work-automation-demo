import { Routes } from '@angular/router';
import { CopilotComponent } from './copilot/copilot.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: CopilotComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '' },
];
