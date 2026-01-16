import React, { useEffect, useState, useContext } from "react";
import { Card } from "react-bootstrap";
import { AuthContext } from "../../../../context/AuthContext";
import axiosInstance from "../../../../services/api";
import { TASKS_URLS, USER_URLS } from "../../../../services/api/apiURLs";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { GoChecklist } from "react-icons/go";
import { TbBusinessplan } from "react-icons/tb";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";
import styles from "./Dashboard.module.css"

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
      const response = await axiosInstance.get(TASKS_URLS.CONUT_TASKS_FOR_MANAGER_EMPLOYEE, {
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
      const response = await axiosInstance.get(USER_URLS.GET_USERS_COUNT_BY_MANAGER, {
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

  return (
    <>
      
      <div className={`${styles.homeImage} d-flex flex-column justify-content-center p-4`}>
        <h3 className="text-white">
          Welcome <span className="textHeader fw-bold">{userData?.userName}</span>
        </h3>
        <p className="text-white fs-2">
          You can add project and assign tasks to your team
        </p>
      </div>
   <div className={`${styles.dashboard_cards_wrapper}`}>
      <Card className={`${styles.tasks_summary_card } bgOverlayDark pt-3`}>
    <Card.Body>
      <h5 className="textDark mb-1">Tasks</h5>
      <p className="subTitleText mb-4">
        Lorem ipsum dolor sit amet, consectetur
      </p>
      

      <div className={`${styles.inner_cards_wrapper} col-md-4 col-sm-12`}>
        <div className={`${styles.stat_card} ${styles.progressUser}`}>
          <div className={`${styles.icon_box} ${styles.icon_box_total}col-md-4 col-sm-12`}>
            <LuChartNoAxesCombined />
          </div>
          <p className="mb-1 text-muted col-md-4 col-sm-12">Progress</p>
          <h5>{`$ ${counts.inProgress}`}</h5>
        </div>

        <div className={`${styles.stat_card} ${styles.tasksNumber}` }>
          <div className="icon-box tasks col-md-4 col-sm-12 ">
            <GoChecklist />
          </div>
          <p className="mb-1 text-muted">Tasks Number</p>
          <h5>{counts.toDo}</h5>
        </div>

        <div className={`${styles.stat_card} ${styles.projectNumber} col-md-4 col-sm-12`}>
          <div className={`${styles.projects} ${styles.icon_box} col-md-4 col-sm-12`}>
            <TbBusinessplan />
          </div>
          <p className="mb-1 text-muted">Projects Number</p>
          <h5>{counts.done}</h5>
        </div>
      </div>
    </Card.Body>
    
  </Card>
  </div>
  
  {userData?.userGroup == "Manager"?
    <div className="row">
    <div className="col-12 col-md-6 col-lg-12 ">
  <Card  className={`${styles.tasks_summary_card} bgOverlayDark pt-3`}>
   <Card.Body>
    <div className={styles.cardPad}>
      <h5 className="textDark  m-3">Users</h5>
      <p className="subTitleText m-3">
        Lorem ipsum dolor sit amet, consectetur
      </p>
     </div>

      <div className={`${styles.inner_cards_wrapper}`}>
        <div className={`${styles.progressUser} ${styles.stat_card}`}>
          <div className={`${styles.icon_box} ${styles.icon_box_total}`}>
            <LuChartNoAxesCombined />
          </div>
          <p className="mb-1 text-muted">active</p>
          <h5>{`$ ${countsUser.activatedEmployeeCount}`}</h5>
        </div>

        <div className={`${styles.stat_card} ${styles.tasksNumber}`}>
          <div className={`${styles.tasks} ${styles.icon_box}`}>
            <GoChecklist />
          </div>
          <p className="mb-1 text-muted">inactive</p>
          <h5>{countsUser.deactivatedEmployeeCount}</h5>
        </div>

       
      </div>
    </Card.Body>
    
    </Card>
    
    </div>
    </div>
    :""}

 <div className="row">
  <div className="col-12 col-md-8 col-lg-4 mb-4">
    <div className={styles.tasks_donut_wrapper}>
      <div className={styles.donut_wrapper}>
        <Doughnut data={donutData} options={donutOptions} />
      </div>
    </div>
  </div>

  {userData?.userGroup === "Manager" && (
    <div className="col-12 col-md-8 col-lg-4 offset-lg-2">
      <div className={styles.tasks_donut_wrapper}>
        <div className={styles.donut_wrapper}>
          <Doughnut data={donutUserData} options={donutOptions} />
        </div>
      </div>
    </div>
  )}
</div>
</>
  )
}
