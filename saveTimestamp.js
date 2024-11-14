import { db } from "../config/firebase";
import { doc, updateDoc, arrayUnion, setDoc, getDoc } from "firebase/firestore"; 
import { format } from "date-fns"; 

// Function to save scan data to Firestore
export const saveTimestamp = async (fname, lname, IDnumber, direction) => {
  const timeStampData = {
    time: format(new Date(), "hh:mm:ss a"), // 12-hour format with AM/PM
    date: format(new Date(), "dd/MM/yyyy"),
  };

  try {
    const docRef = doc(db, "TIME", `${fname} ${lname} ${IDnumber}`);
    
    // Check if document exists
    const docSnap = await getDoc(docRef);
    
    // Initialize document if it doesn’t exist
    if (!docSnap.exists()) {
      await setDoc(docRef, { inTimes: [], outTimes: [] });
    }

    if (direction === "IN") {
      // Add to inTimes array
      await updateDoc(docRef, { inTimes: arrayUnion(timeStampData) });
      console.log("IN timestamp saved successfully!");
    } else if (direction === "OUT") {
      // Add to outTimes array
      await updateDoc(docRef, { outTimes: arrayUnion(timeStampData) });
      console.log("OUT timestamp saved successfully!");
    } else {
      console.error("Invalid direction specified. Use 'IN' or 'OUT'.");
    }
  } catch (error) {
    console.error("Error saving timestamp: ", error);
  }
};
