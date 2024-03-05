import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ShowLoader } from "../../redux/loaderSlice";
import { message } from "antd";
import { GetDoctorById } from "../../apicalls/doctors";
import moment from "moment";
import {
  GetDoctorAppointmentOnDate,
  storeBookAppointment,
} from "../../apicalls/appiontment";

function BookAppointment() {
  const [problem = "", setProblem] = React.useState("");
  const navigate = useNavigate();
  const [date = "", setDate] = React.useState("");
  const [selectSlot = "", setSelectSlot] = React.useState("");
  const [doctor, setDoctor] = React.useState(null);
  const [bookedSlots = [], setBookedSlots] = React.useState([]);

  const { id } = useParams();
  const dispatch = useDispatch();

  const getdata = async () => {
    try {
      dispatch(ShowLoader(true));
      const response = await GetDoctorById(id);
      dispatch(ShowLoader(false));
      if (response.success) {
        setDoctor(response.data);
        message.success("Data Fetch Successfully");
      } else {
        throw new Error("data unable to fetch");
      }
    } catch (error) {
      dispatch(ShowLoader(false));
      message.error(error.message);
    }
  };

  const onBookAppointment = async () => {
    try {
      dispatch(ShowLoader(true));
      const payload = {
        doctorId: doctor.id,
        userId: JSON.parse(localStorage.getItem("user")).id,
        date,
        slot: selectSlot,
        doctorName: `${doctor.firstName} ${doctor.lastName}`,
        userName: JSON.parse(localStorage.getItem("user")).name,
        bookedOn: moment().format("DD-MM-YYYY HH:mm A"),
        problem,
        status: "pending",
      };

      const response = await storeBookAppointment(payload);
      dispatch(ShowLoader(false));
      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(ShowLoader(true));
      message.error(error.message);
    }
  };

  const getBookedSlots = async () => {
    try {
      dispatch(ShowLoader(true));
      const response = await GetDoctorAppointmentOnDate(id, date);
      dispatch(ShowLoader(false));
      if (response.success) {
        console.log(response.data);
        setBookedSlots(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(ShowLoader(false));
      message.error(error.message);
    }
  };

  const getSlotsData = () => {
    const day = moment(date).format("dddd");
    if (!doctor.days.includes(day)) {
      return (
        <h4>Doctor is not Available on {moment(date).format("DD-MM-YYYY")}</h4>
      );
    }

    let startTime = moment(doctor.startTime, "HH:mm");
    let endTime = moment(doctor.endTime, "HH:mm");
    let slotDuration = 60;
    let slots = [];
    while (startTime < endTime) {
      /* if(!bookedSlots?.find((slot) => slot.slot === startTime.format("HH:mm"))){
            
        } */
      slots.push(startTime.format("HH:mm"));
      startTime.add(slotDuration, "minutes");
    }
    return slots.map((slot) => {
      const isBooked = bookedSlots?.find(
        (bookedSlot) =>
          bookedSlot.slot === slot && bookedSlot.status !== "canceled"
      );
      return (
        <div
          className="bg-white p-1 cursor-pointer"
          onClick={() => setSelectSlot(slot)}
          style={{
            border: selectSlot === slot ? "2px solid green" : "1px solid gray",
            backgroundColor: isBooked ? "gray" : "white",
            pointerEvents: isBooked ? "none" : "auto",
            cursor: isBooked ? "not-allowed" : "pointer",
          }}
        >
          <span>
            {moment(slot, "HH:mm").format("HH:mm")} -{" "}
            {moment(slot, "HH:mm").add(slotDuration, "minutes").format("HH:mm")}
          </span>
        </div>
      );
    });
  };

  useEffect(() => {
    getdata();
  }, [id]);

  useEffect(() => {
    if (date) {
      getBookedSlots();
    }
  }, [date]);

  return (
    doctor && (
      <div className="bg-white p-2">
        <h1 className="uppercase my-1">
          {doctor?.firstName} {doctor?.lastName}
        </h1>
        <hr />

        <div className="w-800 flex flex-column gap-1">
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
            <h3>Rs. {doctor.Fee} per Session</h3>
          </div>
          <div className="flex justify-between w-full">
            <h3>Days Available :</h3>
            <h3>{doctor.days.join(", ")}</h3>
          </div>
        </div>
        <hr />

        {/* Slots booking */}
        <div className="flex flex-column gap-2 my-2">
          <div className="flex gap-2 w-400 item-end">
            <div>
              <span>Select Date :</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={moment().format("YYYY-MM-DD")}
              />
            </div>
          </div>
          <div className="flex gap-2">{date && getSlotsData()}</div>

          {selectSlot && (
            <div>
              <textarea
                placeholder="Enter your Problem Here"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                rows="10"
              ></textarea>
              <div className="flex gap-2">
                <button
                  className="outlined-btn my-3"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="contained-btn my-3"
                  onClick={onBookAppointment}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default BookAppointment;
