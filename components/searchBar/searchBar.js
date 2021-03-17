import { useState, useContext, useEffect } from 'react';
import { JobContext } from '../../context/job.context';
import useSWR from 'swr';

const fetcher = async (url, resolver) => {
    const res = await fetch(url);
    const data = await res.json();
    resolver(null, url);

    if (res.status !== 200) {
        throw new Error(data.message);
    }
    resolver(data.jobs, url, true);
    return data;
};

let lastSearched = "";

const Searchbar = () => {
    const [search_string, setSearchString] = useState("");
    const [go_to_api, setGotoapi] = useState(false);
    const search_url = "/api/jobs?search=";
    const { resetJobListForSearchedData, clearSearchedData, updateApiState, jobApiState } = useContext(JobContext);
    const [searchedData, setSearchedData] = useState({ searched_url: "", data: [] });

    const apiResponseResolver = (data, url, done) => {
        if (!done) {
            if (search_string.length > 0) {
                setSearchString("");
                updateApiState(true, url, search_string);
                setGotoapi(false);
                setSearchedData({ ...searchedData, data: [], searched_url: url });
            }
        } else {
                setSearchedData({ searched_url: url, data: data });
        }
    };

    const { data, error } = useSWR(
        () => (go_to_api && search_string.length > 0) && [`${search_url}${search_string}`, apiResponseResolver],
        fetcher
    );

    useEffect(() => {
        if ((jobApiState.last_valid_url === searchedData.searched_url) || (searchedData.data.length > 0 && jobApiState.last_valid_url === "")) {
            resetJobListForSearchedData(searchedData.data);
            updateApiState(false, search_url);
        }
    }, [searchedData.data]);

    const handleChange = (e) => {
        setSearchString(e.target.value.replace("&", "__dev_replace"));
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            if (search_string.trim().length > 0) {
                setGotoapi(true);
            }
        }
    };

    const clearSearch = () => {
        let element = document.getElementById('txt_search');
        element.value = "";
        setSearchString("");
        clearSearchedData();
    };




    return (
        <div className={"w-full flex mt-4 bg-white h-16 md:rounded-md border-b border-gray-500 md:border-0"}>
            <div className={"w-8 flex items-center justify-center p-1 md:p-5 md:w-16"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input
                id="txt_search"
                className={"border-none w-full outline-none focus:outline-none"}
                placeholder="Search for join, titles,keyword or the company"
                onKeyUp={handleChange}
            />
            {
                search_string.length > 0 &&
                <div className={"w-16 flex items-center justify-center p-5 cursor-pointer"} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={clearSearch}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            }
        </div>
    );
};

export default Searchbar;