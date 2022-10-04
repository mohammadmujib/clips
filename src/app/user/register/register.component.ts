import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore
  ) {}
  inSubmission = false
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ])
  email = new FormControl('', [Validators.required, Validators.email])
  age = new FormControl('', [
    Validators.required,
    Validators.min(8),
    Validators.max(100),
  ])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    ),
  ])
  confirm_password = new FormControl('', [Validators.required])
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13),
  ])

  showAlert = false
  alertMsg = 'Please Wait your account is being created.'
  alertColor = 'blue'

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber,
  })
  async register() {
    this.showAlert = true
    this.alertMsg = 'please wait! Your account is being created'
    this.alertColor = 'blue'
    this.inSubmission = true
    const { email, password } = this.registerForm.value

    try {
      const userCred = await this.auth.createUserWithEmailAndPassword(
        email as string,
        password as string
      )
      await this.db.collection('users').add({
        name: this.name.value,
        email: this.email.value,
        age: this.age.value,
        phoneNumber: this.phoneNumber.value,
      })
    } catch (error) {
      console.error(error)
      this.alertMsg = 'An Uxpected error occured'
      this.alertColor = 'red'
      this.inSubmission = false
      return
    }
    this.alertMsg = 'Sucess! Your account has been created.'
    this.alertColor = 'green'
  }
}
