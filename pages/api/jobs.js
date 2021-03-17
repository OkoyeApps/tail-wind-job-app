import alljobs from '../../data/jobs';

const jobs = alljobs;

export default async function handler(req, res) {
  res.statusCode = 200;
  let result = [];
  if (Object.keys(req.query).length > 0) {
    result = _search_for_result(req.query.search, req.query.filter);
  } else {
    result = jobs;
  }

  // @todo: implement filters and search
  // @todo: implement automated tests

  // this timeout emulates unstable network connection, do not remove this one
  // you need to figure out how to guarantee that client side will render
  // correct results even if server-side can't finish replies in the right order
  await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()));
  res.json({ jobs: result });
}

const _search_for_result = (search_string, filter) => {
  if (search_string && !filter) return _search_only(search_string, jobs);
  if (!search_string && filter) return _filter_only(filter, jobs);
};
const _search_only = (search_string = "", jobsArray) => {
  search_string = search_string.toLowerCase();
  let result = jobsArray.filter(x => {
    if (x.job_title.toLowerCase().includes(search_string)) return true;
    if (x.name.toLowerCase().includes(search_string)) return true;
    else {
      let filteredItems = x.items.filter((item) => {
        if (item.job_title.toLowerCase().includes(search_string)) return true;
        if (item.department.map(x => x.toLowerCase()).includes(search_string)) return true;
        if (item.experience.toLowerCase().includes(search_string)) return true;
      });
      if (filteredItems.length > 0) {
        x.items = filteredItems;
        return true;
      } else {
        return false;
      }
    }
  });
  return result;
};

/**
 * 
 * @param {string} filter_string 
 * @returns 
 */
const _filter_only = (filter, jobsArray) => {
  const [filter_key, filter_string] = filter.replace("__dev_replace", "&").split("$");
  let result = jobsArray.filter(x => {
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
  return result;
};
