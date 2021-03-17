import React, { useState, useContext, useEffect } from 'react';
import styles from './styles.module.css';
import useSWR from 'swr';
import { JobContext } from '../../context/job.context';

const fetcher = async (url, resolver, resetApiFetchingState,) => {
    const res = await fetch(url);
    const data = await res.json();
    if (res.status !== 200) {
        throw new Error(data.message);
    }
    resolver(data, url);
    return data;
};


const Filter = () => {
    const [go_to_api, setGotoapi] = useState(true);
    const [filters, setFilters] = useState({});
    const filter_url = "/api/filters";
    const resetApiFetchingState = () => {
        setGotoapi(false);
    };

    const { data, error } = useSWR(
        () => (go_to_api && Object.keys(filters).length === 0) && [filter_url, setFilters, resetApiFetchingState,],
        fetcher
    );
    return <FilterCard filterList={filters} />;
};

const formatNumber = (total_jobs) => {
    let result = total_jobs.toLocaleString(undefined, { minimumFractionDigits: 2 });
    return result.replace(/(\.[\w\d]+)/, "");
};

const FilterCard = ({ filterList }) => {
    const { resetJobListForSearchedData, updateApiState, jobApiState, jobs } = useContext(JobContext);
    const [filter_string, setFilterDetails] = useState("");
    const filter_url = "/api/jobs?filter=";
    const [filteredJobs, setFilteredJob] = useState([]);
    const [go_to_api, setGotoapi] = useState(false);

    const resetApiFetchingState = () => {
        setGotoapi(false);
    };

    const apiResponseResolver = (data, url) => {
        if (data && Array.isArray(data.jobs)) {
            console.log("context data", data.jobs);
            setFilteredJob(data.jobs);
        }
    };

    const { data, error } = useSWR(
        () => go_to_api
            && [filter_url + filter_string, apiResponseResolver, resetApiFetchingState],
        fetcher
    );
    const getFilter = (key = "", value = "") => {
        if (jobApiState.search_params) {
            sortInSearchedData(key, value, jobApiState.search_params)
        } else {
            value = value.replace("&", "__dev_replace");
            let url = key + "$" + value;
            setFilterDetails(url);
            setGotoapi(true);
            updateApiState(true, filter_url + url);
        }
    };

    const sortInSearchedData = (filter_key,filter_string, searchparams ) => {
        debugger;
        let arrayOfJobs = jobs.data_before_search_filter.length > 0 ? jobs.data_before_search_filter : jobs.alljobs;
        let arrayClone = JSON.parse(JSON.stringify(arrayOfJobs));
        let result = arrayOfJobs.filter(x => {
            let filteredItems = x.items.filter((item) => {
                if (typeof item[filter_key] === 'string') {
                    let is_found = item[filter_key].toLowerCase().includes(filter_string.toLowerCase());
                    return is_found;
                }
                return item[filter_key].includes(filter_string.toLowerCase());
            });
            if (filteredItems.length > 0) {
                x.items = filteredItems;
                return true;
            } else {
                return false;
            }
        });
        resetJobListForSearchedData(result, searchparams, arrayClone);
    };

    useEffect(() => {
        updateStateForFilteredData();
    }, [filteredJobs]);

    const updateStateForFilteredData = () => {
        if (jobApiState.last_valid_url === filter_url + filter_string) {
            console.log("context data 3", jobApiState, filter_url + filter_string,);
            resetJobListForSearchedData(filteredJobs);
            updateApiState(false, "");
            resetApiFetchingState();
        }
    };
    return (
        <section className={"flex flex-col gap-4 styles_filter_section__3UVWZ hidden md:block " + styles.filter_section} id="filter_section">
            { Object.keys(filterList).length > 0 && Object.keys(filterList).map((key, index) => {
                let filters = filterList[key];
                return <div className={"gap-4 flex flex-col bg-white p-8 rounded-md"} key={"filter" + index}>
                    <div className="uppercase cursor-pointer font-bold" key={"filter1" + index}>
                        {key.replace("_", " ")}
                    </div>

                    {
                        filters.map((filter, index) =>
                            <div className="uppercase cursor-pointer" key={"filter1" + index} onClick={() => getFilter(key, filter.key)}>
                                <span className="uppercase cursor-pointer">{filter.key}</span>
                                <span className="uppercase cursor-pointer my-4">
                                    <span className={"ml-4 text-gray-500"}>{formatNumber(filter.doc_count)}</span>
                                </span>
                            </div>
                        )
                    }
                </div>;
            })
            }
        </section>
    );
};

export default Filter;