type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

type TimeSlot =
  | '8:00-9:35'
  | '9:45-11:20'
  | '11:45-13:20'
  | '13:30-15:05'
  | '15:15-16:50'
  | '17:00-18:35'
  | '18:45-20:20';

type CourseType = 'Lecture' | 'Seminar' | 'Lab' | 'Practice';

type Professor = {
  id: number;
  name: string;
  department: string;
};

type Classroom = {
  number: string;
  capacity: number;
  hasProjector: boolean;
};

type Course = {
  id: number;
  name: string;
  type: CourseType;
};

type Lesson = {
  courseId: number;
  professorId: number;
  classroomNumber: string;
  dayOfWeek: DayOfWeek;
  timeSlot: TimeSlot;
};

type ScheduleConflict = {
  lessonDetails: Lesson;
  type: 'ProfessorConflict' | 'ClassroomConflict';
};
