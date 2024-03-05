import { Table, message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { ShowLoader } from '../../redux/loaderSlice';
import { GetDoctorAppointments, GetUserAppointments, UpdateAppointment } from '../../apicalls/appiontment';

function Appointment() {

  const [appointment, setAppointment] = React.useState([]);
  const dispatch = useDispatch();

  const getdata = async() =>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(user.role === 'doctor'){
        dispatch(ShowLoader(true));
        const response = await GetDoctorAppointments(user.id);
        dispatch(ShowLoader(false));
            setAppointment(response.data); 
    }
    else{
        dispatch(ShowLoader(true));
        const response = await GetUserAppointments(user.id);
        dispatch(ShowLoader(false));
            setAppointment(response.data); 
    }
  }

  const onUpdate = async(id, status) => {
    try {
        dispatch(ShowLoader(true));
    const response = await UpdateAppointment(id, status);
    dispatch(ShowLoader(false));
    if(response.success){
        message.success(response.message);
        getdata();
    }
    else{
        message.error(response.message);
    }
    } catch (error) {
        message.error(error.message);
    }
  }

  const columns = [
    {
        title: 'Data',
        dataIndex: 'date',
    },
    {
        title: 'Time',
        dataIndex: 'slot',
    },
    {
        title: 'Doctor',
        dataIndex: 'doctorName',
    },
    {
        title: 'Patient',
        dataIndex: 'userName',
    },
    {
        title: 'Problem',
        dataIndex: 'problem',
    },
    {
        title: 'Booked On',
        dataIndex: 'bookedOn',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        render : (text, record) =>{
            const user = JSON.parse(localStorage.getItem("user"));
            if (record.status === "pending" && user.role === 'doctor'){
                return (
                    <div className='flex gap-1'>
                        <span className='underline cursor-pointer'
                            onClick={()=> onUpdate(record.id, "canceled")}
                        >cancel</span>
                        <span className='underline cursor-pointer'
                             onClick={()=> onUpdate(record.id, "approved")}
                        >Approve</span>
                    </div>
                );
            }
        }
    },
  ]  

  useEffect(()=>{
    getdata();
  },[])
  return (
    <div>
        <Table columns={columns} dataSource={appointment || []} />
    </div>
  )
}

export default Appointment;