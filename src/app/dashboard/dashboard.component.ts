import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <div class="p-6 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">Dashboard</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        @for (stat of stats; track stat.label) {
          <mat-card>
            <mat-card-content>
              <p class="text-gray-400 text-sm">{{ stat.label }}</p>
              <p class="text-2xl font-bold">{{ stat.value }}</p>
              <mat-progress-bar mode="determinate" [value]="stat.progress" class="mt-2" />
            </mat-card-content>
          </mat-card>
        }
      </div>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Settings</mat-card-title>
        </mat-card-header>
        <mat-card-content class="mt-4 flex flex-col gap-4">
          <mat-slide-toggle>Enable notifications</mat-slide-toggle>
          <mat-slide-toggle>Dark mode (always on)</mat-slide-toggle>
          <mat-form-field appearance="outline">
            <mat-label>Display name</mat-label>
            <input matInput placeholder="Enter your name">
          </mat-form-field>
          <div>
            <button mat-raised-button color="primary">Save</button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class DashboardComponent {
  stats = [
    { label: 'Users', value: '1,234', progress: 72 },
    { label: 'Revenue', value: '$5,678', progress: 56 },
    { label: 'Orders', value: '890', progress: 89 },
  ];
}
