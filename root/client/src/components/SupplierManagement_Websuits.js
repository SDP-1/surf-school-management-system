import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
//import { IoSearchSharp } from "react-icons/io5";
//import { MdAdd } from "react-icons/md";
//import { AiFillEye } from 'react-icons/ai';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { GrDocumentPdf } from "react-icons/gr";
import logoImage from "./image/surfing-paradise-logo.png"; 
export default function AllSupplier() {
  const [allsupplier, setAllSupplier] = useState([]);
 // const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function getAllSupplier() {
      axios
        .get("http://localhost:4000/supplier/allsupplier")
        .then((res) => {
          setAllSupplier(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getAllSupplier();
  }, []);

  const handleDelete = (suppliercode) => {
    axios
      .delete(`http://localhost:4000/supplier/deletesupplier/${suppliercode}`)
      .then((res) => {
        alert(res.data.message);
        navigate(0);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     if (
//         allsupplier.every(
//           (allsupplier) =>
//             allsupplier.suppliercode.toString().includes(e.target.value) &&
//             !allsupplier.suppliername.toLowerCase().includes(e.target.value.toLowerCase())
//         )
//       ) {
//         setSearchTerm("");
//       }
//   };

  const filteredSupplier = allsupplier
    .filter((supplier) => supplier.equipment.toLowerCase() === "web suits")
    .sort((a, b) => a.price - b.price);
  //   const filteredSupplier = allsupplier.filter((allsupplier) =>
  //   allsupplier.suppliercode.toString().includes(searchTerm) ||
  //   allsupplier.suppliername.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // Generate report
  const generateSupplierReport = () => {
    const doc = new jsPDF("p", "mm", "a4");
  
    const companyName = "Paradise Surf School";
    const companyAddress = "Midigama";
  
    doc.setFont("bold");
    doc.setFontSize(20);
    doc.text("Supplier Management", doc.internal.pageSize.width / 2, 20, { align: "center" });
  
    doc.setFont("bold");
    doc.setFontSize(15);
    doc.text("Supplier Details Report", doc.internal.pageSize.width / 2, 30, { align: "center" });
  
    const logo = new Image();
    logo.src = logoImage
    doc.addImage(logo, "PNG", doc.internal.pageSize.width - 40, 5, 50, 50);
  
    doc.text(companyName, 10, 50);
    doc.text(companyAddress, 10, 55);
  
    const tableWidth = 200;
    const tableHeight = 20 * filteredSupplier.length;
    const leftMargin = (doc.internal.pageSize.width - tableWidth) / 2;
  
    let totalCost = 0; // Initialize total cost
  
    doc.autoTable({
      head: [['Supplier Code', 'Supplier Name', 'Supplier Email', 'Supplier Type', 'Date', 'Supplier Phone', 'Equipment', 'Price', 'Quantity', 'Note']],
      body: filteredSupplier.map((supplier) => {
        // Calculate cost for each supplier and add to total cost
        const cost = supplier.price * supplier.quantity;
        totalCost += cost;
        return [
          supplier.suppliercode,
          supplier.suppliername,
          supplier.supplieremail,
          supplier.suppliertype,
          new Date(supplier.date).toLocaleDateString(),
          supplier.supplierphone,
          supplier.equipment,
          supplier.price,
          supplier.quantity,
          supplier.note
        ];
      }),
      margin: { left: leftMargin, top: 70 },
      width: tableWidth,
      didDrawPage: (data) => {
        const tableHeight = filteredSupplier.length * 20;
        doc.text("Total Suppliers: " + filteredSupplier.length, 10, doc.internal.pageSize.height - 90);
        doc.text("Total Cost Annually: Rs." + totalCost, 10, doc.internal.pageSize.height - 80);
        const currentPage = data.pageCount;
        const pageText = "Page " + currentPage;
        doc.text(pageText, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: "center" });
      },
    });
  
    doc.text("Charindu Liyanage", 10, doc.internal.pageSize.height - 25);
    doc.text("Date: " + new Date().toLocaleDateString(), 10, doc.internal.pageSize.height - 20);
  
    doc.save("supplier_report_SurfBoard.pdf");
  };

  return (
    <div className="container mt-5">
      {/* <div className="mt-3">
        <Link className="btn btn-success" to="/addsup">
          <MdAdd />Add Supplier
        </Link>
      </div> */}
      <div className="row mt-3 mb-3">
        <div className="col d-flex justify-content-end">
          {/* <div className="input-group w-25">
            <input
              type="text"
              placeholder="Search Supplier"
              className="form-control"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="btn btn-outline-primary" type="button">
              <IoSearchSharp />
            </button>
          </div> */}
        </div>
      </div>
      <table className="table mt-5">
        <thead>
          <tr className="bg-dark">
            <th scope="col">Supplier Code</th>
            <th scope="col">Supplier Name</th>
            <th scope="col">Supplier Email</th>
            <th scope="col">Supplier Type</th>
            <th scope="col">Date</th>
            <th scope="col">Supplier Phone</th>
            <th scope="col">Equipment</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Note</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {filteredSupplier.map((supplierall, index) => (
            <tr key={index}>
              <td>{supplierall.suppliercode}</td>
              <td>{supplierall.suppliername}</td>
              <td>{supplierall.supplieremail}</td>
              <td>{supplierall.suppliertype}</td>
              <td>{new Date(supplierall.date).toLocaleDateString()}</td>
              <td>{supplierall.supplierphone}</td>
              <td>{supplierall.equipment}</td>
              <td>{supplierall.price}</td>
              <td>{supplierall.quantity}</td>
              <td>{supplierall.note}</td>
              <td>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Link to={`/supupdate/${supplierall.suppliercode}`}>
                    <button className="btn btn-success me-3">
                      <AiFillEdit />
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(supplierall.suppliercode)}
                  >
                    <MdDelete />
                  </button>
                  {/* <Link to={`/supprofile/${supplierall.suppliercode}`}>
                    <button className="btn btn-primary me-3">
                      <AiFillEye />
                    </button>
                  </Link> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3">
        <button className="btn btn-primary" onClick={generateSupplierReport}>
          <GrDocumentPdf /> Generate Annual Supplier Report
        </button>
      </div>
    </div>
  );
}
