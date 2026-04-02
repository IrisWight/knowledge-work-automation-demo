import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  template: `
    <div class="p-6 max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-2">Welcome to MyApp</h1>
      <p class="text-gray-400 mb-8">Angular + Material (Dark Theme) + Tailwind CSS</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <mat-card>
          <mat-card-header>
            <mat-icon mat-card-avatar>info</mat-icon>
            <mat-card-title>About</mat-card-title>
            <mat-card-subtitle>Learn more about this app</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p class="mt-4">This is a starter Angular project with Material dark theme and Tailwind CSS.</p>
          </mat-card-content>
          <mat-card-actions>
            <a mat-button routerLink="/about">Go to About</a>
          </mat-card-actions>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-icon mat-card-avatar>dashboard</mat-icon>
            <mat-card-title>Dashboard</mat-card-title>
            <mat-card-subtitle>View your dashboard</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p class="mt-4">Check out the dashboard with some sample Material components.</p>
          </mat-card-content>
          <mat-card-actions>
            <a mat-button routerLink="/dashboard">Go to Dashboard</a>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
})
export class HomeComponent {}
