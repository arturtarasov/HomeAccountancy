import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../shared/services/users.service";
import {User} from "../../shared/models/user.model";
import {Router} from "@angular/router";
import { Title, Meta } from '@angular/platform-browser';
import { Api } from 'src/app/shared/core/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'wfm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private api;
  private http: HttpClient;
  form: FormGroup;
  constructor(
    private userService: UsersService,
    private router: Router,
    private title: Title,
    private meta: Meta,
    private httpClient: HttpClient
  ) { 
    title.setTitle('Регистрация в систему');
    meta.addTags([
      {name: 'keywords', content: 'регистрация, система, логин, пароль, имя'},
      {name: 'description', content: 'Регистрация в систему'}
    ]);
    this.http = httpClient;
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, Validators.required),
      'agree': new FormControl(false, Validators.requiredTrue)
    });
    this.api = new Api(this.http);
  }

  onSubmit() {
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);
    const data = {
      email, password, name
    }
    this.api.post('registration', data)
      .subscribe((data) => {
        console.log(data);
      })
    // this.userService.createNewUser(user)
    //   .subscribe(() => {
    //     this.router.navigate(['/login'], {
    //       queryParams: {
    //         nowCanLogin: true
    //       }
    //     });
    //   })
  }

  forbiddenEmails(control: FormControl) : Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getUserByEmail(control.value)
        .subscribe((user: User) => {
          if(user) {
            resolve({forbiddenEmail: true});
          } else {
            resolve(null);
          }
        })
    });
  }
}
