import Layout from "@/components/layout";
import { ATTENDANCE_API_DOMAIN } from "@/constants/axios-constant";
import { AttendanceSession } from "@/types/attendance-session.type";
import { Course } from "@/types/course.type";
import { SessionResult } from "@/types/session-result.type";
import { getAttendanceSessionStatus } from "@/utils/attendance-session-util";
import { formatTimeDisplay24Hours } from "@/utils/date-time-util";
import {
  ClockIcon,
  MapPinIcon,
  PencilIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { add, format, formatDistanceStrict, parse } from "date-fns";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SessionInfoAndResultPage = () => {
  const router = useRouter();
  const courseId = router.query.courseId;
  const sessionId = router.query.sessionId;

  const [countTime, setCountTime] = useState<number>(0);
  const [course, setCourse] = useState<Course>();
  const [attendanceSession, setAttendanceSession] =
    useState<AttendanceSession>();
  const [sessionResult, setSessionResult] = useState<SessionResult | null>(
    null
  );

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
    };

    if (courseId) fetchCourseData();
  }, [courseId]);

  useEffect(() => {
    const fetchAttendanceSessionData = async () => {
      const { data } = await axios.get<AttendanceSession>(
        `${ATTENDANCE_API_DOMAIN}/student/course/${courseId}/session/${sessionId}`,
        {
          headers: {
            authorization: `Bearer ${Cookies.get("student_access_token")}`,
          },
        }
      );
      setAttendanceSession(data);
    };

    if (courseId && sessionId) fetchAttendanceSessionData();
  }, [courseId, sessionId]);

  useEffect(() => {
    const fetchSessionResultData = async () => {
      const { data } = await axios.get<SessionResult>(
        `${ATTENDANCE_API_DOMAIN}/student/course/${courseId}/session/${sessionId}/result`,
        {
          headers: {
            authorization: `Bearer ${Cookies.get("student_access_token")}`,
          },
        }
      );
      console.log(data);
      setSessionResult(data);
    };

    if (courseId && sessionId) fetchSessionResultData();
  }, [courseId, sessionId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountTime(countTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countTime]);

  return (
    <>
      <Layout>
        {course && attendanceSession && (
          <>
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              Attendance session detail
            </h2>
            <div className="bg-white mt-3 p-4 rounded-lg shadow-lg border-t border-gray-200">
              <dl className="divide-y divide-gray-200">
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Course
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {course.course_code} ( {course.subject?.subject_code} -{" "}
                    {course.subject?.subject_name} )
                  </dd>
                </div>
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Session date
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {format(
                      parse(
                        attendanceSession.session_date,
                        "yyyy-MM-dd",
                        new Date()
                      ),
                      "dd MMMM yyyy"
                    )}
                  </dd>
                </div>
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Time
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    From{" "}
                    <span className="font-bold">
                      {formatTimeDisplay24Hours(
                        attendanceSession.start_hour,
                        attendanceSession.start_min
                      )}
                    </span>{" "}
                    to{" "}
                    <span className="font-bold">
                      {formatTimeDisplay24Hours(
                        attendanceSession.end_hour,
                        attendanceSession.end_min
                      )}
                    </span>
                  </dd>
                </div>
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Type
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    All students
                  </dd>
                </div>
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Description
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {attendanceSession.description}
                  </dd>
                </div>
              </dl>
            </div>

            <h2 className="text-xl font-bold tracking-tight text-gray-900 mt-5">
              Session result
            </h2>
            <div className="bg-white mt-3 p-4 rounded-lg shadow-lg border-t border-gray-200">
              <dl>
                <div className="p-2 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-semibold leading-6 text-gray-900">
                    <span className="flex items-center gap-x-2">
                      <ClockIcon className="h-5 w-5 text-white" />
                      Session status:
                    </span>
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-5 sm:mt-0">
                    <div className="flex items-center gap-x-3">
                      <span
                        className="rounded-full text-white px-3 py-0.5"
                        style={{
                          backgroundColor: getAttendanceSessionStatus(
                            attendanceSession,
                            new Date()
                          ).color,
                        }}
                      >
                        {
                          getAttendanceSessionStatus(
                            attendanceSession,
                            new Date()
                          ).status
                        }
                      </span>

                      {["Ongoing", "Overtime"].includes(
                        getAttendanceSessionStatus(
                          attendanceSession,
                          new Date()
                        ).status
                      ) && (
                        <span>
                          {formatDistanceStrict(
                            add(
                              parse(
                                `${attendanceSession.session_date} ${attendanceSession.end_hour}:${attendanceSession.end_min}:0`,
                                "yyyy-MM-dd H:m:s",
                                new Date()
                              ),
                              {
                                minutes:
                                  attendanceSession.overtime_minutes_for_late ??
                                  0,
                              }
                            ),
                            new Date()
                          )}{" "}
                          left.
                        </span>
                      )}
                    </div>
                  </dd>
                </div>
                <div className="p-2 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-semibold leading-6 text-gray-900">
                    <span className="flex items-center gap-x-2">
                      <ClockIcon className="h-5 w-5" />
                      Record time:
                    </span>
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-5 sm:mt-0">
                    {!sessionResult
                      ? "..."
                      : format(
                          new Date(sessionResult.record_time),
                          "dd MMMM yyyy HH:mm:ss"
                        )}
                  </dd>
                </div>
                <div className="p-2 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-semibold leading-6 text-gray-900">
                    <span className="flex items-center gap-x-2">
                      <TagIcon className="h-5 w-5" />
                      Attendance result:
                    </span>
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-5 sm:mt-0">
                    {!sessionResult?.attendanceStatus
                      ? "..."
                      : `${sessionResult.attendanceStatus.title} (${sessionResult.attendanceStatus.acronym})`}
                  </dd>
                </div>
                <div className="p-2 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-semibold leading-6 text-gray-900">
                    <span className="flex items-center gap-x-2">
                      <PencilIcon className="h-5 w-5" />
                      Record by:
                    </span>
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-5 sm:mt-0">
                    {!sessionResult
                      ? "..."
                      : sessionResult.record_by_teacher === 1
                      ? "Teacher"
                      : "You"}
                  </dd>
                </div>
                <div className="p-2 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-semibold leading-6 text-gray-900">
                    <span className="flex items-center gap-x-2">
                      <MapPinIcon className="h-5 w-5" />
                      IP address:
                    </span>
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-5 sm:mt-0">
                    {sessionResult?.ip_address ?? "..."}
                  </dd>
                </div>
              </dl>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default SessionInfoAndResultPage;
