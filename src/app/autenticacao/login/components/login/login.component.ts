import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import {Login} from '../../models';
import {LoginService} from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.gerarForm();
  }

  gerarForm(){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // logar() {
  //   if (this.form.invalid) {
  //     this.snackBar.open(
  //       "Dados inválidos", "Erro", {duration: 5000});
  //       return;
  //   }
  //   const login: Login = this.form.value;
  //   alert(JSON.stringify(login));
  // }

  logar() {
    if (this.form.invalid) {
      return;
    }
    const login: Login = this.form.value;
    this.loginService.logar(login)
      .subscribe(
        data => {
          console.log(JSON.stringify(data));
          localStorage['token'] = data['data']['token'];
          const usuarioData = JSON.parse(atob(data['data']['token'].split('.')[1]));
          console.log(JSON.stringify(usuarioData));
          if (usuarioData['role'] == 'ROLE_ADMIN') {
            alert('Deve redirecionar para pagina admin');
            // this.router.navigate(['/admin']);
          } else {
            alert('Deve redirecionar para pagina usuario');
            // this.router.navigate(['/usuario']);
          }
        },
        err => {
          console.log(JSON.stringify(err));
          let msg: string = "Tente novamente em instantes";
          if (err['status'] == 401) {
            msg = "Email/Senha inválido(s)"
          }
          this.snackBar.open(msg, "Erro", {duration: 5000});
        }
    );
  }

}
