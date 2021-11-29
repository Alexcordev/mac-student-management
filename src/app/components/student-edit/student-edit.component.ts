import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
})
export class StudentEditComponent implements OnInit {
  editForm: any;
  studentId: any = '';
  student: any;
  msg: string = '';
  success: boolean = false;
  errorFromServer = '';
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private el: ElementRef,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.studentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.studentsService.getStudentById(this.studentId).subscribe(
      (data) => {
        this.student = data;
        this.createForm();
      },
      (error) => console.error(error)
    );
  }
  createForm() {
    this.editForm = this.fb.group({
      surname: this.student.surname,
      name: this.student.name,
      dob: this.student.dob,
    });
  }
  updateStudent(formDirective: FormGroupDirective) {
    if (this.editForm.valid) {
      console.log(this.editForm);
      this.studentsService
        .updateStudentById(this.studentId, this.editForm.value)
        .subscribe(
          (data) => this.handleSuccess(data, formDirective),
          (error) => this.handleError(error)
        );
    }
  }
  handleSuccess(data: any, formDirective: FormGroupDirective) {
    Swal.fire({
      title: 'Étudiant mis à jour avec succès',
      text: 'Opération complétée',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#333',
    });
    console.log('OK handleSuccess - student updated', data);
    this.editForm.reset();
    formDirective.reset();
    formDirective.resetForm();
    this.studentsService.dispatchStudentCreated(data._id);
  }

  handleError(error: any) {
    console.log('KO handleError - student NOT updated', error);
  }

  onHandleClose() {
    this.success = false;
  }
}
