import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import {CadastroPj} from '../../models';
import { from } from 'rxjs';
import { CadastroPjModule } from '../../cadastro-pj.module';

@Component({
  selector: 'app-cadastro-pj',
  templateUrl: './cadastro-pj.component.html',
  styleUrls: ['./cadastro-pj.component.css']
})
export class CadastroPjComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required]],
      razaoSocial: ['', [Validators.required, Validators.minLength(5)]],
      cnpj: ['', [Validators.required]]
    });
  }

  cadastrarPj() {
    if (this.form.invalid) {
      return;
    }
    const cadastrarPj: CadastroPj = this.form.value;
    alert(JSON.stringify(cadastrarPj));
  }
}
