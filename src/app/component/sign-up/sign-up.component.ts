import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionLoginService } from '../../service/sessionService/session-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  userRegister !: FormGroup
  constructor(private fb: FormBuilder, private sessionService:SessionLoginService, private router: Router){
      this.userRegister = this.fb.group({
        name : new FormControl('', [Validators.required]),
        userName : new FormControl('', [Validators.required]),
        password : new FormControl('', [Validators.required]),
        confirmPassword : new FormControl('', [Validators.required ]),
        email : new FormControl('', [Validators.required,Validators.email]),
        dateNaissance : new FormControl('', [Validators.required]),
        role : new FormControl('', [Validators.required]),
  
      },{validators: this.validatePassword})
  }

  register() {
    if(this.userRegister.valid ){this.sessionService.register(this.userRegister.value).subscribe({
      next:(res)=> {
        this.userRegister.reset()
        this.router.navigateByUrl('signin')
      },
      error:(err)=> console.log(err)
      
    })}
    console.log(this.userRegister);
  }

  validatePassword(group: FormGroup) {
    const password = group.get('password')!.value;
    const confirmPassword = group.get('confirmPassword')!.value;

    return password === confirmPassword ? null : { notMatch: true };
  }
  
}
