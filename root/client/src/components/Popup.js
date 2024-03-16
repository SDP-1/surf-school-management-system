import { Link } from "react-router-dom";
import AddStudent from "./AddStudent";
import PaymentGateway from "../pages/PaymentGateway";

export default function () {
  return (
    <div>
      <Link
        to="/add"
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Payment
      </Link>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog " >
          <div class="modal-content">
            <div class="modal-header" >
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Paymenet
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <PaymentGateway />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
