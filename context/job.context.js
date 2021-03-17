import { createContext, useState } from 'react';



export const JobContext = createContext();

const JobContextProvider = (props) => {
    const [jobs, setJobs] = useState({
        alljobs: [],
        currentPage: 1,
        total: 0,
        cachedJobs: [],
        sort: {},
        data_before_search_filter : []
    });

    const [jobApiState, setJobApiState] = useState({
        loading: false,
        last_valid_url: "",
        search_params : null
    });

    const addJobList = (jobList = []) => {
        setJobs({ ...jobs, alljobs: [...jobs.alljobs, ...jobList] });
    };

    const addJob = (single_job = {}) => {
        setJobs({ ...jobs, alljobs: [...jobs.alljobs, single_job] });
    };

    const resetJobListForSearchedData = (joblist, searchparams = null, data_before_search_filter = []) => {
        setJobs({
            data_before_search_filter :searchparams ? data_before_search_filter : [],
            alljobs: joblist,
            currentPage: 1,
            total: joblist.length,
            cachedJobs: jobs.alljobs,

        });
        setJobApiState({loading : false, last_valid_url : "", search_params : searchparams})
    };


    const clearSearchedData = () => {
        setJobs({
            alljobs: jobs.cachedJobs,
            currentPage: 1,
            total: jobs.cachedJobs.length,
            cachedJobs: [],
            data_before_search_filter : [],
            sort : {}
        });
    };

    const setSort = (key, value) => {
        setJobs({
            ...jobs, sort: { [key]: value }
        });
    };

    const removeSortByKey = (key) => {
        delete jobs.sort[key];
        setJobs({ ...jobs });
    };

    const updateApiState = (loading, url, searchparams) => {
        searchparams = (loading && searchparams) ? searchparams : jobApiState.search_params;
        setJobApiState({
            ...jobApiState,
            search_params : searchparams,
            loading: loading,
            last_valid_url: loading ? url : ""
        });
    };

    const getCurrentJobState = () => {
        return jobs;
    };

    /**
     * this sorts contents without going to the api
     * because it assumes that the api returned data is currently what's in display 
    */
    const _sortContentInternally = () => {
        
    };

    return <JobContext.Provider value={{
        jobs: jobs,
        jobApiState,
        addJobList,
        addJob,
        resetJobListForSearchedData,
        clearSearchedData,
        removeSortByKey,
        setSort,
        updateApiState,
        getCurrentJobState
    }}>
        {props.children}
    </JobContext.Provider>;
};

export default JobContextProvider;