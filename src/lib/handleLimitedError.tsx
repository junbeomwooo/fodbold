export default function handleLimitedError({
  error,
  ref,
  setIsError,
}: {
  error: any;
  ref?: any;
  setIsError: any;
}) {
  if (!ref) {
    // ref 파일 없이 에러만 보여주고싶을때
    if (error?.rateLimit) {
      setIsError("Too Many Requests");
    } else if (error?.requests) {
      setIsError("API Limit Reached");
    }
    console.error("Error fetching data:", error);
  } else if (!ref?.current) {
    // ref가 존재하며 에러 보여주고싶을때
    if (error?.rateLimit) {
      setIsError("Too Many Requests");
    } else if (error?.requests) {
      setIsError("API Limit Reached");
    }
    ref.current = true;
    console.error("Error fetching data:", error);
  }
}
