import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from './user';
import { FormType } from '../enum';
import { UserService } from '../services/user.service';
import { EditUserComponent } from './edit-user/edit-user.component';


@Component({
  selector: 'user-management-list',
  standalone: true,
  imports: [CommonModule,EditUserComponent],
  templateUrl: './user-management-list.component.html',
  styleUrl: './user-management-list.component.css',
})
export class UserManagementListComponent implements OnInit {
  isVisible: boolean = false;
  users: User[] = [];
  loading = false;
  error = '';
  selectedUser: User | null = null;
  formType: FormType = FormType.Add;
  formTitle: string = '';
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    // setTimeout(() => {
    //   this.users = [
    //     {
    //       id: 1,
    //       name: 'שרה',
    //       username: 'לוי',
    //       email: 'dd@gmail.com',
    //     },
    //     {
    //       id: 2,
    //       name: 'לאה',
    //       username: 'כהן',
    //       email: 'dhhd@gmail.com',
    //     },
    //   ];
    //   this.loading = false;
    // }, 1000);
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error get all users. Please try again later.';
        this.loading = false;
        console.error('Error in get users:', error);
      },
    });
  }

  editUser(user: any) {
    this.formType = FormType.Edit;
    this.selectedUser = user;
    this.formTitle = 'עריכת משתמש';
    this.isVisible = true;
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe((res) => {
      this.loadUsers();
    });
    this.users = this.users.filter((user) => user.id !== userId);
  }

  addUser() {
    this.formType = FormType.Add;
    this.selectedUser = null;
    this.formTitle = 'הוספת משתמש';
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
    this.selectedUser = null;
  }

  onSaveUser(userData: Partial<User>) {
    if (this.formType == FormType.Edit && this.selectedUser) {
      const index = this.users.findIndex((t) => t.id === this.selectedUser!.id);
      if (index !== -1) {
        this.users[index] = { ...this.users[index], ...userData };
        this.close();
      }
    } else {
      const newUser: User = {
        ...userData,
        id: Math.max(0, ...this.users.map((t) => t.id)) + 1,
      } as User;
      //  this.userService.addUser(newUser).subscribe(res=>{
      // this.close();
      //   //  this.loadUsers();
      //  });
      this.users.push(newUser);
    }
  }
}
