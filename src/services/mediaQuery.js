import { useMediaQuery } from "react-responsive";

const useMedia = () => {
  const isExtraLargeSize = useMediaQuery({ minWidth: 1401 });
  const isLargeSize = useMediaQuery({ maxWidth: 1400, minWidth: 1201 });
  const isMediumSize = useMediaQuery({ maxWidth: 1200, minWidth: 801 });
  const isSmallSize = useMediaQuery({ maxWidth: 800 });
  const isGreaterLargeSize = useMediaQuery({ minWidth: 1201 });
  const isGreaterSmallSize = useMediaQuery({ minWidth: 801 });

  return {
    isExtraLargeSize,
    isLargeSize,
    isMediumSize,
    isSmallSize,
    isGreaterLargeSize,
    isGreaterSmallSize,
  }
}

export default useMedia;