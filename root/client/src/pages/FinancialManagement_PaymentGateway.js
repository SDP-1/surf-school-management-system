import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
 
export default function PaymentGateway({
  onClose,
  referenceNo,
  payableAmount,
  details,
  onSuccessPayment,
}) {
  // let payableAmount = 1000;
  // let referenceNo = "REF0001";
  let nowPaybleAmount = payableAmount;
  let amountDue = 0;
  let cashType = "Cash Payment";
  let advancePayment = false;
  // let details = "Buy surf bord";

  const [slip, setSlip] = useState(null);

  function resetValues() {
    const nowPayAmountElement = document.getElementById("nowPayAmount");
    const nowPaybleAmountElement = document.getElementById("nowPaybleAmount");
    const amountDueElement = document.getElementById("amountDue");

    nowPaybleAmount = nowPayAmountElement.value;
    if (nowPaybleAmount == "") {
      nowPaybleAmount = 0;
    } else {
      nowPaybleAmount = parseFloat(nowPaybleAmount);
    }

    amountDue = payableAmount - nowPaybleAmount;
    if (amountDue > 0) {
      advancePayment = true;
    } else {
      advancePayment = false;
    }

    nowPaybleAmountElement.textContent = `Rs. ${nowPaybleAmount.toFixed(2)}`;
    amountDueElement.textContent = `Rs. ${amountDue.toFixed(2)}`;

    // Add bold font style when the value changes
    nowPaybleAmountElement.style.fontWeight = "bold";
    amountDueElement.style.fontWeight = "bold";
  }

  const onInputChange = (e) => {
    // console.log(e.target.files[0]);
    setSlip(e.target.files[0]);
    enablePaymentProcessButton();
  };

  //convert to two decimalpace
  payableAmount = payableAmount.toFixed(2);
  nowPaybleAmount = nowPaybleAmount.toFixed(2);
  amountDue = amountDue.toFixed(2);

  useEffect(() => {
    // Call cashPaymentSelect to set it as default selected
    cashPaymentSelect();

    // Update other values according to the input amount
    const nowPayAmountElement = document.getElementById("nowPayAmount");
    const nowPaybleAmountElement = document.getElementById("nowPaybleAmount");
    const amountDueElement = document.getElementById("amountDue");

    // Add click event listener to nowPayAmountElement
    nowPayAmountElement.addEventListener("click", () => {
      // Select the value of nowPayAmountElement
      nowPayAmountElement.select();
    });

    nowPayAmountElement.addEventListener("input", () => {
      nowPaybleAmount = nowPayAmountElement.value;
      if (nowPaybleAmount == "") {
        nowPaybleAmount = 0;
      } else {
        nowPaybleAmount = parseFloat(nowPaybleAmount);
      }

      amountDue = payableAmount - nowPaybleAmount;
      if (amountDue > 0) {
        advancePayment = true;
      } else {
        advancePayment = false;
      }

      nowPaybleAmountElement.textContent = `Rs. ${nowPaybleAmount.toFixed(2)}`;
      amountDueElement.textContent = `Rs. ${amountDue.toFixed(2)}`;

      // Add bold font style when the value changes
      nowPaybleAmountElement.style.fontWeight = "bold";
      amountDueElement.style.fontWeight = "bold";
    });

    document
      .getElementById("dragAndDrop-container")
      .addEventListener("click", function (event) {
        bankTransferSelect();
      });
  }, []);

  function disablePaymentProcessButton() {
    const proceedButton = document.getElementById("proceedButton");
    if (proceedButton) {
      proceedButton.disabled = true;
    }
  }

  function enablePaymentProcessButton() {
    const proceedButton = document.getElementById("proceedButton");
    if (proceedButton) {
      proceedButton.disabled = false;
    }
  }

  function cashPaymentSelect() {
    enablePaymentProcessButton();
    const cashPaymentElement = document.getElementById("cashPayment");
    const bankTransferElement = document.getElementById("bankTransfer");
    const dragandDropContainer = document.getElementById(
      "dragand-drop-container"
    );
    const dragandDrop = document.getElementById("dragAndDrop-container");
    dragandDrop.value = null;
    setSlip(null);

    // Set cash payment selected
    cashPaymentElement.style.backgroundColor = "red";
    bankTransferElement.style.backgroundColor = ""; // Clear bank transfer selection
    dragandDropContainer.style.display = "none";

    cashType = "Cash Payment";
    resetValues();
  }

  function bankTransferSelect() {
    disablePaymentProcessButton();
    const cashPaymentElement = document.getElementById("cashPayment");
    const bankTransferElement = document.getElementById("bankTransfer");
    const dragandDropContainer = document.getElementById(
      "dragand-drop-container"
    );

    // Set bank transfer selected
    bankTransferElement.style.backgroundColor = "red";
    cashPaymentElement.style.backgroundColor = ""; // Clear cash payment selection
    dragandDropContainer.style.display = "block";

    cashType = "Bank Transfer";

    resetValues();
    // print();
  }

  const handleProceedToPayment = () => {
    // Show a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to proceed with the payment?"
    );

    if (isConfirmed) {
      // Set payment processing to true

      // Continue with the payment process
      const dragandDropContainer = document.getElementById(
        "dragand-drop-container"
      );
      if (dragandDropContainer.style.display !== "none") {
        // Call your function here
        bankTransferSelect();
      } else {
        cashPaymentSelect();
      }

      const data = {
        refId: referenceNo,
        cashType: cashType,
        Advance: advancePayment,
        totalAmount: payableAmount,
        amountPaid: nowPaybleAmount,
        amountDue: amountDue,
        details: details,
        slip: slip,
      };

      // Make a POST request to your backend server to save the data to MongoDB
      axios
        .post("http://localhost:4000/payment/save", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log("Data saved successfully:", response.data);
          // Show a success message to the user
          disablePaymentProcessButton();
          alert("Payment successful!");
          onSuccessPayment();
        })
        .catch((error) => {
          console.error("Error saving data:", error);
          // Show an error message to the user
          alert("Error processing payment. Please try again later.");
        })
        .finally(() => {
          // Set payment processing to false after completion or failure
        });
    } else {
      // Do nothing if the user cancels the confirmation
    }
  };

  return (
    <div className="payment-modal">
      <button className="close-button" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <style>{`

        .files input {
          outline: 2px dashed #92b0b3;
          outline-offset: -10px;
          -webkit-transition: outline-offset .15s ease-in-out, background-color .15s linear;
          transition: outline-offset .15s ease-in-out, background-color .15s linear;
          padding: 120px 0px 85px 35%;
          text-align: center !important;
          margin: 0;
          width: 100% !important;
        }import { useEffect } from 'react';

        .files input:focus {
          outline: 2px dashed #92b0b3;
          outline-offset: -10px;
          -webkit-transition: outline-offset .15s ease-in-out, background-color .15s linear;
          transition: outline-offset .15s ease-in-out, background-color .15s linear;
          border: 1px solid #92b0b3;
        }
        .files {
          position: relative;
        }
        .files:after {
          pointer-events: none;
          position: absolute;
          top: 60px;
          left: 0;
          width: 50px;
          right: 0;
          height: 56px;
          content: "";
          display: block;
          margin: 0 auto;
          background-size: 100%;
          background-repeat: no-repeat;
        }
        .color input {
          background-color: #f1f1f1;
        }
        .files:before {
          position: absolute;
          bottom: 10px;
          left: 0;
          pointer-events: none;
          width: 100%;
          right: 0;
          height: 57px;
          content: " or drag it here. ";
          display: block;
          margin: 0 auto;
          color: #2ea591;
          font-weight: 600;
          text-transform: capitalize;
          text-align: center;
        }

        .payment-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          width: 1200px; /* Set the width to 500 pixels */
          height: 560px; /* Set the height to 700 pixels */
          max-width: 90%; /* Set maximum width for responsiveness */
          max-height: 90vh; /* Set maximum height for responsiveness */
          overflow-y: auto;
        }
        
        
        .payment-modal h4,
        .payment-modal h5 {
          margin-top: 0;
        }
        
        .payment-modal hr {
          margin: 20px 0;
        }
        
        .payment-modal input[type="button"] {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .payment-modal input[type="button"]:hover {
          background-color: #0056b3;
        }

        .payment-modal {
          /* Modal styles */
        }
        
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-size: 20px;
          color: #333;
        }
        
        .close-button:hover {
          color: #000;
        }}

      `}</style>

      <div className="container rounded bg-white">
        <div className="row d-flex justify-content-center pb-5">
          <div className="col-sm-5 col-md-5 ml-1">
            <div className="py-4 d-flex flex-row">
              <h5>
                <span className="fa fa-check-square-o"></span>
                <b>ELIGIBLE</b> |{" "}
              </h5>
              <span className="pl-2">Pay</span>
            </div>
            <div style={{ display: "flex" }}>
              <h4 className="green" style={{ marginRight: "100px" }}>
                REF : {referenceNo}
              </h4>
              <h4 className="green" style={{ color: "red" }}>
                Rs.{payableAmount}
              </h4>
            </div>
            <br />
            <h5>Choose The payment Method</h5>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                {/* Corrected onClick event handler */}
                <a onClick={cashPaymentSelect}>
                  <div
                    className="card text-bg-primary mb-3"
                    style={{
                      width: "13rem",
                      marginRight: "20px",
                      backgroundColor: "red",
                    }} // Corrected style property names
                  >
                    <div
                      className="card-body"
                      id="cashPayment"
                      style={{
                        height: "4rem",
                      }}
                    >
                      <h5 className="card-title">Cash Payment</h5>
                    </div>
                  </div>
                </a>
              </div>

              <div>
                <a onClick={bankTransferSelect}>
                  <div
                    className="card text-bg-primary mb-3"
                    style={{
                      width: "13rem",
                      marginRight: "20px",
                      backgroundColor: "red",
                    }}
                  >
                    <div
                      className="card-body"
                      id="bankTransfer"
                      style={{
                        height: "4rem",
                      }}
                    >
                      <h5 className="card-title">Bank Transfer</h5>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <hr />
            <div className="pt-2">
              <div className="d-flex">
                <div>
                  <p>
                    <b>Advance payment also acceptable.</b>
                  </p>
                </div>
              </div>

              <form className="pb-3">
                <div style={{ display: "flex", marginTop: "20px" }}>
                  <b>Payable amount : </b>
                  <div
                    className="input-group mb-3"
                    style={{ maxWidth: "250px", marginLeft: "30px" }}
                  >
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className="form-control"
                      id="nowPayAmount"
                      aria-label="LKR amount (with dot and two decimal places)"
                      defaultValue={payableAmount}
                    />
                  </div>
                </div>
              </form>
              <form className="pb-3"></form>
              <div>
                <input
                  type="button"
                  value="Proceed to payment"
                  id="proceedButton"
                  className="btn btn-primary btn-block"
                  onClick={handleProceedToPayment}
                />
              </div>
            </div>
          </div>
          <div
            className="col-sm-3 col-md-4 offset-md-1 mobile"
            style={{ padding: "0" }}
          >
            <div className="py-4 d-flex justify-content-end">
              <h6>
                <a href="#">Cancel and return to website</a>
              </h6>
            </div>
            <div className="bg-light rounded d-flex flex-column">
              <div className="p-2 ml-3">
                <h4>Order Recap</h4>
              </div>
              <div className="p-2 d-flex">
                <div className="col-8">Full Amount</div>
                <div className="ml-auto">
                  <b>Rs. {payableAmount}</b>
                </div>
              </div>
              <div className="p-2 d-flex">
                <div className="col-8">Now payable amount</div>
                <div className="ml-auto" id="nowPaybleAmount">
                  <b>- Rs. {nowPaybleAmount}</b>
                </div>
              </div>
              <div className="border-top px-4 mx-3"></div>
              <div className="p-2 d-flex pt-3">
                <div className="col-8">
                  <b>Amount due</b>
                </div>
                <div className="ml-auto" id="amountDue">
                  <b>Rs. {amountDue}</b>
                </div>
              </div>
            </div>

            {/* Dragand drop */}
            <div
              style={{
                width: "40rem",
                Height: "3rem",
              }}
            >
              <div
                style={{
                  width: "60rem",
                  height: "200px",
                }}
              >
                <div className="container" id="dragand-drop-container">
                  <div className="row">
                    <div className="col-md-6">
                      <form method="post" action="#">
                        <div className="form-group files">
                          <label>Drag & Drop Files Here</label>
                          <input
                            id="dragAndDrop-container"
                            type="file"
                            className="form-control"
                            multiple=""
                            accept="image/*,application/pdf"
                            onChange={onInputChange}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <link
          href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          rel="stylesheet"
          id="bootstrap-css"
        />
      </div>
    </div>
  );
}
