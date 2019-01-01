import { Component, OnInit } from '@angular/core';
import {FormControl , FormGroup , Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";

import {UsersService} from "../../shared/services/users.service";
import {User} from "../../shared/models/user.model";
import {Message} from "../../shared/models/message.model";
import {AuthService} from '../../shared/services/auth.service';
import { Title, Meta } from '@angular/platform-browser';
import { HttpClient } from "@angular/common/http";
import { Api } from 'src/app/shared/core/api';

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;
  http: HttpClient;
  private api;
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    private httpClient: HttpClient
  ) { 
    title.setTitle('Вход в систему');
    meta.addTags([
      {name: 'keywords', content: 'вход, логин, пароль, система'},
      {name: 'description', content: 'Вход в систему'}
    ]);
    this.http = httpClient;
  }

  ngOnInit() {
    this.api = new Api(this.http);
    this.message = new Message('danger', '');

    this.route.queryParams
      .subscribe((params: Params) => {
        if(params['nowCanLogin']){
          this.showMessage('Теперь вы можете войти в систему', 'success');
        }
        else {
          if (params['accessDenied']) {
            this.showMessage('Для работы с системой вам необходимо войти', 'warning');
          }
        }
      });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;
    const data = {
      email: formData.email,
      password: formData.password
    };
    this.api.post('login', data)
      .subscribe((data) => {
        console.log(data);
      })
    // this.userService.getUserByEmail(formData.email)
    //   .subscribe((user: User) => {
    //     if (user) {
    //       if (user.password === formData.password) {
    //         this.message.text = '';
    //         window.localStorage.setItem('user', JSON.stringify(user));
    //         this.authService.login();
    //         this.router.navigate(['/system', 'bill']);
    //       } else {
    //         this.showMessage('пароль не верный');
    //       }
    //     } else {
    //       this.showMessage('Такого пользователя не существует');
    //     }
    //   });
  }
}
