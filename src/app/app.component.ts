import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserManagementListComponent } from './user-management-list/user-management-list.component';

@Component({
  selector: 'app-root',
  imports: [UserManagementListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-angular-app';
}
