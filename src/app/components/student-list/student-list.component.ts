import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../interfaces/student';
import { Course } from '../../interfaces/course';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  tab: any[] = [];
  students: Student[] = [];
  courses: Course[] = [];
  studentCourses: any[] = [];
  errorFromServer = '';

  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.studentsService.getStudents().subscribe((data) => {
      this.students = data;
    });
    this.coursesService.getCourses().subscribe((res) => {
      this.courses = res;
      this.getStudentCourses(this.courses);
    });
  }

  getStudentCourses(tab: Course[]) {
    let elem: Course;
    let course: any = '';
    let students: any = '';
    tab.forEach((el) => {
      elem = el;
      elem.registrations.forEach((element) => {
        if (element != null) {
          course = elem.name;
          students = element;
          this.studentCourses.push({ course: course, students: students });
        }
      });
    });
    console.log(this.studentCourses);
  }

  deleteStudent(id: any) {
    if (id) {
      let subscription = this.studentsService.deleteStudentById(id).subscribe(
        (data) => {
          console.log(data);
          this.refresh(data);
          subscription.unsubscribe();
        },
        (err) => {
          return this.handleError(err);
        }
      );
    }
  }

  refresh(data: any) {
    Swal.fire({
      title: 'Cours supprimé avec succès',
      text: 'Opération complétée',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#333',
    });
    console.log('data', data);
    this.studentsService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  handleError(error: any) {
    if (error.status === 401) {
      this.router.navigate(['/login']);
    } else {
      this.errorFromServer = `Error ${error.status} - ${error.statusText}`;
    }
  }
  logout() {
    this.authService.logout().subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigate(['/auth']);
      },
      (err: any) => console.error(err)
    );
  }
}
