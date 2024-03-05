import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, message } from "antd";
import { GetAllDoctors } from "../../apicalls/doctors";
import { ShowLoader } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";

function Home() {
  const [doctors = [], setDoctors] = React.useState([]);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const getdata = async () => {
    try {
      dispatch(ShowLoader(true));
      const response = await GetAllDoctors();
      dispatch(ShowLoader(false));
      if (response.success) {
        setDoctors(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(ShowLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getdata();
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <input placeholder="Search Doctor" className="w-400" />
        </div>
        {user.role !== "doctor" && (
          <button
          className="outlined-btn "
          onClick={() => navigate("/apply-doctor")}
        >
          Apply Doctor
        </button>
        )}
      </div>
      <Row gutter={[16, 16]} className="my-1">
        {doctors.map((doctor) => {
          return (
            <Col span={8}>
              <div
                className="bg-white p-1 flex flex-column gap-1 uppercase cursor-pointer"
                onClick={() => navigate(`/book-appointment/${doctor.id}`)}
              >
                <div className="flex justify-between w-full">
                  <h2 className="w-full py-1">
                    {doctor.firstName} {doctor.lastName}
                    <hr />
                  </h2>
                </div>
                <div className="flex justify-between w-full">
                  <h3>Specialty :</h3>
                  <h3>{doctor.specialty}</h3>
                </div>
                <div className="flex justify-between w-full">
                  <h3>Experience :</h3>
                  <h3>{doctor.experience} Years</h3>
                </div>
                <div className="flex justify-between w-full">
                  <h3>Email :</h3>
                  <h3>{doctor.email}</h3>
                </div>
                <div className="flex justify-between w-full">
                  <h3>Phone Number :</h3>
                  <h3>{doctor.phoneno}</h3>
                </div>
                <div className="flex justify-between w-full">
                  <h3>Fee :</h3>
                  <h3>{doctor.Fee}</h3>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Home;
