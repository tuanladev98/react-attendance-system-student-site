import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import { addDays, format, isToday, startOfWeek } from "date-fns";
import { classNames } from "@/utils/class-name-util";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const firstDayOfWeek = startOfWeek(new Date());
  const sunday = firstDayOfWeek;
  const monday = addDays(firstDayOfWeek, 1);
  const tuesday = addDays(firstDayOfWeek, 2);
  const wednesday = addDays(firstDayOfWeek, 3);
  const thursday = addDays(firstDayOfWeek, 4);
  const friday = addDays(firstDayOfWeek, 5);
  const saturday = addDays(firstDayOfWeek, 6);

  return (
    <>
      <Layout>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
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
            <div className="row-start-[2] col-start-[2] border-slate-200 border-b border-r"></div>
            <div className="row-start-[2] col-start-[3] border-slate-200 border-b border-r"></div>
            <div className="row-start-[2] col-start-[4] border-slate-200 border-b border-r"></div>
            <div className="row-start-[2] col-start-[5] border-slate-200 border-b border-r"></div>
            <div className="row-start-[2] col-start-[6] border-slate-200 border-b border-r"></div>
            <div className="row-start-[2] col-start-[7] border-slate-200 border-b border-r"></div>
            <div className="row-start-[2] col-start-[8] border-slate-200 border-b"></div>

            <div className="row-start-[3] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              07:00
            </div>
            <div className="row-start-[3] col-start-[2] border-slate-200 border-b border-r"></div>
            <div className="row-start-[3] col-start-[3] border-slate-200 border-b border-r"></div>
            <div className="row-start-[3] col-start-[4] border-slate-200 border-b border-r"></div>
            <div className="row-start-[3] col-start-[5] border-slate-200 border-b border-r"></div>
            <div className="row-start-[3] col-start-[6] border-slate-200 border-b border-r"></div>
            <div className="row-start-[3] col-start-[7] border-slate-200 border-b border-r"></div>
            <div className="row-start-[3] col-start-[8] border-slate-200 border-b"></div>

            <div className="row-start-[4] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              08:00
            </div>
            <div className="row-start-[4] col-start-[2] border-slate-200 border-b border-r"></div>
            <div className="row-start-[4] col-start-[3] border-slate-200 border-b border-r"></div>
            <div className="row-start-[4] col-start-[4] border-slate-200 border-b border-r"></div>
            <div className="row-start-[4] col-start-[5] border-slate-200 border-b border-r"></div>
            <div className="row-start-[4] col-start-[6] border-slate-200 border-b border-r"></div>
            <div className="row-start-[4] col-start-[7] border-slate-200 border-b border-r"></div>
            <div className="row-start-[4] col-start-[8] border-slate-200 border-b"></div>

            <div className="row-start-[5] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              09:00
            </div>
            <div className="row-start-[5] col-start-[2] border-slate-200 border-b border-r"></div>
            <div className="row-start-[5] col-start-[3] border-slate-200 border-b border-r"></div>
            <div className="row-start-[5] col-start-[4] border-slate-200 border-b border-r"></div>
            <div className="row-start-[5] col-start-[5] border-slate-200 border-b border-r"></div>
            <div className="row-start-[5] col-start-[6] border-slate-200 border-b border-r"></div>
            <div className="row-start-[5] col-start-[7] border-slate-200 border-b border-r"></div>
            <div className="row-start-[5] col-start-[8] border-slate-200 border-b"></div>

            <div className="row-start-[6] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              10:00
            </div>
            <div className="row-start-[6] col-start-[2] border-slate-200 border-b border-r"></div>
            <div className="row-start-[6] col-start-[3] border-slate-200 border-b border-r"></div>
            <div className="row-start-[6] col-start-[4] border-slate-200 border-b border-r"></div>
            <div className="row-start-[6] col-start-[5] border-slate-200 border-b border-r"></div>
            <div className="row-start-[6] col-start-[6] border-slate-200 border-b border-r"></div>
            <div className="row-start-[6] col-start-[7] border-slate-200 border-b border-r"></div>
            <div className="row-start-[6] col-start-[8] border-slate-200 border-b"></div>

            <div className="row-start-[7] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              11:00
            </div>
            <div className="row-start-[7] col-start-[2] border-slate-200 border-b border-r"></div>
            <div className="row-start-[7] col-start-[3] border-slate-200 border-b border-r"></div>
            <div className="row-start-[7] col-start-[4] border-slate-200 border-b border-r"></div>
            <div className="row-start-[7] col-start-[5] border-slate-200 border-b border-r"></div>
            <div className="row-start-[7] col-start-[6] border-slate-200 border-b border-r"></div>
            <div className="row-start-[7] col-start-[7] border-slate-200 border-b border-r"></div>
            <div className="row-start-[7] col-start-[8] border-slate-200 border-b"></div>

            <div className="row-start-[8] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              12:00
            </div>
            <div className="row-start-[8] col-start-[2] border-slate-200 border-b border-r"></div>
            <div className="row-start-[8] col-start-[3] border-slate-200 border-b border-r"></div>
            <div className="row-start-[8] col-start-[4] border-slate-200 border-b border-r"></div>
            <div className="row-start-[8] col-start-[5] border-slate-200 border-b border-r"></div>
            <div className="row-start-[8] col-start-[6] border-slate-200 border-b border-r"></div>
            <div className="row-start-[8] col-start-[7] border-slate-200 border-b border-r"></div>
            <div className="row-start-[8] col-start-[8] border-slate-200 border-b"></div>

            <div className="row-start-[9] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              13:00
            </div>
            <div className="row-start-[9] col-start-[2] border-slate-200 border-b border-r"></div>
            <div className="row-start-[9] col-start-[3] border-slate-200 border-b border-r"></div>
            <div className="row-start-[9] col-start-[4] border-slate-200 border-b border-r"></div>
            <div className="row-start-[9] col-start-[5] border-slate-200 border-b border-r"></div>
            <div className="row-start-[9] col-start-[6] border-slate-200 border-b border-r"></div>
            <div className="row-start-[9] col-start-[7] border-slate-200 border-b border-r"></div>
            <div className="row-start-[9] col-start-[8] border-slate-200 border-b"></div>

            <div className="row-start-[10] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              14:00
            </div>
            <div className="row-start-[10] col-start-[2] border-slate-200 border-b border-r"></div>
            <div className="row-start-[10] col-start-[3] border-slate-200 border-b border-r"></div>
            <div className="row-start-[10] col-start-[4] border-slate-200 border-b border-r"></div>
            <div className="row-start-[10] col-start-[5] border-slate-200 border-b border-r"></div>
            <div className="row-start-[10] col-start-[6] border-slate-200 border-b border-r"></div>
            <div className="row-start-[10] col-start-[7] border-slate-200 border-b border-r"></div>
            <div className="row-start-[10] col-start-[8] border-slate-200 border-b"></div>

            <div className="row-start-[11] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              15:00
            </div>
            <div className="row-start-[11] col-start-[2] border-slate-200 border-b border-r"></div>
            <div className="row-start-[11] col-start-[3] border-slate-200 border-b border-r"></div>
            <div className="row-start-[11] col-start-[4] border-slate-200 border-b border-r"></div>
            <div className="row-start-[11] col-start-[5] border-slate-200 border-b border-r"></div>
            <div className="row-start-[11] col-start-[6] border-slate-200 border-b border-r"></div>
            <div className="row-start-[11] col-start-[7] border-slate-200 border-b border-r"></div>
            <div className="row-start-[11] col-start-[8] border-slate-200 border-b"></div>

            <div className="row-start-[12] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              16:00
            </div>
            <div className="row-start-[12] col-start-[2] border-slate-200 border-b border-r"></div>
            <div className="row-start-[12] col-start-[3] border-slate-200 border-b border-r"></div>
            <div className="row-start-[12] col-start-[4] border-slate-200 border-b border-r"></div>
            <div className="row-start-[12] col-start-[5] border-slate-200 border-b border-r"></div>
            <div className="row-start-[12] col-start-[6] border-slate-200 border-b border-r"></div>
            <div className="row-start-[12] col-start-[7] border-slate-200 border-b border-r"></div>
            <div className="row-start-[12] col-start-[8] border-slate-200 border-b"></div>

            <div className="row-start-[13] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              17:00
            </div>
            <div className="row-start-[13] col-start-[2] border-slate-200 border-b border-r"></div>
            <div className="row-start-[13] col-start-[3] border-slate-200 border-b border-r"></div>
            <div className="row-start-[13] col-start-[4] border-slate-200 border-b border-r"></div>
            <div className="row-start-[13] col-start-[5] border-slate-200 border-b border-r"></div>
            <div className="row-start-[13] col-start-[6] border-slate-200 border-b border-r"></div>
            <div className="row-start-[13] col-start-[7] border-slate-200 border-b border-r"></div>
            <div className="row-start-[13] col-start-[8] border-slate-200 border-b"></div>

            <div className="row-start-[14] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              18:00
            </div>
            <div className="row-start-[14] col-start-[2] border-slate-200 border-b border-r"></div>
            <div className="row-start-[14] col-start-[3] border-slate-200 border-b border-r"></div>
            <div className="row-start-[14] col-start-[4] border-slate-200 border-b border-r"></div>
            <div className="row-start-[14] col-start-[5] border-slate-200 border-b border-r"></div>
            <div className="row-start-[14] col-start-[6] border-slate-200 border-b border-r"></div>
            <div className="row-start-[14] col-start-[7] border-slate-200 border-b border-r"></div>
            <div className="row-start-[14] col-start-[8] border-slate-200 border-b"></div>

            <div className="row-start-[15] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              19:00
            </div>
            <div className="row-start-[15] col-start-[2] border-slate-200 border-b border-r"></div>
            <div className="row-start-[15] col-start-[3] border-slate-200 border-b border-r"></div>
            <div className="row-start-[15] col-start-[4] border-slate-200 border-b border-r"></div>
            <div className="row-start-[15] col-start-[5] border-slate-200 border-b border-r"></div>
            <div className="row-start-[15] col-start-[6] border-slate-200 border-b border-r"></div>
            <div className="row-start-[15] col-start-[7] border-slate-200 border-b border-r"></div>
            <div className="row-start-[15] col-start-[8] border-slate-200 border-b"></div>

            <div className="row-start-[16] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              20:00
            </div>
            <div className="row-start-[16] col-start-[2] border-slate-200 border-b border-r"></div>
            <div className="row-start-[16] col-start-[3] border-slate-200 border-b border-r"></div>
            <div className="row-start-[16] col-start-[4] border-slate-200 border-b border-r"></div>
            <div className="row-start-[16] col-start-[5] border-slate-200 border-b border-r"></div>
            <div className="row-start-[16] col-start-[6] border-slate-200 border-b border-r"></div>
            <div className="row-start-[16] col-start-[7] border-slate-200 border-b border-r"></div>
            <div className="row-start-[16] col-start-[8] border-slate-200 border-b"></div>

            <div className="row-start-[17] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              21:00
            </div>
            <div className="row-start-[17] col-start-[2] border-slate-200 border-b border-r"></div>
            <div className="row-start-[17] col-start-[3] border-slate-200 border-b border-r"></div>
            <div className="row-start-[17] col-start-[4] border-slate-200 border-b border-r"></div>
            <div className="row-start-[17] col-start-[5] border-slate-200 border-b border-r"></div>
            <div className="row-start-[17] col-start-[6] border-slate-200 border-b border-r"></div>
            <div className="row-start-[17] col-start-[7] border-slate-200 border-b border-r"></div>
            <div className="row-start-[17] col-start-[8] border-slate-200 border-b"></div>

            <div className="row-start-[18] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              22:00
            </div>
            <div className="row-start-[18] col-start-[2] border-slate-200 border-b border-r"></div>
            <div className="row-start-[18] col-start-[3] border-slate-200 border-b border-r"></div>
            <div className="row-start-[18] col-start-[4] border-slate-200 border-b border-r"></div>
            <div className="row-start-[18] col-start-[5] border-slate-200 border-b border-r"></div>
            <div className="row-start-[18] col-start-[6] border-slate-200 border-b border-r"></div>
            <div className="row-start-[18] col-start-[7] border-slate-200 border-b border-r"></div>
            <div className="row-start-[18] col-start-[8] border-slate-200 border-b"></div>

            <div className="row-start-[19] col-start-[1] bg-slate-100 border-slate-200 border-r text-xs p-1.5 text-center text-slate-900 uppercase sticky left-0 font-medium">
              23:00
            </div>
            <div className="row-start-[19] col-start-[2] border-slate-200 border-r"></div>
            <div className="row-start-[19] col-start-[3] border-slate-200 border-r"></div>
            <div className="row-start-[19] col-start-[4] border-slate-200 border-r"></div>
            <div className="row-start-[19] col-start-[5] border-slate-200 border-r"></div>
            <div className="row-start-[19] col-start-[6] border-slate-200 border-r"></div>
            <div className="row-start-[19] col-start-[7] border-slate-200 border-r"></div>
            <div className="row-start-[19] col-start-[8]"></div>

            {/* <!-- Calendar contents --> */}
            <div className="row-start-[2] row-end-[5] col-start-[3] mt-[30px] mb-[45px] bg-red-100 border border-red-700/10 rounded-lg mx-1 p-1 flex flex-col">
              <span className="text-xs text-red-600">06:30 ~ 08:15</span>
              <span className="text-xs font-medium text-red-600">
                IT4996 - ĐATN
              </span>
            </div>

            <div className="row-start-[4] row-end-[7] col-start-[3] mt-[30px] mb-[30px] bg-red-100 border border-red-700/10 rounded-lg mx-1 p-1 flex flex-col">
              <span className="text-xs text-red-600">08:30 ~ 10:30</span>
              <span className="text-xs font-medium text-red-600">
                IT4996 - ĐATN
              </span>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
