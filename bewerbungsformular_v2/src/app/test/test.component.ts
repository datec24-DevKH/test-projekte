import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { PersonioService } from '../../personio.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  test: FormGroup;
  successMessage: string = '';
  showForm: boolean = true;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder, 
    private personioService: PersonioService, 
    private httpClient: HttpClient 
  ) {
    this.test = this.fb.group({
      name: ['', Validators.required],
      vorname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.test.valid) {
      const formValues = this.test.value;
      const newEmployee = {
        first_name: formValues.vorname,
        last_name: formValues.name,
        email: formValues.email,
      };



      this.personioService.createEmployee(newEmployee).subscribe(
        response => {
          console.log('Mitarbeiter erfolgreich angelegt', response);
          this.successMessage = 'Mitarbeiter erfolgreich angelegt';
          this.showForm = false;
        },
        error => {
          console.error('Fehler beim Anlegen des Mitarbeiters', error);
        }
      );
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  clearSuccessMessage() {
    setTimeout(() => {
      this.successMessage = '';
      this.showForm = true;
    }, 5000);
  }

  get name() {
    return this.test.get('name');
  }

  get vorname() {
    return this.test.get('vorname');
  }

  get email() {
    return this.test.get('email');
  }


}
