import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import { addDays, format, isToday, startOfWeek } from "date-fns";
import { classNames } from "@/utils/class-name-util";
import { useEffect, useState } from "react";
import { CourseSchedule } from "@/types/course.type";
import {
  formatTimeDisplay,
  formatTimeDisplay24Hours,
} from "@/utils/date-time-util";
import axios from "axios";
import { ATTENDANCE_API_DOMAIN } from "@/constants/axios-constant";
import Cookies from "js-cookie";
import { ClockIcon, EyeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { SessionResult } from "@/types/session-result.type";
import { TagIcon } from "@heroicons/react/24/outline";
import { AttendanceSession } from "@/types/attendance-session.type";
import handsClapImg from "../../public/hands-clapping.svg";

const inter = Inter({ subsets: ["latin"] });

const getSchedulePosition = (schedule: CourseSchedule) => {
  if (schedule.day_of_week < 0 && schedule.day_of_week > 6) return "";

  const col = `col-start-[${schedule.day_of_week + 2}]`;

  const rowStart = `row-start-[${schedule.start_hour - 4}]`;

  const rowEnd = `row-end-[${schedule.end_hour - 4 + 1}]`;

  const marginTop = `mt-[${schedule.start_min}px]`;

  const marginBottom = `mb-[${60 - schedule.end_min}px]`;

  return `${rowStart} ${rowEnd} ${col} ${marginTop} ${marginBottom}`;
};

const Home = () => {
  const firstDayOfWeek = startOfWeek(new Date());
  const sunday = firstDayOfWeek;
  const monday = addDays(firstDayOfWeek, 1);
  const tuesday = addDays(firstDayOfWeek, 2);
  const wednesday = addDays(firstDayOfWeek, 3);
  const thursday = addDays(firstDayOfWeek, 4);
  const friday = addDays(firstDayOfWeek, 5);
  const saturday = addDays(firstDayOfWeek, 6);

  const [courseSchedules, setCourseSchedules] = useState<CourseSchedule[]>([]);
  const [recentHistory, setRecentHistory] = useState<SessionResult[]>([]);
  const [recentAbsences, setRecentAbsences] = useState<AttendanceSession[]>([]);

  useEffect(() => {
    const fetchListSchedule = async () => {
      const { data } = await axios.get(
        `${ATTENDANCE_API_DOMAIN}/student/schedule`,
        {
          headers: {
            authorization: `Bearer ${Cookies.get("student_access_token")}`,
          },
        }
      );
      setCourseSchedules(data);
    };

    fetchListSchedule();
  }, []);

  useEffect(() => {
    const fetchRecentHistory = async () => {
      const { data } = await axios.get(
        `${ATTENDANCE_API_DOMAIN}/student/recent-history`,
        {
          headers: {
            authorization: `Bearer ${Cookies.get("student_access_token")}`,
          },
        }
      );
      setRecentHistory(data);
    };

    fetchRecentHistory();
  }, []);

  useEffect(() => {
    const fetchRecentAbsences = async () => {
      const { data } = await axios.get(
        `${ATTENDANCE_API_DOMAIN}/student/recent-absent`,
        {
          headers: {
            authorization: `Bearer ${Cookies.get("student_access_token")}`,
          },
        }
      );
      setRecentAbsences(data);
    };

    fetchRecentAbsences();
  }, []);

  return (
    <>
      <Layout>
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          Weekly schedule ({format(sunday, "dd MMMM yyyy")} ~{" "}
          {format(saturday, "dd MMMM yyyy")})
        </h2>
        <div className="bg-white mt-3 rounded-lg shadow-xl overflow-hidden">
          <div className="overflow-auto grid grid-cols-[70px,repeat(7,150px)] lg:grid-cols-[70px,repeat(7,minmax(0px,_1fr))] grid-rows-[auto,repeat(18,60px)] max-h-[400px]">
            {/* <!-- Calendar frame --> */}
            <div className="row-start-[1] col-start-[1] sticky top-0 z-10 bg-slate-200 bg-clip-padding text-slate-900 text-sm font-medium py-2 text-center flex flex-col items-center justify-center gap-y-1">
              Time
            </div>
            <div className="row-start-[1] col-start-[2] sticky top-0 z-10 bg-slate-200 bg-clip-padding text-slate-900 text-sm font-medium py-2 text-center flex flex-col items-center justify-center gap-y-1">
              <span>Sunday</span>
              <div
                className={classNames(
                  isToday(sunday) ? "bg-blue-500" : "bg-slate-400",
                  "rounded-full h-6 w-6 text-white flex items-center justify-center"
                )}
              >
                <span>{format(sunday, "d")}</span>
              </div>
            </div>
            <div className="row-start-[1] col-start-[3] sticky top-0 z-10 bg-slate-200 bg-clip-padding text-slate-900 text-sm font-medium py-2 text-center flex flex-col items-center justify-center gap-y-1">
              <span>Monday</span>
              <div
                className={classNames(
                  isToday(monday) ? "bg-blue-500" : "bg-slate-400",
                  "rounded-full h-6 w-6 text-white flex items-center justify-center"
                )}
              >
                <span>{format(monday, "d")}</span>
              </div>
            </div>
            <div className="row-start-[1] col-start-[4] sticky top-0 z-10 bg-slate-200 bg-clip-padding text-slate-900 text-sm font-medium py-2 text-center flex flex-col items-center justify-center gap-y-1">
              <span>Tuesday</span>
              <div
                className={classNames(
                  isToday(tuesday) ? "bg-blue-500" : "bg-slate-400",
                  "rounded-full h-6 w-6 text-white flex items-center justify-center"
                )}
              >
                <span>{format(tuesday, "d")}</span>
              </div>
            </div>
            <div className="row-start-[1] col-start-[5] sticky top-0 z-10 bg-slate-200 bg-clip-padding text-slate-900 text-sm font-medium py-2 text-center flex flex-col items-center justify-center gap-y-1">
              <span>Wednesday</span>
              <div
                className={classNames(
                  isToday(wednesday) ? "bg-blue-500" : "bg-slate-400",
                  "rounded-full h-6 w-6 text-white flex items-center justify-center"
                )}
              >
                <span>{format(wednesday, "d")}</span>
              </div>
            </div>
            <div className="row-start-[1] col-start-[6] sticky top-0 z-10 bg-slate-200 bg-clip-padding text-slate-900 text-sm font-medium py-2 text-center flex flex-col items-center justify-center gap-y-1">
              <span>Thursday</span>
              <div
                className={classNames(
                  isToday(thursday) ? "bg-blue-500" : "bg-slate-400",
                  "rounded-full h-6 w-6 text-white flex items-center justify-center"
                )}
              >
                <span>{format(thursday, "d")}</span>
              </div>
            </div>
            <div className="row-start-[1] col-start-[7] sticky top-0 z-10 bg-slate-200 bg-clip-padding text-slate-900 text-sm font-medium py-2 text-center flex flex-col items-center justify-center gap-y-1">
              <span>Friday</span>
              <div
                className={classNames(
                  isToday(friday) ? "bg-blue-500" : "bg-slate-400",
                  "rounded-full h-6 w-6 text-white flex items-center justify-center"
                )}
              >
                <span>{format(friday, "d")}</span>
              </div>
            </div>
            <div className="row-start-[1] col-start-[8] sticky top-0 z-10 bg-slate-200 bg-clip-padding text-slate-900 text-sm font-medium py-2 text-center flex flex-col items-center justify-center gap-y-1">
              <span>Saturday</span>
              <div
                className={classNames(
                  isToday(saturday) ? "bg-blue-500" : "bg-slate-400",
                  "rounded-full h-6 w-6 text-white flex items-center justify-center"
                )}
              >
                <span>{format(saturday, "d")}</span>
              </div>
            </div>

            <div className="row-start-[2] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              06:00
            </div>
            <div className="row-start-[2] col-start-[2] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[2] col-start-[3] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[2] col-start-[4] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[2] col-start-[5] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[2] col-start-[6] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[2] col-start-[7] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[2] col-start-[8] border-dashed border-slate-200 border-b"></div>

            <div className="row-start-[3] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              07:00
            </div>
            <div className="row-start-[3] col-start-[2] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[3] col-start-[3] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[3] col-start-[4] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[3] col-start-[5] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[3] col-start-[6] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[3] col-start-[7] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[3] col-start-[8] border-dashed border-slate-200 border-b"></div>

            <div className="row-start-[4] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              08:00
            </div>
            <div className="row-start-[4] col-start-[2] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[4] col-start-[3] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[4] col-start-[4] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[4] col-start-[5] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[4] col-start-[6] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[4] col-start-[7] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[4] col-start-[8] border-dashed border-slate-200 border-b"></div>

            <div className="row-start-[5] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              09:00
            </div>
            <div className="row-start-[5] col-start-[2] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[5] col-start-[3] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[5] col-start-[4] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[5] col-start-[5] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[5] col-start-[6] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[5] col-start-[7] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[5] col-start-[8] border-dashed border-slate-200 border-b"></div>

            <div className="row-start-[6] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              10:00
            </div>
            <div className="row-start-[6] col-start-[2] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[6] col-start-[3] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[6] col-start-[4] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[6] col-start-[5] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[6] col-start-[6] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[6] col-start-[7] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[6] col-start-[8] border-dashed border-slate-200 border-b"></div>

            <div className="row-start-[7] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              11:00
            </div>
            <div className="row-start-[7] col-start-[2] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[7] col-start-[3] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[7] col-start-[4] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[7] col-start-[5] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[7] col-start-[6] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[7] col-start-[7] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[7] col-start-[8] border-dashed border-slate-200 border-b"></div>

            <div className="row-start-[8] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              12:00
            </div>
            <div className="row-start-[8] col-start-[2] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[8] col-start-[3] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[8] col-start-[4] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[8] col-start-[5] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[8] col-start-[6] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[8] col-start-[7] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[8] col-start-[8] border-dashed border-slate-200 border-b"></div>

            <div className="row-start-[9] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              13:00
            </div>
            <div className="row-start-[9] col-start-[2] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[9] col-start-[3] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[9] col-start-[4] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[9] col-start-[5] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[9] col-start-[6] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[9] col-start-[7] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[9] col-start-[8] border-dashed border-slate-200 border-b"></div>

            <div className="row-start-[10] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              14:00
            </div>
            <div className="row-start-[10] col-start-[2] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[10] col-start-[3] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[10] col-start-[4] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[10] col-start-[5] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[10] col-start-[6] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[10] col-start-[7] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[10] col-start-[8] border-dashed border-slate-200 border-b"></div>

            <div className="row-start-[11] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              15:00
            </div>
            <div className="row-start-[11] col-start-[2] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[11] col-start-[3] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[11] col-start-[4] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[11] col-start-[5] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[11] col-start-[6] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[11] col-start-[7] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[11] col-start-[8] border-dashed border-slate-200 border-b"></div>

            <div className="row-start-[12] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              16:00
            </div>
            <div className="row-start-[12] col-start-[2] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[12] col-start-[3] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[12] col-start-[4] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[12] col-start-[5] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[12] col-start-[6] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[12] col-start-[7] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[12] col-start-[8] border-dashed border-slate-200 border-b"></div>

            <div className="row-start-[13] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              17:00
            </div>
            <div className="row-start-[13] col-start-[2] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[13] col-start-[3] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[13] col-start-[4] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[13] col-start-[5] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[13] col-start-[6] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[13] col-start-[7] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[13] col-start-[8] border-dashed border-slate-200 border-b"></div>

            <div className="row-start-[14] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              18:00
            </div>
            <div className="row-start-[14] col-start-[2] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[14] col-start-[3] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[14] col-start-[4] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[14] col-start-[5] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[14] col-start-[6] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[14] col-start-[7] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[14] col-start-[8] border-dashed border-slate-200 border-b"></div>

            <div className="row-start-[15] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              19:00
            </div>
            <div className="row-start-[15] col-start-[2] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[15] col-start-[3] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[15] col-start-[4] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[15] col-start-[5] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[15] col-start-[6] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[15] col-start-[7] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[15] col-start-[8] border-dashed border-slate-200 border-b"></div>

            <div className="row-start-[16] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              20:00
            </div>
            <div className="row-start-[16] col-start-[2] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[16] col-start-[3] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[16] col-start-[4] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[16] col-start-[5] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[16] col-start-[6] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[16] col-start-[7] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[16] col-start-[8] border-dashed border-slate-200 border-b"></div>

            <div className="row-start-[17] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              21:00
            </div>
            <div className="row-start-[17] col-start-[2] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[17] col-start-[3] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[17] col-start-[4] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[17] col-start-[5] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[17] col-start-[6] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[17] col-start-[7] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[17] col-start-[8] border-dashed border-slate-200 border-b"></div>

            <div className="row-start-[18] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              22:00
            </div>
            <div className="row-start-[18] col-start-[2] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[18] col-start-[3] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[18] col-start-[4] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[18] col-start-[5] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[18] col-start-[6] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[18] col-start-[7] border-dashed border-slate-200 border-b border-r"></div>
            <div className="row-start-[18] col-start-[8] border-dashed border-slate-200 border-b"></div>

            <div className="row-start-[19] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              23:00
            </div>
            <div className="row-start-[19] col-start-[2] border-dashed border-slate-200 border-r"></div>
            <div className="row-start-[19] col-start-[3] border-dashed border-slate-200 border-r"></div>
            <div className="row-start-[19] col-start-[4] border-dashed border-slate-200 border-r"></div>
            <div className="row-start-[19] col-start-[5] border-dashed border-slate-200 border-r"></div>
            <div className="row-start-[19] col-start-[6] border-dashed border-slate-200 border-r"></div>
            <div className="row-start-[19] col-start-[7] border-dashed border-slate-200 border-r"></div>
            <div className="row-start-[19] col-start-[8]"></div>

            {/* <!-- Calendar contents --> */}
            <>
              {courseSchedules.map((schedule) => {
                return (
                  <div
                    key={schedule.id}
                    className="bg-red-100 border border-red-700/10 rounded-lg mx-1 p-1 flex flex-col"
                    style={{
                      gridRowStart: schedule.start_hour - 4,
                      gridRowEnd:
                        schedule.end_hour - (schedule.end_min > 0 ? 3 : 4),
                      gridColumnStart: schedule.day_of_week + 2,
                      marginTop:
                        schedule.start_min > 0
                          ? `${schedule.start_min}px`
                          : undefined,
                      marginBottom:
                        schedule.end_min > 0
                          ? `${60 - schedule.end_min}px`
                          : undefined,
                    }}
                  >
                    <span className="text-xs text-red-600">
                      {formatTimeDisplay24Hours(
                        schedule.start_hour,
                        schedule.start_min
                      )}{" "}
                      ~{" "}
                      {formatTimeDisplay24Hours(
                        schedule.end_hour,
                        schedule.end_min
                      )}
                    </span>
                    <span className="text-xs font-medium text-red-600">
                      {schedule.course?.subject?.subject_code} -{" "}
                      {schedule.course?.subject?.subject_name}
                    </span>
                  </div>
                );
              })}
            </>
          </div>
        </div>

        <div className="mt-8 text-gray-700 lg:grid lg:grid-cols-2 lg:gap-4 lg:px-0">
          <div className="shadow-lg text-sm lg:col-span-1">
            <div className="flex justify-between items-center bg-gray-200 w-full px-2 py-2 rounded-t-lg border-solid border bor">
              <div className="px-4 sm:px-0">
                <h3 className="text-xl font-semibold leading-7 text-gray-900">
                  Recent attendance history
                </h3>
              </div>
            </div>

            <div className="chart-group w-full h-[400px] bg-white p-4">
              <div className="overflow-auto h-full">
                <div className="px-1">
                  <ol className="border-l border-neutral-300">
                    {recentHistory.map((sessionResult) => (
                      <li key={sessionResult.attendanceSession?.id}>
                        <div className="flex-start flex items-center pt-3">
                          <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-blue-400"></div>
                          <span className="w-fit px-2 flex items-center gap-x-2 rounded-md text-sm text-blue-600 bg-blue-200">
                            <ClockIcon className="h-4 w-4" />
                            {format(
                              new Date(sessionResult.record_time),
                              "dd MMMM yyyy HH:mm:ss"
                            )}
                          </span>
                        </div>
                        <div className="mb-2 ml-4 mt-2 px-2 flex justify-between cursor-pointer rounded-md border-b border-slate-200 hover:bg-slate-200 hover:text-blue-400">
                          <div>
                            <Link
                              href={`/course/${sessionResult.attendanceSession?.course?.id}`}
                            >
                              <h3 className="mb-1.5 text-base font-normal hover:underline">
                                {
                                  sessionResult.attendanceSession?.course
                                    ?.course_code
                                }{" "}
                                -{" "}
                                {
                                  sessionResult.attendanceSession?.course
                                    ?.subject?.subject_code
                                }{" "}
                                -{" "}
                                {
                                  sessionResult.attendanceSession?.course
                                    ?.subject?.subject_name
                                }
                              </h3>
                            </Link>

                            <div className="flex items-center gap-x-2">
                              <dt className="text-sm font-semibold leading-6 text-gray-900">
                                <span className="flex items-center gap-x-2">
                                  <TagIcon className="h-5 w-5" />
                                  Result:
                                </span>
                              </dt>
                              <dd className="text-sm text-gray-700">
                                {!sessionResult?.attendanceStatus
                                  ? "..."
                                  : `${sessionResult.attendanceStatus.title} (${sessionResult.attendanceStatus.acronym})`}
                              </dd>
                            </div>
                          </div>

                          <div className="flex justify-center items-center">
                            <Link
                              href={`/course/${sessionResult.attendanceSession?.course?.id}/session/${sessionResult.attendanceSession?.id}`}
                              type="button"
                              className="flex items-center justify-center gap-x-2 rounded-lg bg-green-500 px-3 py-0.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline-none hover:bg-green-600"
                            >
                              <EyeIcon className="w-4" /> Detail
                            </Link>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-1 shadow-lg text-sm lg:col-span-1 lg:mt-0">
            <div className="flex justify-between items-center bg-gray-200 w-full px-2 py-2 rounded-t-lg border-solid border bor">
              <div className="px-4 sm:px-0">
                <h3 className="text-xl font-semibold leading-7 text-gray-900">
                  Recent absences
                </h3>
              </div>
            </div>

            <div className="chart-group w-full h-[400px] bg-white p-4">
              {recentAbsences.length === 0 && (
                <div className="w-full h-full flex flex-col gap-y-4 justify-center items-center">
                  <div className="w-32">
                    <Image
                      className="h-auto w-auto"
                      src={handsClapImg}
                      alt="Hands clapping"
                    />
                  </div>
                  <span>{`You don't miss any attendance sessions.`}</span>
                </div>
              )}

              {recentAbsences.length > 0 && (
                <div className="overflow-y-auto h-full">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Session
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Course
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Detail
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentAbsences.map((session) => (
                        <tr
                          key={session.id}
                          className="bg-white border-b hover:bg-gray-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              {format(
                                new Date(session.session_date),
                                "dd MMMM yyyy"
                              )}
                            </div>
                            <div>
                              {`${formatTimeDisplay24Hours(
                                session.start_hour,
                                session.start_min
                              )} - ${formatTimeDisplay24Hours(
                                session.end_hour,
                                session.end_min
                              )}`}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              {session.course?.subject?.subject_code} -{" "}
                              {session.course?.subject?.subject_name}
                            </div>
                            <div>
                              Course code: {session.course?.course_code}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Link
                                href={`/course/${session.course?.id}/session/${session.id}`}
                                className="font-medium text-gray-600"
                              >
                                <div className="w-5 mr-1">
                                  <EyeIcon />
                                </div>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
