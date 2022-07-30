import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticateService } from '../services/authenticates.service';


@Component({
  selector: 'app-resgister',
  templateUrl: './resgister.page.html',
  styleUrls: ['./resgister.page.scss'],
})

export class ResgisterPage implements OnInit {
  resgisterForm: FormGroup;
  loginForm: FormGroup;

  validation_messages = {
    
    nombre: [
      { type: "required", message: "Este campo es obligatorio" }
    ],

    apellido: [
      { type: "required", message: "Este campo es obligatorio" }
    ],
    
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
  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private storage: Storage,
    private authService: AuthenticateService,
    private alertController: AlertController)

   { this.resgisterForm = this.formBuilder.group({
      nombre: new FormControl(
        "",
        Validators.compose([
          Validators.required,
        ])
      ),
      apellido: new FormControl(
        "",
        Validators.compose([
          Validators.required,
        ])
      ),
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
      )
      
    })
  } 
   
  ngOnInit() {
  }
  resgister(resgisterFormValues) {
    this.authService.registerUser(resgisterFormValues).then(() => {
      this.navCtrl.navigateBack("/login");
    });
  }
 
  goToLogin() {
    this.navCtrl.navigateBack("/login").then((resp) => {
      console.log(resp)
    })
  }

}
