import Layout from "@/components/layout";
import { ATTENDANCE_API_DOMAIN } from "@/constants/axios-constant";
import { Course, CourseSchedule } from "@/types/course.type";
import { classNames } from "@/utils/class-name-util";
import { formatTimeDisplay } from "@/utils/date-time-util";
import {
  CalendarDaysIcon,
  ClockIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { format } from "date-fns";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CourseDetailPage = () => {
  const router = useRouter();
  const courseId = router.query.courseId;

  const [course, setCourse] = useState<Course>();
  const [schedulesByDayOfWeek, setSchedulesByDayOfWeek] = useState<
    { dayOfWeek: string; schedules: CourseSchedule[] }[]
  >([]);
  const [showCourseInfo, setShowCourseInfo] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      const { data } = await axios.get<Course>(
        `${ATTENDANCE_API_DOMAIN}/student/course/${courseId}`,
        {
          headers: {
            authorization: `Bearer ${Cookies.get("student_access_token")}`,
          },
        }
      );
      setCourse(data);
      const schedules = data.courseSchedules;
      if (schedules) {
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];

        const tmpSchedulesDayOfWeek: {
          dayOfWeek: string;
          schedules: CourseSchedule[];
        }[] = [];
        days.forEach((dayOfWeek, idx) => {
          const dayOfWeekSchedules = schedules.filter(
            (schedule) => schedule.day_of_week == idx
          );
          if (dayOfWeekSchedules.length > 0) {
            tmpSchedulesDayOfWeek.push({
              dayOfWeek,
              schedules: dayOfWeekSchedules,
            });
          }
        });
        setSchedulesByDayOfWeek(tmpSchedulesDayOfWeek);
      }
    };

    if (courseId) fetchCourseData();
  }, [courseId]);

  return (
    <>
      {course && (
        <Layout>
          <div className="bg-white shadow-lg rounded-lg my-2 p-4">
            <div>
              <div className="flex items-center gap-x-5">
                <h2 className="text-xl font-bold tracking-tight text-gray-900">
                  Course information
                </h2>
                <button
                  type="button"
                  onClick={(e) => {
                    setShowCourseInfo(!showCourseInfo);
                  }}
                  className="flex items-center justify-center gap-x-2 rounded-lg bg-gray-400 px-3 py-0.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline-none"
                >
                  {!showCourseInfo ? (
                    <EyeIcon className="w-4" />
                  ) : (
                    <EyeSlashIcon className="w-4" />
                  )}
                  {!showCourseInfo ? "Show" : "Hidden"}
                </button>
              </div>

              <div
                className={classNames(
                  !showCourseInfo ? "hidden ease-in" : "ease-out",
                  "mt-6 border-t border-gray-100 transition duration-150"
                )}
              >
                <dl className="divide-y divide-gray-200">
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Course
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {course.course_code} ~ Subject:{" "}
                      {course.subject?.subject_code} -{" "}
                      {course.subject?.subject_name}
                    </dd>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Teacher
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {course.teacher?.last_name} {course.teacher?.first_name}
                    </dd>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Time
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {format(new Date(course.start_date), "dd MMMM yyyy")} ~{" "}
                      {format(new Date(course.end_date), "dd MMMM yyyy")}
                    </dd>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Schedules
                    </dt>
                    <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {schedulesByDayOfWeek.map((dayOfWeek) => (
                        <div key={dayOfWeek.dayOfWeek}>
                          <span className="w-full px-2 flex items-center gap-x-2 rounded-md font-medium text-blue-600 bg-blue-200">
                            <CalendarDaysIcon className="h-5 w-5" />
                            {dayOfWeek.dayOfWeek}
                          </span>
                          <div className="my-2 px-6">
                            <ol className="border-l border-neutral-300 dark:border-neutral-500">
                              {dayOfWeek.schedules.map((schedule) => (
                                <li key={schedule.id}>
                                  <div className="flex-start flex items-center">
                                    <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-blue-400"></div>
                                    <span className="ml-3 flex items-center gap-x-2">
                                      <ClockIcon className="h-5 w-5 text-black" />
                                      {formatTimeDisplay(
                                        schedule.start_hour,
                                        schedule.start_min
                                      )}{" "}
                                      -{" "}
                                      {formatTimeDisplay(
                                        schedule.end_hour,
                                        schedule.end_min
                                      )}
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Description
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {course.description}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default CourseDetailPage;
