import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { GrDocumentPdf } from "react-icons/gr";
import { MdAdd } from "react-icons/md";


export default function AllEquipment() {
  const [equipment, setequipment] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [totalInStockItems, setTotalInStockItems] = useState(0);
 

  useEffect(() => {
    function getEquipment() {
      axios
     .get("http://localhost:4000/equipment/")
     .then((res) => {
          setequipment(res.data);
          setTotalInStockItems(getTotalQuantityInStock(res.data));
        })
     .catch((err) => {
          alert(err.message);
        });
    }
    getEquipment();
  }, []);

  const handleDelete = (equipmentno) => {
    axios
   .delete(`http://localhost:4000/equipment/delete/${equipmentno}`)
   .then((res) => {
        alert(res.data.message);
        navigate(0);
      })
   .catch((err) => {
        alert(err.message);
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (equipment.every((item) => (item.equipmentno || "").toString().includes(searchTerm || "") &&!((item.equipmentname || "").toLowerCase().includes(searchTerm?.toLowerCase() || "")))) {
      setSearchTerm("");
    }
  };

  
  const filteredEquipment = equipment.filter((item) =>
  (item.equipmentno || "").toString().includes(searchTerm) ||
  (item.equipmentname || "").toLowerCase().includes(searchTerm.toLowerCase())
);

  // Calculate sum of available items and in-stock items
  const totalAvailableItems = filteredEquipment.reduce((acc, item) => acc + parseInt(item.availableequipment || 0), 0);
 

  console.log(totalInStockItems);
  //generate report
  const generateReport = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const companyName = "Paradise Surf School";
const companyAddress = "Midigama";
  
  doc.setFont("bold");
  doc.setFontSize(20);
  doc.text("Surf Scool Management", doc.internal.pageSize.width / 2, 20, { align: "center" });

  
  doc.setFont("bold");
  doc.setFontSize(15);
  doc.text("Equipment Inventory Report", doc.internal.pageSize.width / 2, 30, { align: "center" });

 
const logo = new Image();
logo.src = "https://static.vecteezy.com/system/resources/previews/000/660/538/original/vector-surfing-paradise-logo.jpg";


doc.addImage(logo, "PNG", doc.internal.pageSize.width - 40, 5, 50, 50);
    
    doc.text(companyName, 10, 50);
    doc.text(companyAddress, 10, 55);
  
    
    const tableWidth = 200;
    const tableHeight = 20 * filteredEquipment.length;
    const leftMargin = (doc.internal.pageSize.width - tableWidth) / 2;
  
    
    doc.autoTable({
      head: [['Equipment No', 'Equipment Name', 'Item Description', 'Quantity In Stock', 'Quantity Required', 'Purchase to be made', 'Available Equipment', 'Rental Equipment', 'Damage Equipment']],
      body: filteredEquipment.map((equipment, index) => [equipment.equipmentno, equipment.equipmentname, equipment.equipmentdescription, equipment.quantityinstock, equipment.quantityrequired, equipment.purchasetobemade, equipment.availableequipment, equipment.rentalequipment, equipment.damageequipment]),
      margin: { left: leftMargin, top: 70 },
      width: tableWidth,
      didDrawPage: (data) => {
        
  const tableHeight = filteredEquipment.length * 20;

  doc.text("Total Available Items: " + totalAvailableItems, 10, doc.internal.pageSize.height - 80);
  doc.text("Total In-Stock Items: " + totalInStockItems, 10, doc.internal.pageSize.height - 70, { align: "left" });

  
  const yStart = data.settings.margin.top + tableHeight+10;
  const yEnd = data.settings.margin.top + doc.internal.pageSize.height-40;
  doc.line(data.settings.margin.left, yStart,doc.internal.pageSize.width - data.settings.margin.right, yStart);
        
        const currentPage = data.pageCount;
        const pageText = "Page " + currentPage;
        doc.text(pageText, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: "center" });
      },
    });
  
    
    doc.text("Prepared by:Nirmani K M I", 10, doc.internal.pageSize.height - 25);
    doc.text("Date: " + new Date().toLocaleDateString(), 10, doc.internal.pageSize.height - 20);
    
  
    doc.save("equipment_report.pdf");
  };
  const getTotalQuantityInStock = (equipmentList) => {
    return equipmentList.reduce((acc, equipment) => acc + parseInt(equipment.quantityinstock || 0), 0);
  }

return (
    <div className="container mt-5">
      
     <div className="mt-3">
  <Link className="btn btn-success" to="/Equipment_Management/addEquipment">
    <MdAdd /> Add Equipment
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
      <table className="table mt-5">
        <thead>
          <tr className="bg-dark">
            <th scope="col">Equipment No</th>
            <th scope="col">Equipment Name</th>
            <th scope="col">Equipment Description</th>
            <th scope="col">Quantity In Stock</th>
            <th scope="col">Quantity Required</th>
            <th scope="col">Purchase to be made</th>
            <th scope="col">Available Equipment</th>
            <th scope="col">Rental Equipment</th>
            <th scope="col">Damage Equipment</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {filteredEquipment.map((equipment, index) => (
            <tr key={index}>
              <td>{equipment.equipmentno}</td>
              <td>{equipment.equipmentname}</td>
              <td>{equipment.equipmentdescription}</td>
              <td>{equipment.quantityinstock}</td>
              <td>{equipment.quantityrequired}</td>
              <td>{equipment.purchasetobemade}</td>
              <td>{equipment.availableequipment}</td>
              <td>{equipment.rentalequipment}</td>
              <td>{equipment.damageequipment}</td>
              <td>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Link to={`/Equipment_Management/editEquipment/${equipment.equipmentno}`}>
                    <button className="btn btn-success me-3">
                      <AiFillEdit />
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger "
                    onClick={() => handleDelete(equipment.equipmentno)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
     
      <div className="mt-3">
  <button className="btn btn-primary" onClick={generateReport}>
  <GrDocumentPdf /> Generate Inventory Report 
  </button>

  
</div>


    </div>
  );
}


