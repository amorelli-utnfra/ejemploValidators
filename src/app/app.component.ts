import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { confirmarCalveValidator } from './validadores/clave.validator';
import { UsuariosService } from './services/usuarios.service';
import { usuarioExisteAsyncValidator } from './validadores/usuario.validator';
import { UsuarioResponse } from './modelos/usuario-response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  form!: FormGroup;

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      usuario: new FormControl('',{
        asyncValidators: usuarioExisteAsyncValidator(this.usuariosService),
        updateOn: 'blur'
      }),
      nombre: new FormControl("", [Validators.pattern('^[a-zA-Z]+$')]),
      edad: new FormControl("", Validators.min(18)),
      mail: new FormControl("", Validators.email),
      clave: new FormControl("", Validators.minLength(4)),
      repiteClave: new FormControl("", Validators.required)
  
    }, confirmarCalveValidator());
  }

  get usuario() {
    return this.form.get('usuario');
  }
  get nombre() {
    return this.form.get('nombre');
  }
  get edad() {
    return this.form.get('edad');
  }
  get mail() {
    return this.form.get('mail');
  }
  get clave() {
    return this.form.get('clave');
  }
  get repiteClave() {
    return this.form.get('repiteClave');
  }

  enviarForm() {
    console.log(this.form.value);
    
  }
}
