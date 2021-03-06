import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CadastroPjComponent, CadastrarPjComponent} from './components';

export const CadastroPJRoutes: Routes = [
    {
      path:'cadastro-pj', 
      component: CadastroPjComponent, 
      children: [{path: '', component: CadastrarPjComponent}]
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(CadastroPJRoutes)
    ],
  exports: [
      RouterModule
    ]
})
export class CadastroPJRoutingModule { }
