import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private Router:Router, private AuthService:AuthService) { }

  ngOnInit(): void {

  }

  login(){
      this.AuthService.login()
        .subscribe(resp => {
                            console.log(resp.id);
                            if (resp.id){
                              this.Router.navigate(['./heroes']);
                            }
                            })

      // this.Router.navigate(['./heroes']);
  }

}
