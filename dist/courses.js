export class OnlineCourse {
    constructor(name, hours, students = []) {
        this.name = name;
        this.hours = hours;
        this.students = students;
    }
    registerStudent(student) {
        if (!this.isStudentRegistered(student)) {
            this.students.push(student);
        }
    }
    isStudentRegistered(student) {
        return this.students.includes(student);
    }
}
export class CourseManager {
    constructor() {
        this.courses = [];
    }
    addCourse(course) {
        this.courses.push(course);
    }
    removeCourse(courseName) {
        this.courses = this.courses.filter(c => c.name != courseName);
    }
    findCourse(courseName) {
        return this.courses.find(c => c.name == courseName);
    }
    list() {
        return [...this.courses];
    }
}
// Демо
export function demoCourses() {
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
//# sourceMappingURL=courses.js.map