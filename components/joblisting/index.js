import { useState, useContext, useEffect } from "react";
import { JobContext } from '../../context/job.context';
import useSWR from 'swr';
import SingleJob from './components/singleJob';
import SortComponent from './components/sortComponent';

const fetcher = async (url, resolver, setFetching) => {
    setFetching();
    const res = await fetch(url);
    const data = await res.json();

    if (res.status !== 200) {
        throw new Error(data.message);
    }
    resolver(data.jobs);
    setFetching(true);
    return data;
};

const LeftTab = (props) => {
    const { jobs, addJobList, jobApiState, updateApiState } = useContext(JobContext);
    const [fetching, setFetching] = useState(false);
    const { alljobs } = jobs;

    const setLoadingState = (done) => {
        if (!done) {
            updateApiState(true, "/api/jobs/");
            setFetching(true);
        }else{
            updateApiState(false);
        }
    };

    const { data, error } = useSWR(
        () => (jobs.alljobs.length === 0 && !fetching) && [`/api/jobs/`, addJobList, setLoadingState],
        fetcher
    );

    const _renderJob = () => {
        return alljobs.map((job, index) => (
            <SingleJob job={job} key={"job_" + index} />
        ));
    };

    const _getTotalJobs = () => {
        let total = 0;
        alljobs.forEach(x => {
            total += x.items.length;
        });
        return total;
    };

    return (
        <div className={"flex-1 md:py-8 md:px-16 bg-white ml-4 rounded-md min-h-full pb-4"}>
            {
                jobApiState.loading ? <h1>Loading...</h1> : (
                    <><div className={"md:py-12 py-4 flex justify-between text-black"}>
                        <span>
                            <span className="font-bold text-lg">{alljobs.length > 0 && _getTotalJobs()} </span><span> job posting</span>
                        </span>
                        {
                            <SortComponent />
                        }
                    </div>
                        <div className="flex flex-col gap-8 md:gap-4">
                            {
                                alljobs.length > 0 && _renderJob()
                            }
                        </div>
                    </>)
            }
        </div>
    );
};






export default LeftTab;