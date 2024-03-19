import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../service/userService/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-first-form-user',
  standalone: true,
  imports: [ReactiveFormsModule],
     templateUrl: './first-form-user.component.html',
  styleUrl: './first-form-user.component.css'
})
export class FirstFormUserComponent implements OnChanges {
  @Input() data : any
  @Output() onCloseModel = new EventEmitter();
  userForm !: FormGroup

  constructor(private fb:FormBuilder , private userService : UserService, private toastsService : ToastrService){
    this.userForm = this.fb.group({
      name : new FormControl('', [Validators.required]),
      userName : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required,Validators.email]),
      dateNaissance : new FormControl('', [Validators.required]),
      role : new FormControl('', [Validators.required]),

    })
  }


  ngOnChanges(): void {
    if(this.data){
      this.userForm.patchValue({
        name : this.data.name,
        userName : this.data.userName,
        password : this.data.password,
        email : this.data.email,
        dateNaissance : this.data.dateNaissance,
        role : this.data.role
      })
    }
  }

  onClose() {
    this.onCloseModel.emit(false);
    this.userForm.reset();
  }
  onSubmit(){
    if(this.userForm.valid){
      if(this.data){
        this.userService.updateUser(this.data.id, this.userForm.value).subscribe({
          next:(resp : any)=>{
            console.log("userForm value::",this.userForm.value);
            this.resetForm()
            this.toastsService.success('User Updated successfully')
          },
          error:(err) => this.toastsService.error('Something went wrong')
        });
      }else{
        this.userService.AddUser(this.userForm.value).subscribe({
          next:(Response)=> {
            this.resetForm()
            this.toastsService.success('User added successfully')
          },
          error:(err) => this.toastsService.error('Something went wrong')
        })
      }
    }else{
      this.userForm.markAllAsTouched(); 
    }
    
  }

  resetForm(){
    this.userForm.reset()
    this.onClose()
  }
}
