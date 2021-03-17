import {useContext, useState} from 'react';
import {JobContext} from '../../../context/job.context';

const SortComponent = () => {
    const { setSort, removeSortByKey } = useContext(JobContext);
    const [selectedSortIndex, setSelectedSortIndex] = useState([]);

    const sortData = ["Location", "Role", "Department", "Education", "Experience"];

    const toggleSelect = (index, key) => {
        let currentIndex = selectedSortIndex.indexOf(index);
        if (currentIndex > -1) {
            removeSortByKey(key);
            selectedSortIndex.splice(index, 1);
            setSelectedSortIndex(selectedSortIndex);
        } else {
            setSelectedSortIndex([...selectedSortIndex, index]);
            setSort(key, key);
        }
    };

    return (<div className={`flex justify-between w-auto gap-8 hidden md:flex`}>
        <span className="text-gray-500">sort by:</span>
        {
            sortData.map((x, i) => <span onClick={() => toggleSelect(i, x)} key={"sort_" + i}
                className={`font-bold, cursor-pointer ${selectedSortIndex.indexOf(i) > -1 && "bg-gray-400 items-center justify-center flex text-white px-2 rounded-sm font-bold"} `}>{x}</span>)
        }
    </div>);
};

export default SortComponent;