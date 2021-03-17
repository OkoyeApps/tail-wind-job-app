import { useState } from 'react';
import JobContent from './jobContent';


const SingleJob = ({ job }) => {
    const [show, setShow] = useState(false);
    let nameSplit = job.name.split(" ");
    let initial = nameSplit[0][0] + nameSplit[1][0];
    return <>
        <div onClick={() => setShow(!show)} className={"flex items-center cursor-pointer"}>
            <div className={"flex justify-center items-center rounded-lg text-white font-bold py-2 px-2 bg-gray-600 text-2xl w-12"}>
                <p>{initial}</p>
            </div>
            <p className="ml-4">{job.items.length} for {job.name}</p>
        </div>

        {show && <div className={"w-full bg-white overflow-hidden transition-all duration-10000 ease-in-out"}>
            {job.items.map((list, i) => (
                <JobContent job={list} key={"single_job" + i} />
            ))}
        </div>
        }
    </>;
};


export default SingleJob;