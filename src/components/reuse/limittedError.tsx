"use client";

import { TiWarning } from "react-icons/ti";
import { useTranslations } from "next-intl";

/** Error UI for exceeding API usage limits */

export default function LimittedError({
  isError,
  setIsError,
}: {
  isError: string | null;
  setIsError: any;
}) {
  const m = useTranslations("main");
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div>
        <div className="w-full h-20 bg-[#E2E8F0] dark:bg-[#1D1D1D] flex items-center justify-center rounded-t-xl">
          <TiWarning className="text-black dark:text-white w-[50px] h-[50px]" />
        </div>
        <hr className="border-white dark:border-[#5F5F5F] border-[0.5px]" />
        {/* Box */}
        <div
          className="bg-white dark:bg-[#1D1D1D] p-8 rounded-b-xl shadow-lg z-60 w-[450px] max-sm:w-[350px]"
          onClick={(e) => e.stopPropagation()} // 팝업 내부 클릭은 닫히지 않게
        >
          <h1 className="text-2xl font-bold text-black dark:text-white ">
            {m(isError)}
          </h1>

          <p className="text-black dark:text-white text-base mt-8 font-light max-sm:text-xs  max-sm:mt-5">
            {m(`${isError} Content`)}
          </p>
          <button
            className="mt-[40px] mb-1 px-4 py-[13px] bg-[#16A348] text-white rounded w-full 
             transform transition-transform duration-200 hover:scale-[103%]  max-sm:mt-[20px]  max-sm:py-[9px]  max-sm:text-sm"
             onClick={() => 
             {
              setIsError(false);
             }
             }
          >
            {m("gotit")}
          </button>
        </div>
      </div>
    </div>
  );
}
