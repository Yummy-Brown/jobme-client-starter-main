import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GlobalContext = createContext();

const AppContext = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const [totalJobs, setTotalJobs] = useState("");
  const [jobType, setJobType] = useState("")
  const [mode, setMode] = useState("")
  const [industry, setIndustry] = useState("")
  const [location, setLocation] = useState("")
  const resetFilters = () => {
    setJobType("")
    setMode("")
    setIndustry("")
    setLocation("")
  }


  const updateJobType = (value) => {
    setJobType(value)
  }

  const updateMode =(value) => {
    setMode(value)
  }

  
  const updateIndustry =(value) => {
    setIndustry(value)
  }

  const updateLocation = (value) => {
    setLocation(value)
  }

  const url = "https://jobme-server-8uxg.onrender.com/api/v1/jobs";

  const GetJobs = async () => {
    setIsLoading(true);
    const { data } = await axios(`${url}?page=${page}&jobType=${jobType}&mode=${mode}&industry=${industry}&location=${location}`);
    setIsLoading(false);
    setJobs(data.jobs);
    setTotalPages(data.totalPages);
    setTotalJobs(data.totalJobs);
  };
   
  useEffect(() => {
    GetJobs();
  }, [page, jobType, mode, industry, location]);
  return (
    <GlobalContext.Provider
      value={{ jobs, isLoading, totalPages, page, setPage, totalJobs, updateJobType, resetFilters, updateMode, updateIndustry, updateLocation }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext