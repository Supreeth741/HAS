import firestoreDatabase from "../FirebaseConfig";
import { collection, addDoc, getDocs, query, where, getDoc, doc } from 'firebase/firestore';

export const CreateUser = async (payload) => {
    try {

        /* check if user already exixts using email */

        const qry = query(collection(firestoreDatabase, "users"),where("email","==",payload.email));
        const querySnapshot = await getDocs(qry);
        if(querySnapshot.size > 0){
            throw new Error("User already exists");
        }
        
        


        const docRef = collection(firestoreDatabase, "users");
        await addDoc(docRef, payload);
        return{
            success : true,
            message : "user created sucessfully"
        }

    } catch (error) {
        return error;
    }
}


export const LoginUser = async (payload) =>{
    try {
        
        const qry = query(collection(firestoreDatabase, "users"),where("email","==",payload.email));
        const userSnapshot = await getDocs(qry);

        if(userSnapshot.size === 0){
            throw new Error("User does not exist");
        }

        const user = userSnapshot.docs[0].data();
        user.id = userSnapshot.docs[0].id;
        
        const originalpassword = user.password;

        if(originalpassword !== payload.password){
            throw new Error("Incorrect Password");
        }

        return{
            success : true,
            message : "user Logged in successfully",
            data : user
        };

    } catch (error) {
        return error;
    }
}

export const GetAllUsers = async () =>{
    try {
      const users =await getDocs(collection(firestoreDatabase,"users"));
      return{
        success: true,
        data: users.docs.map((doc) =>{
          return{
            ...doc.data(),
            id: doc.id,
          }
        }),
      };
    } catch (error) {
      return{
        success: false,
        message: error.message,
      };
    }
  }


  export const GetUserById = async (id) => {
    try{
      const user = await getDoc(doc(firestoreDatabase, "users", id));
      return{
        success: true,
        data:{
          ...user.data(),
          id: user.id,
        },
      }
    }
    catch(error){
      return{
        success: false,
        message: error.message,
      };
    }
  }