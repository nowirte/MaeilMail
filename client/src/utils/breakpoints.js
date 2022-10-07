import useMediaQuery from '../hooks/useMediaQuery';

export default function useBreakpoints() {
  const breakpoints = {
    isMobile: useMediaQuery('(max-width: 699px)'),
    isLaptop: useMediaQuery('(min-width: 700px) and (max-width: 1499px)'),
    isPC: useMediaQuery('(min-width: 1500px)'),
    // active: '',
  };
  // if (breakpoints.isMobile) breakpoints.active = 'mobile';
  // if (breakpoints.isLaptop) breakpoints.active = 'laptop';
  // if (breakpoints.isPC) breakpoints.active = 'pc';

  return breakpoints;
}
