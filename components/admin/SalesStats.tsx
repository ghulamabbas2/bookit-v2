import { addCommasToAmount } from "@/helpers/helpers";
import React from "react";

interface Props {
  data: {
    totalSales: string;
    numberOfBookings: string;
  };
}

const SalesStats = ({ data }: Props) => {
  return (
    <div className="row my-5">
      <div className="col-12 col-lg-6">
        <div className="card shadow ps-5">
          <div className="card-body">
            <div className="row">
              <div className="col-2">
                <i
                  className="fas fa-dollar-sign fa-4x"
                  style={{ color: "#dbdee4" }}
                ></i>
              </div>
              <div className="col-10">
                <p className="card-title">Sales</p>
                <p className="h4">
                  <b>{data && addCommasToAmount(data?.totalSales)}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-6 mt-4 mt-lg-0">
        <div className="card shadow ps-5">
          <div className="card-body">
            <div className="row justify-content-between">
              <div className="col-2">
                <i
                  className="fas fa-file-invoice fa-4x"
                  style={{ color: "#dbdee4" }}
                ></i>
              </div>
              <div className="col-10">
                <p className="card-title">Bookings</p>
                <p className="h4">
                  <b>{data?.numberOfBookings}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesStats;
