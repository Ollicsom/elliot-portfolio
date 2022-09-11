import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
      private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    }) 
  }

  connect() {
    if( this.loginForm.valid ){ 
        this.apiService.login(this.loginForm.value).subscribe(token => {
            localStorage.setItem('token', token);
            window.location.href = '#/back-office/edit';
        })
    } else {}
  }

}
