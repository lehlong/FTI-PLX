import { Component } from '@angular/core'
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms'
import { ShareModule } from '../../shared/share-module/index'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { GlobalService } from '../../services/global.service'
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  validateForm: FormGroup<{
    usernameOrEmail: FormControl<string>
    password: FormControl<string>
    remember: FormControl<boolean>
  }> = this.fb.group({
    usernameOrEmail: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true],
  })

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router,
    private globalService: GlobalService,
    private http: HttpClient,
  ) { }
  passwordVisible: boolean = false
  submitForm(): void {
    if (this.validateForm.valid) {
      try {
        const credentials = {
          usernameOrEmail: this.validateForm.get('usernameOrEmail')?.value,
          password: this.validateForm.get('password')?.value,
          applink: "https://pm.petrolimexsg.com.vn"
        }

        this.http.post(environment.baseApiUrl + '/user/signin', credentials
        ).subscribe({
          next: (response: any) => {
            localStorage.setItem('__the_token', JSON.stringify(response));
            localStorage.setItem('__activeRole', JSON.stringify(response.company));
            localStorage.setItem('__activeIngpr', JSON.stringify(response.planner_group));

            this.http.get(environment.baseApiUrl + `/get_roles/${credentials.usernameOrEmail}/null`)
              .subscribe({
                next: (response: any) => {
                  localStorage.setItem('__roles', JSON.stringify(response.pcty.item));
                },
                error: (error) => {
                  console.error('Fail load:', error)
                },
              })
            this.http.get(environment.baseApiUrl + `/get_roles/${credentials.usernameOrEmail}/${response.company}`)
              .subscribe({
                next: (response: any) => {

                  localStorage.setItem('__activeIngpr', JSON.stringify(response.prole.item[0].ingpr));
                  localStorage.setItem('__iwerk', JSON.stringify(response.prole.item[0].iwerk));
                  localStorage.setItem('__tplnr', JSON.stringify(response.prole.item[0].tplnr));
                  window.location.reload();
                },
                error: (error) => {
                  console.error('Fail load:', error)
                },
              });

          },
          error: (error) => {
            console.error('Login failed:', error)
          },
        })
      } catch (e) {
        console.error('Login failed:', e)
      }
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty()
          control.updateValueAndValidity({ onlySelf: true })
        }
      })
    }
  }
}
