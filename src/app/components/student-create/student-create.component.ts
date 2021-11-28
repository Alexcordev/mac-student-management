import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Student } from '../../interfaces/student';
import { StudentsService } from '../../services/students.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css'],
})
export class StudentCreateComponent implements OnInit {
  success = false;
  msg: string = '';
  creationForm: any;
  students: Student[] = [];

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.createForm();
    this.studentsService.getStudents().subscribe((data) => {
      console.log(data);
      this.students = data;
    });
  }

  createForm() {
    this.creationForm = this.fb.group({
      surname: ['', Validators.required],
      name: ['', Validators.required],
      dob: ['', Validators.required],
    });
  }

  createStudent() {
    if (this.creationForm.valid) {
      console.log(this.creationForm);
      this.studentsService.createStudent(this.creationForm.value).subscribe(
        (data) => this.handleSuccess(data),
        (error) => this.handleError(error)
      );
    }
  }

  handleSuccess(data: any) {
    Swal.fire({
      title: 'Étudiant créé avec succès',
      text: 'Opération complétée',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#333',
    });
    console.log('OK handleSuccess - student created', data);
    this.success = true;
    this.msg = 'Étudiant créé avec succèes';
    this.creationForm.reset();
    this.studentsService.dispatchStudentCreated(data._id);
  }

  handleError(error: any) {
    error = 'Une erreur est survenue';
    console.log('KO handleError - student NOT created', error);
  }

  onHandleClose() {
    this.success = false;
  }
}
