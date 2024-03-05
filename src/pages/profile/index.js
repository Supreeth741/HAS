import React from "react";
import { Tabs } from "antd";
import Appointment from "./Appointment";
import DoctorForm from "../Doctorform";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Appointments" key="1"><Appointment /></Tabs.TabPane>
        <Tabs.TabPane tab="Profile" key="2">
          {user.role === 'doctor' && <DoctorForm />}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
