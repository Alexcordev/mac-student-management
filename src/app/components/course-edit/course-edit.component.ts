import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { StudentsService } from 'src/app/services/students.service';
import { Student } from '../../interfaces/student';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css'],
})
export class CourseEditComponent implements OnInit {
  editForm: any;
  courseId: any = '';
  course: any;
  students: Student[] = [];
  msg: string = '';
  success: boolean = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private el: ElementRef,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
    this.coursesService.getCourseById(this.courseId).subscribe(
      (data) => {
        this.course = data;
        this.createForm();
      },
      (error) => console.error(error)
    );
    this.studentsService.getStudents().subscribe((data) => {
      console.log(data);
      this.students = data;
    });
  }
  createForm() {
    this.editForm = this.fb.group({
      name: this.course.name,
      start: this.course.start,
      duration: this.course.duration,
      registrations: [this.course.registrations],
    });
  }
  updateCourse(formDirective: FormGroupDirective) {
    if (this.editForm.valid) {
      console.log(this.editForm);
      this.coursesService
        .updateCourseById(this.courseId, this.editForm.value)
        .subscribe(
          (data) => this.handleSuccess(data, formDirective),
          (error) => this.handleError(error)
        );
    }
  }
  handleSuccess(data: any, formDirective: FormGroupDirective) {
    Swal.fire({
      title: 'Cours mis à jour avec succès',
      text: 'Opération complétée',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#333',
    });
    console.log('OK handleSuccess - course updated', data);
    this.editForm.reset();
    formDirective.reset();
    formDirective.resetForm();
    this.coursesService.dispatchCourseCreated(data._id);
    this.router.navigate(['/courses']);
  }

  handleError(error: any) {
    console.log('KO handleError - course NOT updated', error);
  }

  onHandleClose() {
    this.success = false;
  }
}
