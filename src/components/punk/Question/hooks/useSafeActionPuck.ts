import { useGetPuck } from '@measured/puck';

const useSafeActionPuck = () => {
  try {
    const getPuck = useGetPuck();
    return getPuck;
  } catch (error) {
    return undefined;
  }
};

export default useSafeActionPuck;