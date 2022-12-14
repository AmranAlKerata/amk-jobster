import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import FormRowSelect from '../../components/FormRowSelect';
import { useEffect } from 'react';
import { clearValues, createJob, editJob, handleChange } from '../../features/job/jobSlice';
import { getUserFromLocalStorage } from '../../utils/localStorage';

const AddJob = () => {
  const dispatch = useDispatch()

  const { isLoading, position, company, jobLocation, jobType, jobTypeOptions, status, statusOptions, isEditing, editJobId } = useSelector(store => store.job)

  const { user } = useSelector(store => store.user);

  useEffect(() => {
    // eventually will check for isEditing
    if (!isEditing) {
      dispatch(handleChange({ name: 'jobLocation', value: user.location }));
    }
  }, [])




  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields")
      return;
    }
    if (isEditing) {
      // console.log(editJobId, { position, company, jobLocation, jobType, status })
      dispatch(
        editJob({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        })
      );
    }
    if (!isEditing) {
      dispatch(createJob({ position, company, jobLocation, jobType, status }));

    }
  }
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }))
  };

  return <Wrapper>
    <form className='form' onSubmit={handleSubmit}>
      <h3>{isEditing ? "edit job" : "add job"}</h3>
      <div className="form-center">
        <FormRow
          type='text'
          name='position'
          value={position}
          handleChange={handleJobInput}
        />
        {/* company */}
        <FormRow
          type='text'
          name='company'
          value={company}
          handleChange={handleJobInput}
        />
        {/* location */}
        <FormRow
          type='text'
          labelText='job location'
          name='jobLocation'
          value={jobLocation}
          handleChange={handleJobInput}
        />
        <FormRowSelect
          name='status'
          value={status}
          handleChange={handleJobInput}
          list={statusOptions}
        />

        <FormRowSelect
          name='jobType'
          labelText='job type'
          value={jobType}
          handleChange={handleJobInput}
          list={jobTypeOptions}
        />
        {/* btn container */}
        <div className='btn-container'>
          <button
            type='button'
            className='btn btn-block clear-btn'
            onClick={() => dispatch(clearValues())}
          >
            clear
          </button>
          <button
            type='submit'
            className='btn btn-block submit-btn'
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading button loading-center" />
            ) : isEditing ? "Edit Job" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  </Wrapper >;
};

export default AddJob;
