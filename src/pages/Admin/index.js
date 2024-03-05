import React, { useEffect } from 'react'
import { Tabs, message } from 'antd';
import UserList from './UserList';
import DoctorList from './DoctorList';
import { useDispatch } from 'react-redux';
import { ShowLoader } from '../../redux/loaderSlice';
import { GetUserById } from '../../apicalls/users';

function Admin() {

  const [isAdmin, setIsAdmin] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const checkIsAdmin = async () =>{
    try {
      dispatch(ShowLoader(true));
      const response = await GetUserById(user.id);
      dispatch(ShowLoader(false));
      if(response.success && response.data.role === 'admin')
      {
        setIsAdmin(true);
      }
      else{
        throw new Error("You are Not Admin");
      }
      
    } catch (error) {
      dispatch(ShowLoader(false));
      message.error(error.message);
    }
  }

  useEffect(() => {
    checkIsAdmin();
  },[])
  return (
    isAdmin && <div className='bg-white p-1'>
    <Tabs>
    <Tabs.TabPane tab="Users" key="1"><UserList /></Tabs.TabPane>
    <Tabs.TabPane tab="Doctors" key="2"> <DoctorList /> </Tabs.TabPane>
  </Tabs>
  </div>
  )
}

export default Admin;