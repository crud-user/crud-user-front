import { Component, Inject, Input, OnInit } from '@angular/core';
import { UserService } from '../../service/userService/user.service';
import { ModelFormComponent } from "../model-form/model-form.component";
import { FirstFormUserComponent } from "../first-form-user/first-form-user.component";
import { ToastrService } from 'ngx-toastr';
import { NzTableModule, NzTableQueryParams, NzTableSortOrder } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { Route, Router } from '@angular/router';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
    imports: [ModelFormComponent, FirstFormUserComponent,NzTableModule,NzSwitchModule,NzInputModule,FormsModule, NzButtonModule,NzIconModule]
})
export class UserComponent implements OnInit {



  total = 1;
  pageSize = 2;
  pageIndex = 1;
  sortField :any
  sortOrder :any 
//for filter
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
    // this.getAllUsers()
    this.getAllUsersByCriteriaAndPage()
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
    this.userService.deleteUser(id).subscribe({
      next: (resp: any)=>{
        this.getAllUsersByCriteriaAndPage()
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
    // this.getAllUsers()
    this.getAllUsersByCriteriaAndPage()
  }
  
  logout() {
    console.log("logout");
    window.sessionStorage.removeItem('data')
    this.route.navigateByUrl('signin')
  }

  handleFilterByName() {
    this.userService.filterByUserName(this.name).subscribe({
      next:(res)=>{
        this.users = res
      }
    })
  }

  filterByCriteria() {
    if(!(this.userNameFilter === '') || !(this.emailFilter === '')|| !(this.dateFilter === '') ){
      this.userService.FilterByCriteria(this.userNameFilter,this.emailFilter,this.dateFilter).subscribe({
        next: (res)=> {this.users = res
          
        },
        error:(err) => console.log("error in filter by criteria", err)
        
      })
    }
 }

 getAllUsersByCriteriaAndPage() {
  // if(!(this.userNameFilter === '') || !(this.emailFilter === '')|| !(this.dateFilter === '') ){
    this.userService.getAllUsersByCriteriaAndPage(this.userNameFilter,
      this.emailFilter,
      this.dateFilter, 
      this.pageIndex,
      this.pageSize,
      this.sortField,
      this.sortOrder
      ).subscribe({
      next: (res:any)=> {
      this.total = res.totalElements; 
        this.users = res?.content
      },
      error:(err :any) => console.log("error in getAllUsersByCriteriaAndPage", err)
      
    })
  // }
}

 resetFilter() {
  this.userNameFilter = ''
  this.emailFilter = ''
  this.dateFilter = ''
  // this.getAllUsers()
  this.getAllUsersByCriteriaAndPage()
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    // console.log("on query params change::",params.sort);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.pageIndex = pageIndex
    this.pageSize = pageSize
    this.sortField = sortField 
    this.sortOrder = (sortOrder === "ascend" && sortField !== null) ?"ASC": "DESC"
    this.getAllUsersByCriteriaAndPage();
    }

}
