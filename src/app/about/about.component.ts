import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-about',
  imports: [MatCardModule, MatChipsModule],
  template: `
    <div class="p-6 max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">About</h1>
      <mat-card>
        <mat-card-content>
          <p class="mb-4">This project was scaffolded with the Angular CLI and includes:</p>
          <mat-chip-set>
            <mat-chip>Angular 19</mat-chip>
            <mat-chip>Angular Material</mat-chip>
            <mat-chip>Dark Theme</mat-chip>
            <mat-chip>Tailwind CSS</mat-chip>
            <mat-chip>Routing</mat-chip>
          </mat-chip-set>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class AboutComponent {}
