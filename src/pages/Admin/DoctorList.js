import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ShowLoader } from "../../redux/loaderSlice";
import { Table, message } from "antd";
import { GetAllDoctors, UpdateDoctor } from "../../apicalls/doctors";

function DoctorList() {
  const [doctors, setDoctors] = React.useState([]);

  const dispatch = useDispatch();
  const getdata = async () => {
    try {
      dispatch(ShowLoader(true));
      const response = await GetAllDoctors();
      dispatch(ShowLoader(false));
      if (response.success) {
        setDoctors(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(ShowLoader(false));
      message.error(error.message);
    }
  };

  const ChangeStatus = async (payload) => {
    try {
      dispatch(ShowLoader(true));
      const response = await UpdateDoctor(payload);
      dispatch(ShowLoader(false));
      if (response.success) {
        message.success(response.message);
        getdata();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(ShowLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneno",
    },
    {
      title: "Sepcialty",
      dataIndex: "specialty",
    },
    {
      title: "Status",
      dataIndex: "status",
      render : (text, record) =>{
        return text.toUpperCase()
      }
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (text, record) => {
        if (record.status === "pending") {
          return (
            <div className="flex gap-1">
              <span
                className="underline cursor-pointer"
                onClick={() =>
                  ChangeStatus({
                    ...record,
                    status: "rejected",
                  })
                }
              >
                Reject
              </span>
              <span
                className="underline cursor-pointer"
                onClick={() =>
                  ChangeStatus({
                    ...record,
                    status: "approved",
                  })
                }
              >
                Approve
              </span>
            </div>
          );
        }

        if (record.status === "approved") {
          return (
            <div className="flex gap-1">
              <span
                className="underline cursor-pointer"
                onClick={() =>
                  ChangeStatus({
                    ...record,
                    status: "blocked",
                  })
                }
              >
                Block
              </span>
            </div>
          );
        }
        if (record.status === "blocked") {
          return (
            <div className="flex gap-1">
              <span
                className="underline cursor-pointer"
                onClick={() =>
                  ChangeStatus({
                    ...record,
                    status: "approved",
                  })
                }
              >
                Unblock
              </span>
            </div>
          );
        }
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={doctors} />
    </div>
  );
}

export default DoctorList;
