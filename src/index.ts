type lecturerType = {
  name: string;
  surname: string;
  position: string;
  company: string;
  experience: string;
  courses: string;
  contacts: string;
};

class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

  _areas: Area[] = [];
  _lecturers: lecturerType[] = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): typeof this._areas {
    return this._areas;
  }

  get lecturers(): typeof this._lecturers {
    return this._lecturers;
  }

  addArea(area: Area): void {
    this._areas.push(area);
  }

  removeArea(inputArea: Area): void {
    this._areas = this._areas.filter(area => area._name !== inputArea._name);
  }

  addLecturer(lecturer: lecturerType): void {
    this._lecturers.push(lecturer);
  }

  removeLecturer(inputLecturer: lecturerType): void {
    this._lecturers = this._lecturers.filter(lecturer => lecturer.name !== inputLecturer.name);
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  _levels: Level[] = [];
  _name: string;

  constructor(name: string) {
    this._name = name;
  }

  addLevel(level: Level): void {
    this._levels.push(level);
  }

  removeLevel(inputLevel: Level): void {
    this._levels = this._levels.filter(level => level._name !== inputLevel._name);
  }
}

class Level {
  // implement getters for fields and 'add/remove group' methods

  _groups: Group[] = [];
  _name: string;
  _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  addGroup(group: Group): void {
    this._groups.push(group);
  }

  removeGroup(inputGroup: Group): void {
    this._groups.filter(group => group.directionName !== inputGroup.directionName);
  }
}
class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  _area: Area;
  _status: boolean;
  _students: Student[] = []; // Modify the array so that it has a valid toSorted method*
  directionName: string;
  levelName: string;

  set status(status: boolean) {
    this.status = status;
  }

  constructor(directionName: string, levelName: string, area: Area, status: boolean) {
    this.directionName = directionName;
    this.levelName = levelName;
    this._area = area;
    this._status = status;
  }

  showPerformance(): object[] {
    const sortedStudents: object[] = this._students.toSorted(
      (a: Student, b: Student) => b.getPerformanceRating() - a.getPerformanceRating()
    );
    return sortedStudents;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(inputStudent: Student): void {
    this._students = this._students.filter(
      student =>
        `${student._firstName}${student._lastName}${student._birthYear}` !==
        `${inputStudent._firstName}${inputStudent._lastName}${inputStudent._birthYear}`
    );
  }
}

class Student {
  // implement 'set grade' and 'set visit' methods

  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: { workName: string; mark: number }[] = []; // workName: mark
  _visits: { lesson: string; present: boolean }[] = []; // lesson: present

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  set grade(grade: { workName: string; mark: number }) {
    this._grades.push(grade);
  }

  set visit(visit: { lesson: string; present: boolean }) {
    this._visits.push(visit);
  }

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  getPerformanceRating(): number {
    const gradeValues: number[] = Object.values(this._grades).map(grade => grade.mark);

    if (!gradeValues.length) return 0;

    const averageGrade: number =
      gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage: number = this._visits.length
      ? (this._visits.filter(visit => visit.present).length / this._visits.length) * 100
      : 0;
    return (averageGrade + attendancePercentage) / 2;
  }
}
