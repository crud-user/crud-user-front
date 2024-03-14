import { Component, Inject, Input, OnInit } from '@angular/core';
import { UserService } from '../../service/userService/user.service';
import { ModelFormComponent } from "../model-form/model-form.component";
import { FirstFormUserComponent } from "../first-form-user/first-form-user.component";
import { ToastrService } from 'ngx-toastr';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { Route, Router } from '@angular/router';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
    imports: [ModelFormComponent, FirstFormUserComponent,NzTableModule,NzSwitchModule,NzInputModule,FormsModule, NzButtonModule]
})
export class UserComponent implements OnInit {

  userNameFilter : string = ''
  emailFilter : string = ''
  dateFilter : string = ''
  
  switchValue = true;
  isDisabled = true;
  username : string = '';
  isModelOpen = false
  user : any
  users : any = []
  name: string = '';
  ngOnInit(): void {
    this.getAllUsers()
  }
  constructor(private userService: UserService, private toastService: ToastrService, private route :Router){
    const {userName} =  JSON.parse(sessionStorage.getItem("data")||'');
    this.username = (userName)? userName: '' 
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe({
      next: (resp: any)=>{
        this.users = resp
        console.log(resp)
      },
      error:(err)=> console.log("err::", err)
      

    });
  }

  deleteUser(id: Number){
    console.log('id recu',id);
    
    this.userService.deleteUser(id).subscribe({
      next: (resp: any)=>{
        this.getAllUsers()
        this.toastService.success('User deleted succefully');
      }
    })
  }

  editeUser(user: any) {
    this.user = user
    this.openModel()
  }
  openModel(){
    this.isModelOpen = true;
  }
  closeModel(){
    console.log("event");
    this.isModelOpen = false;
    this.getAllUsers()
  }
  
  logout() {
    console.log("logout");
    window.sessionStorage.removeItem('data')
    this.route.navigateByUrl('signin')
  }

  handleFilterByName() {
    console.log("value",this.name);
    this.userService.filterByUserName(this.name).subscribe({
      next:(res)=>{
        this.users = res
      }
    })
  }

  filterByCriteria() {
    this.userService.FilterByCriteria(this.userNameFilter,this.emailFilter,this.dateFilter).subscribe({
      next: (res)=> {this.users = res
        this.userNameFilter = ''
        this.emailFilter = ''
        this.dateFilter = ''
      },
      error:(err) => console.log("error in filter by criteria", err)
      
    })
 }
}
