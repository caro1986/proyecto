import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticateService } from '../services/authenticates.service';

@Component({
  selector: 'app-resgister',
  templateUrl: './resgister.page.html',
  styleUrls: ['./resgister.page.scss'],
})
export class ResgisterPage implements OnInit {
  resgisterForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private storage: Storage,
    private authService: AuthenticateService

  ) { this.resgisterForm = this.formBuilder.group({
      nombre: new FormControl(
        "",
        Validators.compose([
          Validators.required
        ])
      ),
      apellido: new FormControl(
        "",
        Validators.compose([
          Validators.required
        ])
      ),
      email: new FormControl(),
      password: new FormControl()
    }); 
   } 

  ngOnInit() {
  }
  register(registerFormValues) {
    this.authService.registerUser(registerFormValues).then(() => {
      this.navCtrl.navigateBack("/login");
    });
  }

  goToLogin() {
    this.navCtrl.navigateBack("/login")
  }

}
