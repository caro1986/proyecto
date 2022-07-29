import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  validation_messages = {
    email: [
      { type: "required", message: "Este campo es obligatorio" },
      { type: "pattern", message: "El email no es valido" }
    ],

    password:[
      {type:"required", message:"Este campo es obligatorio"}, 
      {type:"minlength", message:"Contraseña invalida"}
    ]
  };
  errorMessage: any;

  constructor(private formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({

      email: new FormControl(
        "",
        Validators.compose([  
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+$")
        ])
      ),

      password: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
      ),
    })

  }


  ngOnInit() {
  }

}