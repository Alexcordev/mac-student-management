import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../interfaces/course';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  studentCourses: any[] = [];
  errorFromServer = '';

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe((res) => {
      this.courses = res;
      this.getStudentCourses(this.courses);
    });
  }

  getStudentCourses(tab: Course[]) {
    let elem: Course;
    let course: any;
    let students: any;
    tab.forEach((el) => {
      elem = el;
      elem.registrations.forEach((element) => {
        if (element != null) {
          console.log(element);
          course = elem.name;
          students = element;
          this.studentCourses.push({ course: course, students: students });
        }
      });
    });
    console.log(this.studentCourses);
  }

  deleteCourse(id: any) {
    if (id) {
      let subscription = this.coursesService.deleteCourseById(id).subscribe(
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

  handleError(error: any) {
    if (error.status === 401) {
      this.router.navigate(['/login']);
    } else {
      this.errorFromServer = `Error ${error.status} - ${error.statusText}`;
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
    this.courses = data;
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
