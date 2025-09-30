export interface Course {
  name: string;
  hours: number;
  students: string[];
}

export class OnlineCourse implements Course {
  constructor(public name: string, public hours: number, public students: string[] = []) {}

  registerStudent(student: string): void {
    if (!this.isStudentRegistered(student)) {
      this.students.push(student);
    }
  }

  isStudentRegistered(student: string): boolean {
    return this.students.includes(student);
  }
}

export class CourseManager {
  private courses: Course[] = [];

  addCourse(course: Course): void {
    this.courses.push(course);
  }

  removeCourse(courseName: string): void {
    this.courses = this.courses.filter(c => c.name != courseName);
  }

  findCourse(courseName: string): Course | undefined {
    return this.courses.find(c => c.name == courseName);
  }

  list(): Course[] {
    return [...this.courses];
  }
}

// Демо
export function demoCourses(): void {
  console.log("Task 5: Courses");
  const js = new OnlineCourse("JavaScript Advanced", 25);
  const vue = new OnlineCourse("Vue.js Fundamentals", 35);
  const ds = new OnlineCourse("Data Structures", 28);

  js.registerStudent("Oksana");
  js.registerStudent("Dmytro");
  vue.registerStudent("Oksana");

  const mgr = new CourseManager();
  mgr.addCourse(js);
  mgr.addCourse(vue);
  mgr.addCourse(ds);

  for (const c of mgr.list()) {
    console.log(`${c.name} (${c.hours}h) – students: ${c.students.join(", ") || "—"}`);
  }
}
