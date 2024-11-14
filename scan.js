import React, { useState, useEffect } from "react";
import QRScanner from "react-qr-scanner"; // QR scanner component
import { toast } from "react-toastify"; // For displaying toast notifications
import "react-toastify/dist/ReactToastify.css"; // Styles for toast notifications
import { saveTimestamp } from './saveTimestamp'; // Import the saveTimestamp function

function Scan() {
  const [scanResult, setScanResult] = useState(""); // Store scanned result
  const [status, setStatus] = useState(""); // Store the action (IN/OUT)
  const [scanning, setScanning] = useState(false); // Control scanner state

  // Handle successful scan
  const handleScan = async (data) => {
    if (data) {
      setScanResult(data.text); // Set the scanned result

      // Extract user info from the scanned QR code text
      const [fname, lname, IDnumber] = data.text.split(" ");
      
      // Save the timestamp with the IN or OUT status
      await saveTimestamp(fname, lname, IDnumber, status);
      
      // Display success toast notification
      setStatus(`${status} - Approved`);
      setScanning(false); // Turn off scanning after processing
      toast.success(`QR Code ${status} processed successfully!`, { position: "top-center" });
    }
  };

  // Handle scan error
  const handleError = (error) => {
    console.error(error);
  };

  // Handle IN/OUT button click
  const handleButtonClick = (action) => {
    setStatus(action);
    setScanResult(""); // Clear previous scan result
    setScanning(true); // Enable scanning
  };

  useEffect(() => {
    if (status === "IN" || status === "OUT") {
      toast.success(`QR Code ${status}`, { position: "top-center" });
    }
  }, [status]);

  return (
    <div>
      <h1>QR Code Scanner</h1>

      {/* Buttons for IN and OUT actions */}
      <div>
        <button onClick={() => handleButtonClick("IN")}>IN</button>
        <button onClick={() => handleButtonClick("OUT")}>OUT</button>
      </div>

      {/* QR code scanner */}
      <div>
        {scanning && (
          <QRScanner
            delay={300}
            style={{ width: "100%" }}
            onScan={handleScan}
            onError={handleError}
          />
        )}
        {!scanning && <p>Scanner is off. Please click "IN" or "OUT" to start scanning.</p>}
      </div>

      {/* Display scanned result and status */}
      {scanResult && <p>Scanned QR Code: {scanResult}</p>}
      {status && <p>Status: {status}</p>}
    </div>
  );
}

export default Scan;
