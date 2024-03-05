import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import firestoreDatabase from "../FirebaseConfig";

export const storeBookAppointment = async (payload) => {
  try {
    await addDoc(collection(firestoreDatabase, "appointments"), payload);
    return {
      success: true,
      message: "Appointment booked Sucessfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const GetDoctorAppointmentOnDate = async (doctorId, date) => {
  try {
    const querySnapShot = await getDocs(
      query(
        collection(firestoreDatabase, "appointments"),
        where("doctorId", "==", doctorId),
        where("date", "==", date)
      )
    );
    const data = [];
    querySnapShot.forEach((doc) => {
      data.push(doc.data());
    });
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const GetDoctorAppointments = async (doctorId) => {
  try {
    const querySnapShot = await getDocs(
      query(
        collection(firestoreDatabase, "appointments"),
        where("doctorId", "==", doctorId)
      )
    );
    const data = [];
    querySnapShot.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const GetUserAppointments = async (userId) => {
  try {
    const querySnapShot = await getDocs(
      query(
        collection(firestoreDatabase, "appointments"),
        where("userId", "==", userId)
      )
    );
    const data = [];
    querySnapShot.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};



export const UpdateAppointment = async(id, status) =>{
    try {
        await updateDoc(doc(firestoreDatabase, "appointments", id),{
            status,
        });
        return{
            success: true,
            message: "Appoinment status updated"
        }
    } catch (error) {
        return{
            success: false,
            message: error.message,
        }
        
    }
}