import Layout from "@/components/layout";
import { ATTENDANCE_API_DOMAIN } from "@/constants/axios-constant";
import { SessionResult } from "@/types/session-result.type";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import checklistImg from "../../../../../../public/checklist.svg";
import loadingImg from "../../../../../../public/loading.svg";
import { delay } from "@/utils/delay-util";
import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { classNames } from "@/utils/class-name-util";

const TakeRecordPage = () => {
  const router = useRouter();
  const courseId = router.query.courseId;
  const sessionId = router.query.sessionId;
  const token = router.query.token;

  // const [course, setCourse] = useState<Course>();
  // const [attendanceSession, setAttendanceSession] =
  //   useState<AttendanceSession>();
  const [sessionResult, setSessionResult] = useState<SessionResult>();
  const [processing, setProcessing] = useState<boolean>(false);
  const [processError, setProcessError] = useState<string>();

  const cancelButtonRef = useRef(null);

  // useEffect(() => {
  //   const fetchCourseData = async () => {
  //     const { data } = await axios.get<Course>(
  //       `${ATTENDANCE_API_DOMAIN}/student/course/${courseId}`,
  //       {
  //         headers: {
  //           authorization: `Bearer ${Cookies.get("student_access_token")}`,
  //         },
  //       }
  //     );
  //     setCourse(data);
  //   };

  //   if (courseId) fetchCourseData();
  // }, [courseId]);

  // useEffect(() => {
  //   const fetchAttendanceSessionData = async () => {
  //     const { data } = await axios.get<AttendanceSession>(
  //       `${ATTENDANCE_API_DOMAIN}/student/course/${courseId}/session/${sessionId}`,
  //       {
  //         headers: {
  //           authorization: `Bearer ${Cookies.get("student_access_token")}`,
  //         },
  //       }
  //     );
  //     setAttendanceSession(data);
  //   };

  //   if (courseId && sessionId) fetchAttendanceSessionData();
  // }, [courseId, sessionId]);

  useEffect(() => {
    const fetchSessionResultData = async () => {
      try {
        const { data } = await axios.get<SessionResult>(
          `${ATTENDANCE_API_DOMAIN}/student/course/${courseId}/session/${sessionId}/result`,
          {
            headers: {
              authorization: `Bearer ${Cookies.get("student_access_token")}`,
            },
          }
        );
        setSessionResult(data);
      } catch (error) {
        setSessionResult(undefined);
      }
    };

    if (courseId && sessionId) fetchSessionResultData();
  }, [courseId, sessionId]);

  const handleTakeRecord = async () => {
    setProcessing(true);
    await delay(2000);
    if (!token) {
      setProcessError("Tokens must be provided.");
      return;
    }

    let ipAddr: string;
    try {
      const { data } = await axios.get("https://geolocation-db.com/json/");
      ipAddr = data.IPv4;
    } catch (error) {
      setProcessError("Cannot detect your ip address. Please try again.");
      return;
    }

    if (!ipAddr) {
      setProcessError("Cannot detect your ip address. Please try again.");
      return;
    }

    try {
      const { data } = await axios.post<SessionResult>(
        `${ATTENDANCE_API_DOMAIN}/student/record-attendance-session`,
        { ipAddr },
        {
          headers: {
            authorization: `Bearer ${Cookies.get("student_access_token")}`,
            "qr-token": token,
          },
        }
      );

      setSessionResult(data);
    } catch (error) {
      setSessionResult(undefined);

      const { response } = error as AxiosError<{
        error: string;
        message: string;
        statusCode: number;
      }>;

      if (response?.status === 400) setProcessError(response.data.message);
    }
    setProcessing(false);
  };

  return (
    <>
      <Layout>
        {courseId && sessionId && (
          <div className="">
            {!sessionResult ? (
              <div className="flex flex-col justify-center items-center">
                <div
                  className={classNames(!processing ? "" : "hidden", "mt-6")}
                >
                  <button
                    type="button"
                    onClick={handleTakeRecord}
                    className="flex w-fit justify-center rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Take attendance session
                  </button>
                </div>
                <div
                  className={classNames(!processing ? "hidden" : "", "mt-6")}
                >
                  <Image
                    className="h-40 w-auto"
                    src={loadingImg}
                    alt="Data empty to display"
                  />
                </div>
                <div
                  className={classNames(
                    !processing ? "hidden" : "",
                    "text-gray-600 mt-4 text-base"
                  )}
                >
                  Processing, please wait...
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <div>
                  <Image
                    className="h-40 w-auto"
                    src={checklistImg}
                    alt="Data empty to display"
                  />
                </div>
                <div className="text-gray-600 mt-4 text-base">
                  You have completed this session.
                </div>
                <div className="mt-6">
                  <Link
                    href={`/course/${courseId}/session/${sessionId}`}
                    type="button"
                    className="flex w-fit justify-center rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    View result
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </Layout>

      <Transition.Root show={!!processError} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => setProcessError(undefined)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <XCircleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Processing fail!
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {processError}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => {
                        setProcessError(undefined);
                        router.push(`/course/${courseId}`);
                      }}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default TakeRecordPage;
