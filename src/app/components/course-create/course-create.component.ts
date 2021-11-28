import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course } from 'src/app/interfaces/course';
import { Student } from 'src/app/interfaces/student';
import { CoursesService } from 'src/app/services/courses.service';
import { StudentsService } from 'src/app/services/students.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css'],
})
export class CourseCreateComponent implements OnInit {
  success = false;
  msg: string = '';
  creationForm: any;
  courses: Course[] = [];
  students: Student[] = [];

  constructor(
    private studentsService: StudentsService,
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.createForm();
    this.coursesService.getCourses().subscribe((data) => {
      console.log(data);
      this.courses = data;
    });
    this.studentsService.getStudents().subscribe((data) => {
      console.log(data);
      this.students = data;
    });
  }

  createForm() {
    this.creationForm = this.fb.group({
      name: ['', Validators.required],
      start: ['', Validators.required],
      duration: ['', Validators.required],
      registrations: [[]],
    });
  }

  createCourse() {
    if (this.creationForm.valid) {
      console.log(this.creationForm);
      this.coursesService.createCourse(this.creationForm.value).subscribe(
        (data) => this.handleSuccess(data),
        (error) => this.handleError(error)
      );
    }
  }

  handleSuccess(data: any) {
    Swal.fire({
      title: 'Cours créé avec succès',
      text: 'Opération complétée',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#333',
    });
    console.log('OK handleSuccess - course created', data);
    this.creationForm.reset();
    this.coursesService.dispatchCourseCreated(data._id);
  }

  handleError(error: any) {
    error = 'Une erreur est survenue';
    console.log('KO handleError - course NOT created', error);
  }

  onHandleClose() {
    this.success = false;
  }
}
