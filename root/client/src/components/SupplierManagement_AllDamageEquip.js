import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
//import { MdAdd } from "react-icons/md";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { GrDocumentPdf } from "react-icons/gr";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoImage from "./image/surfing-paradise-logo.png";

//import { GrNotification } from "react-icons/gr";

export default function AllDamageEquip() {
  const [damageEquipment, setequipment] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDamageEquipment, setFilteredDamageEquipment] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    function getDamageEquipment() {
      axios.get("http://localhost:4000/damageEquipment/damage").then((res) => {
        setequipment(res.data);
        setFilteredDamageEquipment(res.data); // Initialize filtered data
      }).catch((err) => {
        alert(err.message);
      })
    }
    getDamageEquipment();
  }, []);

  const handleDelete = (damageId) => {
    axios
  .delete(`http://localhost:4000/damageEquipment/deleteDamage/${damageId}`)
  .then((res) => {
        alert(res.data.message);
        navigate(0);
      })
  .catch((err) => {
        alert(err.message);
      });
  };

  const checkExpiry = () => {
    const currentDate = new Date();
    const expiredEquipment = filteredDamageEquipment.filter(
      (equipment) =>
        new Date(equipment.deliverydate).getTime() <=
        currentDate.getTime() - 2 * 24 * 60 * 60 * 1000
    );
    return expiredEquipment;
  };

  useEffect(() => {
    const expiredEquipment = checkExpiry();
    if (expiredEquipment.length > 0) {
      setNotifications((prevNotifications) => [
       ...prevNotifications,
        {
          id: Date.now(),
          message: `Equipment ${expiredEquipment[0].equipmentno} has expired`,
        },
      ]);
    }
  }, [filteredDamageEquipment]);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const searchTermLower = e.target.value.toLowerCase();
    setFilteredDamageEquipment(
      damageEquipment.filter((item) =>
        (item.damageId?.toLowerCase()?.includes(searchTermLower) ||
        item.equipmentno?.toString().includes(searchTerm) ||
        item.suppliername?.toLowerCase().includes(searchTermLower))
      )
    );
  };
 
  useEffect(() => {
    setFilteredDamageEquipment(
      damageEquipment.filter((item) =>
      (item.damageId?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item.equipmentno?.toString().includes(searchTerm) ||
      item.suppliername?.toLowerCase().includes(searchTerm.toLowerCase()||
      item.deliverydate.toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase()))
      )));
  }, [searchTerm, damageEquipment]);

  const [equipmentAlerts, setEquipmentAlerts] = useState({});

  const displayWarning = (equipment, currentDate) => {
    const equipmentNo = equipment.equipmentno;
  
    if (!equipmentAlerts[equipmentNo]) {
      const deliveryDate = new Date(equipment.deliverydate);
      if (!isNaN(deliveryDate)) {
        const numDaysUntilDelivery = Math.ceil((deliveryDate - currentDate) / (1000 * 60 * 60 * 24));
        if (!isNaN(numDaysUntilDelivery) && numDaysUntilDelivery >= 0 && numDaysUntilDelivery <= 2) {
          if (numDaysUntilDelivery === 0) {
            toast.warning(` ${equipmentNo} will be available  in today. Assigned to supplier ${equipment.suppliername}.`, {
              position: "top-right",
              autoClose: false, // prevent auto-closing
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.warning(` ${equipmentNo} will be available  in ${numDaysUntilDelivery} days. Assigned to supplier ${equipment.suppliername}.`, {
              position: "top-right",
              autoClose: false, // prevent auto-closing
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
  
          setEquipmentAlerts((prevEquipmentAlerts) => ({
            ...prevEquipmentAlerts,
            [equipmentNo]: true,
          }));
  
          const intervalId = setInterval(() => {
            const currentDate = new Date();
            const numDaysUntilDelivery = Math.ceil((deliveryDate - currentDate) / (1000 * 60 * 60 * 24));
  
            if (numDaysUntilDelivery < 0) {
              clearInterval(intervalId);
              toast.dismiss();
              setEquipmentAlerts((prevEquipmentAlerts) => {
                const newEquipmentAlerts = { ...prevEquipmentAlerts };
                delete newEquipmentAlerts[equipmentNo];
                return newEquipmentAlerts;
              });
            } else {
              toast.update(equipmentAlerts[equipmentNo], {
                render: `Equipment ${equipmentNo} will be available in ${numDaysUntilDelivery} days.`,
                autoClose: false,
              });
            }
          }, 1000);
        }
      }
    }
  };
  
    useEffect(() => {
      const currentDate = new Date();
    
      filteredDamageEquipment.forEach((equipment) => {
        const deliveryDate = new Date(equipment.deliverydate);
        deliveryDate.setHours(0, 0, 0, 0); // set time to 00:00:00
    
        // Compare only the dates
        if (deliveryDate.getDate() <= currentDate.getDate() + 2 &&
            deliveryDate.getMonth() === currentDate.getMonth() &&
            deliveryDate.getFullYear() === currentDate.getFullYear()) {
          displayWarning(equipment, currentDate);
        }
      });
    
    }, [filteredDamageEquipment]);
// Calculate sum of available items and in-stock items
const totalrepaircost = filteredDamageEquipment.reduce((acc, item) => acc + parseInt(item.repaircost || 0), 0);
   //generate report
   const generateReport = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const companyName = "Paradise Surf School";
     const companyAddress = "Midigama";
  
    // Add Equipment Inventory Report as the center top of the page
   // Set the font style for Surf Scool Management
  doc.setFont("bold");
  doc.setFontSize(20);
  doc.text("Surf Scool Management", doc.internal.pageSize.width / 2, 20, { align: "center" });

  // Set the font style for Equipment Inventory Report
  doc.setFont("bold");
  doc.setFontSize(15);
  doc.text("Damage Equipment Report", doc.internal.pageSize.width / 2, 30, { align: "center" });

  // Load the logo from an external source
const logo = new Image();
logo.src = logoImage;

// Add the logo to the top right of the page
doc.addImage(logo, "PNG", doc.internal.pageSize.width - 40, 5, 50, 50);
    // Set the company name and address on the right-hand side of the page after the middle
    doc.text(companyName, 10, 50);
    doc.text(companyAddress, 10, 55);
  
    // Set the table's position and width
    const tableWidth = 200;
    const tableHeight = 20 * filteredDamageEquipment.length;
    const leftMargin = (doc.internal.pageSize.width - tableWidth) / 2;
  
    // Add the table to the PDF
    doc.autoTable({
      head: [['Damage Id','Equipment No', 'Equipment Name', 'Damage Discription','Supplier Name', 'Supplier Email', 'Technician Name', 'Technician Email', 'Assigned date', 'Delivery date', 'Repair Cost']],
      body: filteredDamageEquipment.map((damageEquipment, index) => [damageEquipment.damageId,damageEquipment.equipmentno, damageEquipment.equipmentname, damageEquipment.damagediscription,damageEquipment.suppliername,damageEquipment.supplieremail, damageEquipment.technicianname, damageEquipment.technicianemail,new Date(damageEquipment.assigneddate).toLocaleDateString() , new Date(damageEquipment.deliverydate).toLocaleDateString(), damageEquipment.repaircost]),
      margin: { left: leftMargin, top: 70 },
      width: tableWidth,
      didDrawPage: (data) => {
        // Calculate the height of the table
  const tableHeight = filteredDamageEquipment.length * 20;

  doc.text("Total Repair Cost: Rs." + totalrepaircost, 10, doc.internal.pageSize.height - 80);
  

  // Draw a line below the table

        // Add page numbers and footer
        const currentPage = data.pageCount;
        const pageText = "Page " + currentPage;
        doc.text(pageText, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: "center" });
      },
    });
  
    // Add footer details
    doc.text("Prepared by:Nirmani K M I", 10, doc.internal.pageSize.height - 25);
    doc.text("Date: " + new Date().toLocaleDateString(), 10, doc.internal.pageSize.height - 20);
    
  
    doc.save("damageequipment_report.pdf");
  };

  return (
    <div className="container mt-5"  >
      {/* <div className="mt-3">
        <Link className="btn btn-success" to="/add">
        <MdAdd />Add Damage Equipment
        </Link>
      </div> */}
     
      <div className="mt-3">
        <Link className="btn btn-primary" to="/supplier/t">
          <MdEmail /> Assign supplier
        </Link>
      </div>
      
      <div className="row mt-3 mb-3">
      <div className="col d-flex justify-content-end">
  <div className="input-group w-25">
    <input
      type="text"
      placeholder="Search..."
      className="form-control"
      value={searchTerm}
      onChange={handleSearch}
    />
    <button className="btn btn-outline-primary" type="button">
      <IoSearchSharp />
    </button>
   
  </div>
  
</div>
</div>
      <div className="table-responsive">
        <table className="table table-hover mt-5">
          <thead>
            <tr className="bg-dark text-white">
              <th scope="col">Damage Id</th>
              <th scope="col">Equipment No</th>
              <th scope="col">Equipment Name</th>
              <th scope="col">Damage Discription</th>
              <th scope="col">Supplier name</th>
              <th scope="col">Supplier Email</th>
              <th scope="col">Technician name</th>
              <th scope="col">Technician Email</th>
              <th scope="col">Assigned Date</th>
              <th scope="col">Delivery Date</th>
              <th scope="col">Repair Cost</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDamageEquipment.map((damageEquipment, index) => (
              <tr key={index}>
                <td>{damageEquipment.damageId}</td>
                <td>{damageEquipment.equipmentno}</td>
                <td>{damageEquipment.equipmentname}</td>
                <td>{damageEquipment.damagediscription}</td>
                <td>{damageEquipment.suppliername}</td>
                <td>{damageEquipment.supplieremail}</td>
                <td>{damageEquipment.technicianname}</td>
                <td>{damageEquipment.technicianemail}</td>
                <td>{new Date(damageEquipment.assigneddate).toLocaleDateString()}</td>
                <td>{new Date(damageEquipment.deliverydate).toLocaleDateString()}</td>
                <td>{damageEquipment.repaircost}</td>
                <td>
  <div style={{ display: "flex", alignItems: "center" }}>
    <Link to={`/supplier/editDamageEquipment/${damageEquipment.damageId}`}>
      <button className="btn btn-success me-3">
        <AiFillEdit />
      </button>
    </Link>
    
      <button className="btn btn-danger me-3"  onClick={() => handleDelete(damageEquipment.damageId)}>
        <AiFillDelete />
      </button>
    
  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3">
  <button className="btn btn-primary" onClick={generateReport}>
  <GrDocumentPdf /> Generate Damage Equipment Report 
  </button>
</div>
      </div>
      <ToastContainer />
    </div>
  );
}