import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";  

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          } else {
            console.log("User data not found in Firestore");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserDetails(null);
        navigate("/login");  
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");  
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div>
      {userDetails ? (
        <>
          <h3>Welcome {userDetails.firstName}</h3>
          <div>
            <p>Email: {userDetails.email}</p>
            <p>First Name: {userDetails.firstName}</p>
            <p>Last Name: {userDetails.lastName}</p> 
            <p>ID number: {userDetails.ID}</p> 
            {userDetails.qrCode && (
              <div>
                <h5>Your QR Code:</h5>
                <img src={userDetails.qrCode} alt="User QR Code" />
              </div>
            )}
          </div>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
