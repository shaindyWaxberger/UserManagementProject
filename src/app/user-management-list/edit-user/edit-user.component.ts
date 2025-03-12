import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormType } from '../../enum';
import { User } from '../user';

@Component({
  selector: 'edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent {
  userForm!: FormGroup;
  @Input() isVisible = false;
  @Input() user: User | null = null;
  @Input() type: FormType = FormType.Add;
  @Input() formTitle: string = '';
  @Output() onClose = new EventEmitter<void>();
  @Output() saveUser = new EventEmitter<Partial<User>>();

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: [''],
      name: [''],
      userName: [''],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnChanges() {
    if (this.user && this.type == FormType.Edit) {
      this.userForm.patchValue(this.user);
    } else if (this.type == FormType.Add) {
      this.userForm.reset({
        status: 'pending',
        priority: 'medium',
        dueDate: new Date().toISOString().split('T')[0],
      });
    }
  }

  close() {
    this.onClose.emit();
    this.userForm.reset();
  }

  save() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      if (this.type == FormType.Edit && this.user) {
        userData.id = this.user.id;
      }
      this.saveUser.emit(userData);
      this.close();
    }
  }
}
