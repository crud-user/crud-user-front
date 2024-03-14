import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { SessionLoginService } from '../../service/sessionService/session-login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-first-login-form-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './first-login-form-user.component.html',
  styleUrl: './first-login-form-user.component.css'
})
export class FirstLoginFormUserComponent implements OnInit{

  email : string = ''
  password : string =''
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  constructor(private router : Router, private sessionService:SessionLoginService){}

  handleSignupDirection(){
    this.router.navigateByUrl('/signup');

  }

  login(){
    this.sessionService.login(this.email,this.password).subscribe({
      next:(resp : any) => {
        window.sessionStorage.setItem("data",JSON.stringify(resp))
        this.router.navigateByUrl("allusers")
      },
      error:(err) => console.log("err loging  ::", err)
    })
  }

}
