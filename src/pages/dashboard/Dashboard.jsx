import React, {  useEffect, useState } from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Loader from "../../comp/loader/Loader";
import { toast } from "react-toastify";
import { loginLogsGetAll } from "../../(api)/Dashboard";

const Dashboard = () => {
  const [data, setData] = useState();
       const [loading, setLoading] = useState(false);
     
       useEffect(() => {
        getAllLogin();
       }, []);
     
       const getAllLogin = async () => {
         try {
           setLoading(true);
            const response = await loginLogsGetAll();
         if(response.status==="OK"){
           setData(response.data.reverse());
         }
         } catch (err) {
           toast.error("Something went wrong");
         } finally {
           setLoading(false);
     
         }
       };


  const columns = [
    { title: "User Name", dataIndex: "username", key: "username" },
    { title: "Login Time", dataIndex: "loginTime", key: "loginTime" },
    { title: "Login Date", dataIndex: "loginDate", key: "loginDate" },
    { title: "Logout Time", dataIndex: "logoutTime", key: "logoutTime" },
   
    
  ];
  

  return (
     <>
     {loading && <Loader />}
    <MainPanel>
    <div >     
    {data?.length > 0 && (
          <Table
          data={data}
          columns={columns}          
        />
        )}
    </div>
    </MainPanel>
     
     
     </>
  );
};

export default Dashboard;