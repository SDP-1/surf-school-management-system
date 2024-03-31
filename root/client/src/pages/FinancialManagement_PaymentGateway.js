import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PaymentGateway() {
  let payableAmount = 1000;
  let referenceNo = "REF0001";
  let nowPaybleAmount = payableAmount;
  let amountDue = 0;
  let cashType = "Cash Payment";
  let advancePayment = false;

  const [slip, setSlip] = useState(null);

  const onInputChange = (e) => {
    // console.log(e.target.files[0]);
    setSlip(e.target.files[0]);
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
  }, []);

  function cashPaymentSelect() {
    const cashPaymentElement = document.getElementById("cashPayment");
    const bankTransferElement = document.getElementById("bankTransfer");
    const dragandDropContainer = document.getElementById(
      "dragand-drop-container"
    );

    // Set cash payment selected
    cashPaymentElement.style.backgroundColor = "red";
    bankTransferElement.style.backgroundColor = ""; // Clear bank transfer selection
    dragandDropContainer.style.display = "none";

    cashType = "Cash Payment";
    console.log("clicked cash payment");
    // Call your specific function here
    // Example: YourFunction();
  }

  function bankTransferSelect() {
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
    console.log("clicked bank transfer");
    // Call your specific function here
    // Example: YourFunction();
  }

  const handleProceedToPayment = () => {
    // // Get the file input element
    // const fileInput = document.querySelector('input[type="file"]');

    // // Create a FormData object
    // const formData = new FormData();

    // // Append the selected files to the FormData object
    // for (let i = 0; i < fileInput.files.length; i++) {
    //   formData.append("sliip", fileInput.files[i]);
    // }

    const data = {
      refId: referenceNo,
      cashType: cashType,
      Advance: advancePayment,
      totalAmount: payableAmount,
      amountPaid: nowPaybleAmount,
      amountDue: amountDue,
      slip: slip,
    };

    // Make a POST request to your backend server to save the data to MongoDB
    axios
      .post("http://localhost:4000/payment/save", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        // Handle success (e.g., show a success message to the user)
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        // Handle error (e.g., show an error message to the user)
      });
  };

  return (
    <div>
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
                    {/* <div className="card-header">Cash</div> */}
                    <div
                      className="card-body"
                      id="cashPayment"
                      style={{
                        height: "4rem",
                      }}
                    >
                      <h4 className="card-title">Cash Payment</h4>
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
                    {/* <div className="card-header">Bank</div> */}
                    <div
                      className="card-body"
                      id="bankTransfer"
                      style={{
                        height: "4rem",
                      }}
                    >
                      <h4 className="card-title">Bank Transfer</h4>
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
                    {/* <span className="input-group-text">0.00</span> */}
                    <input
                      type="number"
                      className="form-control"
                      id="nowPayAmount"
                      aria-label="Dollar amount (with dot and two decimal places)"
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
              {/* <div className="p-2 d-flex">
                <div className="col-8">Coinsurance( % )</div>
                <div className="ml-auto">+ Rs. </div>
              </div>
              <div className="p-2 d-flex">
                <div className="col-8">Copayment</div>
                <div className="ml-auto">+ $40.00</div>
              </div> */}
              <div className="border-top px-4 mx-3"></div>
              <div className="p-2 d-flex pt-3">
                <div className="col-8">
                  <b>Amount due</b>
                </div>
                <div className="ml-auto" id="amountDue">
                  <b>Rs. {amountDue}</b>
                </div>
              </div>
              {/* <div className="p-2 d-flex">
                <div className="col-8">
                  Maximum out-of-pocket on Insurance Policy (not reached)
                </div>
                <div className="ml-auto">$6500.00</div>
              </div> */}
              {/* <div className="border-top px-4 mx-3"></div>
              <div className="p-2 d-flex pt-3">
                <div className="col-8">Insurance Responsibility</div>
                <div className="ml-auto">
                  <b>$71.76</b>
                </div>
              </div> */}
              {/* <div className="p-2 d-flex">
                <div className="col-8">
                  Patient Balance{" "}
                  <span className="fa fa-question-circle text-secondary"></span>
                </div>
                <div className="ml-auto">
                  <b>$71.76</b>
                </div>
              </div> */}
              {/* <div className="border-top px-4 mx-3"></div>
              <div className="p-2 d-flex pt-3">
                <div className="col-8">
                  <b>Total</b>
                </div>
                <div className="ml-auto">
                  <b className="green">$85.00</b>
                </div>
              </div> */}
            </div>

            {/* Dragand drop */}
            <div
              style={{
                width: "40rem",
                Height: "3rem",
                // overflow: "hidden",
                // border: "2px dashed #ccc",
                // padding: "1rem",
              }}
            >
              <div
                style={{
                  width: "60rem",
                  height: "200px",
                  // border: "2px dashed #ccc",
                  // padding: "1rem",
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                }}
              >
                <div className="container" id="dragand-drop-container">
                  <div className="row">
                    <div className="col-md-6">
                      <form method="post" action="#">
                        <div className="form-group files">
                          <label>Drag & Drop Files Here</label>
                          <input
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

        {/* Dragand drop
        <div className="container" id="dragand-drop-container">
          <div className="row">
            <div className="col-md-6">
              <form method="post" action="#" id="#">
                <div className="form-group files">
                  <label>Upload Your File </label>
                  <input type="file" className="form-control" multiple="" />
                </div>
              </form>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
