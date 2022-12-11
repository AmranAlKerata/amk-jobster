import { useEffect } from 'react';
import { StatsContainer, ChartsContainer } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { showStatus } from '../../features/allJobs/allJobsSlice';
const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showStatus());
  }, []);
  if (isLoading) {
    return <div className="loading  loading-center" />
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;