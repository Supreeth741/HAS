import { Col, Form, Row, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ShowLoader } from "../../redux/loaderSlice";
import {
  AddDoctor,
  CheckIfDoctorAccountIsApplied,
} from "../../apicalls/doctors";
import { useNavigate } from "react-router-dom";

function DoctorForm() {
  const [form] = Form.useForm();
  /* const [form, setForm] = React.useState(); */
  const [alreadyApproved, setAlreadyApproved] = React.useState(false);
  const [days, setDays] = React.useState([]);
  const [alreadyApplied, setAlreadyApplied] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoader(true));
      const payload = {
        ...values,
        days,
        userId: JSON.parse(localStorage.getItem("user")).id,
        status: "pending",
        role: "doctor",
      };

      const response = await AddDoctor(payload);
      dispatch(ShowLoader(false));
      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(ShowLoader(false));
      message.error(error.message);
    }
  };

  const checkIfAlreadyApplied = async () => {
    try {
      dispatch(ShowLoader(true));
      const response = await CheckIfDoctorAccountIsApplied(
        JSON.parse(localStorage.getItem("user")).id
      );
      if (response.success) {
        setAlreadyApplied(true);
        if (response.data.status === "approved") {
          setAlreadyApproved(true);
          form.setFieldValue(response.data);
        }
      }
      dispatch(ShowLoader(false));
    } catch (error) {
      dispatch(ShowLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    checkIfAlreadyApplied();
  }, []);

  return (
    <div className="bg-white p-2">
      {!alreadyApplied ||
        (alreadyApproved && (
          <>
            <h3 className="my-1">{
              alreadyApproved ? "update your information": " Apply as a doctor"
            }</h3>
            <hr />

            <Form
              layout="vertical"
              className="my-1"
              onFinish={onFinish}
              form={form}
            >
              <Row gutter={[16, 16]}>
                {/* personal information */}

                <Col span={24}>
                  <h3 className="uppercase">personal Information</h3>
                  <hr />
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input type="email" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="PhoneNo"
                    name="phoneno"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Website"
                    name="website"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <textarea type="text" />
                  </Form.Item>
                </Col>

                {/* professional Information */}

                <Col span={24}>
                  <h3 className="uppercase">professional Information</h3>
                  <hr />
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="specialty"
                    name="specialty"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <select>
                      <option value="">Select Specialty</option>
                      <option value="cardiology">Cardiology</option>
                      <option value="dermatology">Dermatology</option>
                      <option value="neurology">Neurology</option>
                      <option value="oncology">Oncology</option>
                      <option value="ophthalmology">Ophthalmology</option>
                      <option value="pediatrics">Pediatrics</option>
                      <option value="surgeon">Surgeon</option>
                      <option value="urologist">Urologist</option>
                    </select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Experience"
                    name="experience"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input type="number" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Qualification"
                    name="qualification"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <select>
                      <option value="">Select Qualification</option>
                      <option value="MBBS">MBBS</option>
                      <option value="MD">MD</option>
                      <option value="MS">MS</option>
                      <option value="MDS">MDS</option>
                    </select>
                  </Form.Item>
                </Col>

                {/* work hours */}

                <Col span={24}>
                  <h3 className="uppercase">Work Hour</h3>
                  <hr />
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Start Time"
                    name="startTime"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input type="time" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="End Time"
                    name="endTime"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input type="time" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Fee"
                    name="Fee"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input type="number" />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <div className="flex gap-2">
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day, index) => (
                      <div className="flex gap-1 item-center">
                        <input
                          type="checkbox"
                          key={index}
                          value={day}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setDays([...days, e.target.value]);
                            } else {
                              setDays(
                                days.filter((item) => item !== e.target.value)
                              );
                            }
                          }}
                        />
                        <label>{day}</label>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
              <div className="flex justify-end gap-2">
                <button className="outlined-btn" type="reset">
                  CANCEL
                </button>
                <button className="contained-btn" type="submit">
                  SUBMIT
                </button>
              </div>
            </Form>
          </>
        ))}

      {alreadyApplied && !alreadyApproved && (
        <div className="flex flex-col item-center gap-2">
          <h3 className="text-2xl">
            You have already applied for this doctor account , please wait to
            approve your request
          </h3>
        </div>
      )}
    </div>
  );
}

export default DoctorForm;
