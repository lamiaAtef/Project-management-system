import React, { useEffect, useState, useContext } from "react";
import { Card } from "react-bootstrap";
import { AuthContext } from "../../../../context/AuthContext";
import axiosInstance from "../../../../services/api";
import { Tasks_URLS, USER_URLS } from "../../../../services/api/apiURLs";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { GoChecklist } from "react-icons/go";
import { TbBusinessplan } from "react-icons/tb";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
export default function Dashboard() {
 
  const { userData } = useContext(AuthContext);
  const [counts, setCounts] = useState({
    toDo: 0,
    inProgress: 0,
    done: 0,
  });
   const [countsUser, setCountsUser] = useState({
    activatedEmployeeCount: 0,
  deactivatedEmployeeCount: 0
  });

  const getTaskssCount = async () => {
    try {
      const response = await axiosInstance.get(Tasks_URLS.TASKS_COUNT, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCounts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUsersCount = async () => {
    try {
      const response = await axiosInstance.get(USER_URLS.GET_USER_COINT, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCountsUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const donutColors = {
  progress: "rgba(255, 217, 102, 1)",
  tasks: "rgba(135, 206, 250, 1)",
  projects: "rgba(144, 238, 144, 1)",
};
  const donutUserColors = {
  activatedEmployeeCount: "rgba(255, 217, 102, 1)",
  
  deactivatedEmployeeCount: "rgba(144, 238, 144, 1)",
};
const donutUserData = {
  labels: ["activatedEmployeeCount", "deactivatedEmployeeCount"],
  datasets: [
    {
      data: [ countsUser.activatedEmployeeCount,
        countsUser.deactivatedEmployeeCount],
        backgroundColor: [
        donutUserColors.activatedEmployeeCount,
        donutUserColors.deactivatedEmployeeCount,
        
      ],
      borderWidth: 0,
    },
  ],
};
const donutData = {
  labels: ["Progress", "Tasks", "Projects"],
  datasets: [
    {
      data: [ counts.inProgress,
        counts.toDo,
        counts.done],
      backgroundColor: [
        donutColors.progress,
        donutColors.tasks,
        donutColors.projects,
      ],
      borderWidth: 0,
    },
  ],
};
const donutOptions = {
  cutout: "30%",
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      color: "rgba(255, 248, 248, 1)",
      font: {
        weight: "bold",
        size: 15,
      },
      formatter: (value, context) => {
        const data = context.chart.data.datasets[0].data;
        const total = data.reduce((a, b) => a + b, 0);
        const percentage = ((value / total) * 100).toFixed(0);
        return `${percentage}%`;
      },
    },
  },
};


  useEffect(() => {
    getTaskssCount()
    getUsersCount();
  }, []);
}

 return (
  <>
    <div className="homeImage d-flex flex-column justify-content-center p-4">
      <h3 className="text-white">
        Welcome <span className="textHeader fw-bold">{userData?.userName}</span>
      </h3>
      <p className="text-white fs-2">
        You can add project and assign tasks to your team
      </p>
    </div>

    <div className="dashboard-cards-wrapper">
      <Card className="tasks-summary-card pt-3">
        <Card.Body>
          <h5 className="m-3">Tasks</h5>
          <p className="text-muted m-3">Lorem ipsum dolor sit amet</p>
        </Card.Body>
      </Card>

      <Card className="tasks-summary-card pt-3">
        <Card.Body>
          <h5 className="m-3">Users</h5>
          <p className="text-muted m-3">Lorem ipsum dolor sit amet</p>
        </Card.Body>
      </Card>
    </div>

    <div className="tasks-donut-wrapper">
      <div className="donut-wrapper">
        <Doughnut data={donutData} options={donutOptions} />
      </div>
    </div>

    {userData?.userGroup === "Manager" && (
      <div className="col-12 col-md-8 col-lg-4 offset-2">
        <Doughnut data={donutUserData} options={donutOptions} />
      </div>
    )}

    <ChatBot />
  </>
);

   
   

 



 
 