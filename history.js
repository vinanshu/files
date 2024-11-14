import React, { useEffect, useState } from "react";
import { db, auth } from "../config/firebase"; // Firebase config
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styling

function History() {
  const [historyData, setHistoryData] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (auth.currentUser) {
        const { displayName, uid } = auth.currentUser;
        const docRef = doc(db, "history", `${displayName} ${uid}`); // Reference to user document

        try {
          const docSnap = await getDoc(docRef); // Fetch the document
          if (docSnap.exists()) {
            setHistoryData(docSnap.data()); // Set the data in state
          } else {
            console.log("No data found for this user.");
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      } else {
        console.log("No user is logged in.");
      }
    };

    fetchHistory(); // Call function to fetch data
  }, []); // Runs once on component mount

  return (
    <div className="container">
      <h2>History</h2>
      {historyData ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Direction</th>
            </tr>
          </thead>
          <tbody>
            {/* Display IN times */}
            {historyData.inTimes && historyData.inTimes.length > 0 ? (
              historyData.inTimes.map((entry, index) => (
                <tr key={`in-${index}`}>
                  <td>{entry.IDnumber}</td>
                  <td>{entry.fname}</td>
                  <td>{entry.lname}</td>
                  <td>{entry.date}</td>
                  <td>{entry.time}</td>
                  <td>IN</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No IN timestamps found.</td>
              </tr>
            )}

            {/* Display OUT times */}
            {historyData.outTimes && historyData.outTimes.length > 0 ? (
              historyData.outTimes.map((entry, index) => (
                <tr key={`out-${index}`}>
                  <td>{entry.IDnumber}</td>
                  <td>{entry.fname}</td>
                  <td>{entry.lname}</td>
                  <td>{entry.date}</td>
                  <td>{entry.time}</td>
                  <td>OUT</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No OUT timestamps found.</td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <p>Loading history data...</p>
      )}
    </div>
  );
}

export default History;
