export default function PaymentGateway() {
  let paybleAmount = 1000;
  let refaraceNo = "REF0001";

  function cashPaymentSelect() {
    console.log("Clicked");
  }

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
      }
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
        background-image: url(https://image.flaticon.com/icons/png/128/109/109612.png);
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

      <div class="container rounded bg-white">
        <div class="row d-flex justify-content-center pb-5">
          <div class="col-sm-5 col-md-5 ml-1">
            <div class="py-4 d-flex flex-row">
              <h5>
                <span class="fa fa-check-square-o"></span>
                <b>ELIGIBLE</b> |{" "}
              </h5>
              <span class="pl-2">Pay</span>
            </div>

            <div style={{ display: "flex" }}>
              <h4 class="green" style={{ "margin-right": "100px" }}>
                REF : {refaraceNo}
              </h4>
              <h4 class="green" style={{ color: "red" }}>
                Rs.{paybleAmount}
              </h4>
            </div>
            <br />
            <h5>Choose The payment Method</h5>

            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <a onClick={cashPaymentSelect()}>
                  <div
                    className="card text-bg-primary mb-3"
                    style={{ Width: "20rem", "margin-right": "20px" }}
                  >
                    <div className="card-header">Cash</div>
                    <div className="card-body">
                      <h5 className="card-title">Cash Payment</h5>
                      <p lass="card-text">customer paid viva cash feafdfdaf</p>
                    </div>
                  </div>
                </a>
              </div>

              <div>
                <div
                  className="card text-bg-primary mb-3"
                  style={{ maxWidth: "20rem" }}
                >
                  <div className="card-header">Bank</div>
                  <div className="card-body">
                    <h5 className="card-title">Bank Transfer</h5>
                    <p lass="card-text">customer paid viva banak transfer</p>
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <div class="pt-2">
              <div class="d-flex">
                <div>
                  <p>
                    <b>Advance payment also acceptable.</b>
                  </p>
                </div>
              </div>

              <form class="pb-3">
                <div style={{ display: "flex", "margin-top": "20px" }}>
                  <b>Payable amount : </b>
                  <div
                    class="input-group mb-3"
                    style={{ maxWidth: "250px", "margin-left": "30px" }}
                  >
                    <span class="input-group-text">$</span>
                    <span class="input-group-text">0.00</span>
                    <input
                      type="text"
                      class="form-control"
                      aria-label="Dollar amount (with dot and two decimal places)"
                    />
                  </div>
                </div>
              </form>
              <form class="pb-3"></form>
              <div>
                <input
                  type="button"
                  value="Proceed to payment"
                  class="btn btn-primary btn-block"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-3 col-md-4 offset-md-1 mobile">
            <div class="py-4 d-flex justify-content-end">
              <h6>
                <a href="#">Cancel and return to website</a>
              </h6>
            </div>
            <div class="bg-light rounded d-flex flex-column">
              <div class="p-2 ml-3">
                <h4>Order Recap</h4>
              </div>
              <div class="p-2 d-flex">
                <div class="col-8">Contracted Price</div>
                <div class="ml-auto">$186.76</div>
              </div>
              <div class="p-2 d-flex">
                <div class="col-8">Amount toward deductible</div>
                <div class="ml-auto">$0.00</div>
              </div>
              <div class="p-2 d-flex">
                <div class="col-8">Coinsurance( 0% )</div>
                <div class="ml-auto">+ $0.00</div>
              </div>
              <div class="p-2 d-flex">
                <div class="col-8">Copayment</div>
                <div class="ml-auto">+ $40.00</div>
              </div>
              <div class="border-top px-4 mx-3"></div>
              <div class="p-2 d-flex pt-3">
                <div class="col-8">
                  Total Deductible, Coinsurance, and Copay
                </div>
                <div class="ml-auto">$40.00</div>
              </div>
              <div class="p-2 d-flex">
                <div class="col-8">
                  Maximum out-of-pocket on Insurance Policy (not reached)
                </div>
                <div class="ml-auto">$6500.00</div>
              </div>
              <div class="border-top px-4 mx-3"></div>
              <div class="p-2 d-flex pt-3">
                <div class="col-8">Insurance Responsibility</div>
                <div class="ml-auto">
                  <b>$71.76</b>
                </div>
              </div>
              <div class="p-2 d-flex">
                <div class="col-8">
                  Patient Balance{" "}
                  <span class="fa fa-question-circle text-secondary"></span>
                </div>
                <div class="ml-auto">
                  <b>$71.76</b>
                </div>
              </div>
              <div class="border-top px-4 mx-3"></div>
              <div class="p-2 d-flex pt-3">
                <div class="col-8">
                  <b>Total</b>
                </div>
                <div class="ml-auto">
                  <b class="green">$85.00</b>
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
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
        <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>

        {/* Dragand drop */}

        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <form method="post" action="#" id="#">
                <div class="form-group files">
                  <label>Upload Your File </label>
                  <input type="file" class="form-control" multiple="" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
