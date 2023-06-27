import Layout from "@/components/layout";
import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import courseImg from "../../../public/course-img.jpg";
import emptyDataImg from "../../../public/empty_data_icon.svg";
import { useEffect, useState } from "react";
import { Course } from "@/types/course.type";
import axios from "axios";
import { ATTENDANCE_API_DOMAIN } from "@/constants/axios-constant";
import Cookies from "js-cookie";

const CoursePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchListCourse = async () => {
      const { data } = await axios.get(
        `${ATTENDANCE_API_DOMAIN}/student/course`,
        {
          headers: {
            authorization: `Bearer ${Cookies.get("student_access_token")}`,
          },
        }
      );
      setCourses(data);
    };

    fetchListCourse();
  }, []);

  return (
    <>
      <Layout>
        <div className="">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            List courses
          </h2>

          {!courses || courses.length < 1 ? (
            <div className="mx-auto mt-20 w-full h-30 flex justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <div>
                  <Image
                    className="h-auto w-auto"
                    src={emptyDataImg}
                    alt="Data empty to display"
                  />
                </div>
                <div className="text-sm text-gray-500">
                  No courses found to display.
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {courses.map((course) => (
                <div key={course.id} className="group relative">
                  <div className="bg-white w-full border-solid border rounded-lg">
                    <div className="aspect-h-1 aspect-w-2 w-full overflow-hidden rounded-t-lg bg-gray-200">
                      <Image
                        src={courseImg}
                        alt={`${course.subject?.subject_code} - ${course.course_code}`}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <div className="my-1 px-2 flex justify-between">
                      <div>
                        <h3 className="text-base text-blue-500">
                          <Link href={`/course/${course.id}`}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {course.subject?.subject_name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {`${course.subject?.subject_code} - ${course.course_code}`}
                        </p>
                        <div className="mt-1 text-sm text-gray-500 flex gap-x-2">
                          <span className="text-gray-900">Teacher:</span>
                          <p>
                            {course.teacher?.last_name}{" "}
                            {course.teacher?.first_name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default CoursePage;
