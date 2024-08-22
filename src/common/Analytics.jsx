import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getchartData, getHotspot, userList } from "../API Calls/API";
import Loader from "./Loader";
import CustomChart from "./CustomChart";

const Analytics = () => {
    const [chartData, setchartData] = useState(new Array(12).fill(0));
    const [time, settime] = useState("today");
    const [timeTitle, settimeTitle] = useState("Today");
    const [activeUser, setactiveUser] = useState(0);

    const soscount = useQuery({
        queryKey: ["chart data"],
        queryFn: getchartData,
        staleTime: 15 * 60 * 1000,
    });

    const driverList = useQuery({
        queryKey: ["driver list", "driver"],
        queryFn: userList,
        staleTime: 15 * 60 * 1000,
    });

    const companyList = useQuery({
        queryKey: ["company list", "company"],
        queryFn: userList,
        staleTime: 15 * 60 * 1000,
    });

    const hotspot = useQuery({
        queryKey: ["hotspot", time],
        queryFn: getHotspot,
        staleTime: 15 * 60 * 1000,
    });

    const handlChange = (e) => {
        settime(e.target.value);
    };

    useEffect(() => {
        switch (time) {
            case "today":
                setactiveUser(driverList.data?.data.totalActiveDriversToday || 0);
                settimeTitle("Today")
                break;
            case "yesterday":
                setactiveUser(driverList.data?.data.totalActiveDriversYesterday || 0);
                settimeTitle("Yesterday")
                break;
            case "this_week":
                setactiveUser(driverList.data?.data.totalActiveDriversThisWeek || 0);
                settimeTitle("This Week")
                break;
            case "this_month":
                setactiveUser(driverList.data?.data.totalActiveDriversThisMonth || 0);
                settimeTitle("This Month")
                break;
            case "this_year":
                setactiveUser(driverList.data?.data.totalActiveDriversThisYear || 0);
                settimeTitle("This Year")
                break;
            default:
                setactiveUser(0);
                settimeTitle("Today")
                break;
        }
    }, [driverList.data, time]);

    useEffect(() => {
        const newdata = [...chartData];
        soscount.data?.data.forEach((item) => {
            newdata[item.month - 1] = item.count;
        });

        setchartData(newdata);
    }, [soscount.data]);

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <div className="filter-date">
                        <select className="form-select" value={time} onChange={handlChange}>
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="this_week">This week</option>
                            <option value="this_month">This Month</option>
                            <option value="this_year">This Year</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="clearfix"></div>
            {localStorage.getItem("role") === "super_admin" ? (
                <div className="row">
                    <div className="col-md-4">
                        <div className="dash-counter">
                            <span>Total Companies</span>
                            <h3>{companyList.data?.data.totalUsers || 0}</h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="dash-counter">
                            <span>Driver Active</span>
                            <h3>{driverList.data?.data.totalActiveDrivers || 0}</h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="dash-counter">
                            <span>Driver Active {timeTitle}</span>
                            <h3>{activeUser}</h3>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col-md-6">
                        <div className="dash-counter">
                            <span>Driver Active</span>
                            <h3>{driverList.data?.data.totalActiveDrivers || 0}</h3>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="dash-counter">
                            <span>Driver Active {timeTitle}</span>
                            <h3>{driverList.data?.data.totalActiveDriversThisMonth || 0}</h3>
                        </div>
                    </div>
                </div>
            )}

            <div className="clearfix"></div>
            <div className="row">
                <div className="col-md-8">
                    <div className="requests-chart">
                        <div className="chart-heading">
                            <h3>SOS Requests</h3>
                        </div>
                        <CustomChart data={chartData} />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="hotspot">
                        <h1>Hotspot</h1>
                        <div className="location-list">
                            {hotspot.isFetching ? (
                                <Loader />
                            ) : hotspot.data?.data.length === 0 ? (
                                <p>No data Found</p>
                            ) : (
                                hotspot.data?.data
                                    .sort((a, b) => (a.timesCalled > b.timesCalled ? -1 : 1))
                                    .map((d, index) => (
                                        <div className="location" key={index}>
                                            <span>{d.address}</span>
                                            <span>{d.timesCalled}</span>
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="clearfix"></div>
        </div>
    );
}

export default Analytics
