import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { ShowLoader } from '../../redux/loaderSlice';
import { Table, message } from 'antd';
import { GetAllUsers } from '../../apicalls/users';

function UserList() {
    const [users, setUsers] = React.useState([]);

    const dispatch = useDispatch()
    const getdata = async () =>{
        try {
            dispatch(ShowLoader(true));
            const response = await GetAllUsers()
            dispatch(ShowLoader(false))
            if(response.success){
                setUsers(response.data)
            }
            else{
                throw new Error(response.message);
            }
            
        } catch (error) {
            dispatch(ShowLoader(false));
            message.error(error.message)
        }
    }


    useEffect(() => {
        getdata();
    },[]);

    const columns = [
        {
            title: "ID",
            dataIndex: "id"
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            render : (role) => role.toUpperCase()
        }
    ]


  return (
    <div>
        <Table columns={columns} dataSource={users} />
    </div>
  )
}

export default UserList