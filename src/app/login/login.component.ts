import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { RegisterModel } from '../model/register.model';
import { UserServiceService } from '../service/user-service.service';
import { LoginModel } from '../model/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide=true;
  user:RegisterModel = new RegisterModel(null, null, null, null, null);
  registerForm : FormGroup;
  loginForm : FormGroup;
  use:LoginModel = new LoginModel(null, null);
  

  constructor(private formbuilder:FormBuilder, private router:Router, private userSrvice:UserServiceService) { }
  

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      'name': [this.user.name, [Validators.required, this.nameCheck]],
      'email': [this.user.email, [Validators.required, Validators.email]],
      'phone': [this.user.phone, [Validators.required, Validators.pattern(new RegExp("[0-9]{10,10}"))]],
      'password': [this.user.password, [Validators.required, this.passCheck]],
      'cpassword': [this.user.cPassword, [Validators.required, this.passCheck]]
    })
    this.loginForm = this.formbuilder.group({
      'useremail': [this.use.useremail,[Validators.required, Validators.email]],
      'userPass': [this.use.userPass,[Validators.required]]
    })
  }

  nameCheck(control){
    if(control.value != null){
      var regexp = new RegExp('[a-z A-Z]');
      if(regexp.test(control.value) != true){
        return{
          nameValidity:true
        }
      }
    }
  }
  
  passCheck(control){
    if(control.value != null){
      var conpass = control.value;
      var pass = control.root.get('password');
      if(pass){
        var password = pass.value;
        if(conpass !== "" && password != ""){
          if(conpass !== password){
            return{
              passValidity:true
            }
          }
          else {
            return null
          }
        }
      }
    }

  }
  register(){
    this.userSrvice.newUsers(this.user);
    console.log("Done");
    alert("Registration Success");
    this.router.navigate(['/home']);
  }


get useremail(){
  return this.loginForm.get('useremail');
}

get userPass(){
  return this.loginForm.get('userPass');
}

  login(){
    
    this.userSrvice.loginid(this.loginForm.value).subscribe(item=>{
      
      this.router.navigate(['/home']);
    })
    
  }
}
