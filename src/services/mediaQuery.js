import { useMediaQuery } from "react-responsive";

const useMedia = () => {
  const isLargeSize = useMediaQuery({ minWidth: 1401 });
  const isMediumSize = useMediaQuery({ maxWidth: 1400, minWidth: 1101 });
  const isSmallSize = useMediaQuery({ maxWidth: 1100, minWidth: 801 });
  const isExtraSmallSize = useMediaQuery({ maxWidth: 800 });
  const isMediumOrLargeSize = useMediaQuery({ minWidth: 1101 });

  return {
    isLargeSize,
    isMediumSize,
    isSmallSize,
    isExtraSmallSize,
    isMediumOrLargeSize,
  }
}

export default useMedia;