import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router, ActivatedRoute} from '@angular/router';

import { RegisterModel } from '../model/register.model';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  useremail: any;
  id:any;
  status = "Active";
  userList=<any>('');
  users: RegisterModel[];
  user: RegisterModel = new RegisterModel(null, null, null, null, null);
  constructor(private breakpointObserver: BreakpointObserver, private userservice:UserServiceService,
              private router:Router, private route:ActivatedRoute) {}

  ngOnInit(): void {
    
    this.route.params.subscribe(params=>{
      console.log(params.useremail);
      this.useremail = params.useremail;
      console.log(this.useremail)
    })

    this.userservice.getUsers().subscribe(data=>{
      this.users = JSON.parse(JSON.stringify(data));
      console.log(data);
      console.log(this.users)
    })
  }

  logout(){
    this.router.navigate(['/'])
  }
}
