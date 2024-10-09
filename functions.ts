function addProfessor(professor: Professor): void {
  professors.push(professor);
}

function addLesson(lesson: Lesson): boolean {
  const conflict: ScheduleConflict | null = validateLesson(lesson);
  if (!conflict) {
    schedule.push(lesson);
    return true;
  }

  return false;
}

function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
  const occupiedClassroomNumbers: string[] = [];
  const classroomNumbers: string[] = getClassroomNumbers(classrooms);
  schedule.forEach((lesson) => {
    if (lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek) {
      occupiedClassroomNumbers.push(lesson.classroomNumber);
    }
  });
  return classroomNumbers.filter((element) => !occupiedClassroomNumbers.includes(element));
}

function getClassroomNumbers(classrooms: Classroom[]): string[] {
  return classrooms.map((classroom) => classroom.number);
}

function validateLesson(lesson: Lesson): ScheduleConflict | null {
  const professorSchedule: Lesson[] = getProfessorSchedule(lesson.professorId);

  for (const element of professorSchedule) {
    if (element.dayOfWeek === lesson.dayOfWeek && element.timeSlot === lesson.timeSlot) {
      return { lessonDetails: lesson, type: 'ProfessorConflict' };
    }
  }

  for (const element of schedule) {
    if (
      element.dayOfWeek === lesson.dayOfWeek &&
      element.timeSlot === lesson.timeSlot &&
      element.classroomNumber === lesson.classroomNumber
    ) {
      return { lessonDetails: lesson, type: 'ClassroomConflict' };
    }
  }

  return null;
}

function getClassroomUtilization(classroomNumber: string): number {
  // we suppose that current schedule is validated and no classroom conflicts are present
  const classroomUsageCount = schedule.filter((lesson) => lesson.classroomNumber === classroomNumber).length;
  return (classroomUsageCount / maxWeeklyClassroomLessons) * 100;
}

function getMostPopularCourseType(): CourseType {
  const courseMap = new Map<CourseType, number>([
    ['Lab', 0],
    ['Lecture', 0],
    ['Practice', 0],
    ['Seminar', 0],
  ]);

  courses.forEach((course) => {
    const currentCount = courseMap.get(course.type) || 0;
    courseMap.set(course.type, currentCount + 1);
  });

  let mostPopularCourseType: CourseType = 'Lab';
  let maxCount = 0;

  courseMap.forEach((count, courseType) => {
    if (count > maxCount) {
      maxCount = count;
      mostPopularCourseType = courseType;
    }
  });

  return mostPopularCourseType;
}

// changed from lessonId to Lesson because type Lesson does not have ID property
function reassignClassroom(lesson: Lesson, newClassroomNumber: string): boolean {
  const newLesson: Lesson = lesson;
  newLesson.classroomNumber = newClassroomNumber;
  const conflict: ScheduleConflict | null = validateLesson(newLesson);
  if (conflict) {
    return false;
  }
  lesson.classroomNumber = newClassroomNumber;
  return true;
}

// changed from lessonId to Lesson because type Lesson does not have ID property
function cancelLesson(lesson: Lesson): void {
  const index: number = schedule.findIndex((element) => element === lesson);

  if (index !== -1) {
    schedule.splice(index, 1);
  }
}

// helpers
function getProfessorSchedule(professorId: number): Lesson[] {
  return schedule.filter((lesson) => lesson.professorId === professorId);
}
