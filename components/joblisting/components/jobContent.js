import { useState } from 'react';

const JobContent = ({ job }) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <div className={`w-full -4 flex items-center font-bold mt-4 pb-8 border-b cursor-pointer`} onClick={() => setShow(!show)}>
                <div>
                    <p>{job.job_title}</p>
                    <p className="font-medium">{job.job_type} | ${job.salary_range.join("- $")} an hour | {job.city}</p>
                </div>
            </div>
            {
                show && <div class="grid md:grid-cols-3 md:gap-4 pt-8 block border-b grid-cols-2">
                    <div class="font-bold col-span-2 md:col-auto">Department : </div>
                    <div class="col-span-2 mt-2 md:col-auto">Medicine, Anesthesiology &amp; Perioperative Medicine, Head and Neck
                    Surgery, Neurosurgery, Pathology &amp; Laboratory Medicine</div>
                    <div></div>
                    <div class="font-bold col-span-2 mt-4 md:col-auto">Hours/shifts : </div>
                    <div class="col-span-2 mt-2">10</div>
                    <div class="font-bold col-span-2 mt-4 md:col-auto">Summary</div>
                    <div class="col-span-2 mt-2 md:col-auto">Within the context of a client and family centred model of care, and in
                    accordance with the Mission, Vision, Values and strategic directions of Providence Health Care, the person
                    promotes a safe, respectful, and civil working environment for patients, residents, families, visitors and staff
                </div>
                    <div class="col-span-2 md:col-auto">
                        <div class="flex md:items-end md:flex-col h-auto gap-2 py-4 py-0"><button
                            class="outline-none border border-blue-400 bg-blue-400 text-white align-center rounded-lg gap-4 w-32 h-12">Job
                            details</button><button
                                class="outline-none border border-blue-400 text-blue-400 text-white align-center rounded-lg gap-4 w-auto h-12 px-4 ml-5">Save
                            Job</button></div>
                    </div>
                </div>
            }
        </ >
    );
};

export default JobContent;