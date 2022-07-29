import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticates.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  loginForm: FormGroup;
  validation_messages = {
    email: [
      { type: "require", message:"el email es obligatorio"},
      { type: "pattern", message:"el email no es valido"}
    ],
    password: [
      { type: "require", message:"el password es obligatorio"},
      { type: "pattern", message:"el password no es valido"}
    ]

  };
  errorMessage: any;
 
  constructor(private formBuilder: FormBuilder, 
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private storage: Storage) {

    this.storage.create();
      
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
          Validators.minLength(6),
          Validators.maxLength(8)
          
        ])
      )
    })
   }

  ngOnInit() {
  }

  loginUser(credentials){
    this.authService.loginUser(credentials).then( res => {
      this.errorMessage = ""; 
      this.storage.set("isUserLoggendIn", true) 
      this.navCtrl.navigateForward("/home");  
    }).catch( err => {
      this.errorMessage = err;
    })
  }

  goToRegister(){
    this.navCtrl.navigateForward("/resgister");
  }

}
