import React, { useEffect, useState } from "react";
import "./ManageUsers.scss";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Input from "../../comp/input/Input";
import SelectInput from "../../comp/SelectInput/SelectInput";
import {
  deleteEmployee,
  employeeGetAll,
  getAllEmployeeById,
} from "../../(api)/Employee";
import { toast } from "react-toastify";
import axios from "axios";

const ManageUser = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [pagination, setPagination] = useState({
    current: 1, // AntD uses 1-based page index
    pageSize: 10,
    total: 0,
  });

  const [eid, setEid] = useState();
  const columns = [
    { title: "Employee Id", dataIndex: "empId", key: "empId" },
    { title: "Username", dataIndex: "userName", key: "userName" },
    { title: "Role", dataIndex: "role", key: "role" },
  ];

  useEffect(() => {
    employeeGetAll(pagination.current - 1, pagination.pageSize)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  }, [pagination.current, pagination.pageSize]);

  const editEmployee = async (id) => {
    await getAllEmployeeById(id)
      .then((res) => {
        const data = res.data;

        setFormData({
          username: data.userName,
          password: data.password,
          role: data.role,
        });
        setEid(data.eid);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changePassword = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");

      const payload = { ...formData, eid: eid };
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}admin/changePasswordRole`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("User Updated Successfully");

      setFormData({
        username: "",
        password: "",
        role: "",
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (paginationConfig) => {
    setPagination((prev) => ({
      ...prev,
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
    }));
  };

  return (
    <>
      <MainPanel>
        <div class="panel">
          <div class="table_panel">
            <Table
              onDelete={(record) => deleteEmployee(record.eid)}
              onEdit={(record) => editEmployee(record.eid)}
              showActions={true}
              columns={columns}
              handleChange={handleChange}
              data={data}
            />
          </div>

          <form class="form" onSubmit={changePassword}>
            <div class="form-row">
              <Input
                label="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div class="form-row">
              <Input
                label="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div class="form-row">
              <SelectInput
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value="">Select Role</option>
                <option value="EMPLOYEE">Employee</option>
                <option value="ADMIN">Admin</option>
              </SelectInput>
            </div>

            <div class="form-row">
              <button type="submit" class="btn">
                Add User
              </button>
            </div>
          </form>
        </div>
      </MainPanel>
    </>
  );
};

export default ManageUser;
