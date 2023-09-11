"use client";

import { IBooking } from "@/backend/models/booking";
import React from "react";

import "./Invoice.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Props {
  data: {
    booking: IBooking;
  };
}

const Invoice = ({ data }: Props) => {
  const booking = data?.booking;

  const handleDownload = () => {
    const input = document.getElementById("booking_invoice");
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        pdf.addImage(imgData, 0, 0, pdfWidth, 0);
        pdf.save(`invoice_${booking?._id}.pdf`);
      });
    }
  };

  return (
    <div className="container">
      <div className="order-invoice my-5">
        <div className="row d-flex justify-content-center mb-5">
          <button className="btn btn-success col-md-5" onClick={handleDownload}>
            <i className="fa fa-print"></i> Download Invoice
          </button>
        </div>
        <div className="px-5">
          <div id="booking_invoice" className="px-4 border border-secondary">
            <header className="clearfix">
              <div id="logo" className="my-4">
                <img src="/images/bookit_logo.png" />
              </div>
              <h1>INVOICE # {booking?._id}</h1>
              <div id="company" className="clearfix">
                <div>BookIT</div>
                <div>
                  455 Foggy Heights,
                  <br />
                  AZ 85004, US
                </div>
                <div>(602) 519-0450</div>
                <div>
                  <a href="mailto:info@bookit.com">info@bookit.com</a>
                </div>
              </div>
              <div id="project">
                <div>
                  <span>Name</span> {booking?.user?.name}
                </div>
                <div>
                  <span>EMAIL</span> {booking?.user?.email}
                </div>
                <div>
                  <span>DATE</span>{" "}
                  {new Date(booking?.createdAt).toLocaleString("en-US")}
                </div>
                <div>
                  <span>Status</span>{" "}
                  {booking?.paymentInfo?.status?.toUpperCase()}
                </div>
              </div>
            </header>
            <main>
              <table className="mt-5">
                <thead>
                  <tr>
                    <th className="service">Room</th>
                    <th className="desc">Price Per Night</th>
                    <th>Check In Date</th>
                    <th>Check Out Date</th>
                    <th>Days of Stay</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="service">{booking?.room?.name}</td>
                    <td className="desc">${booking?.room?.pricePerNight}</td>
                    <td className="unit">
                      {new Date(booking?.checkInDate).toLocaleString("en-US")}
                    </td>
                    <td className="qty">
                      {new Date(booking?.checkOutDate).toLocaleString("en-US")}
                    </td>
                    <td className="qty">{booking?.daysOfStay}</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="grand total">
                      <b>GRAND TOTAL</b>
                    </td>
                    <td className="grand total">${booking?.amountPaid}</td>
                  </tr>
                </tbody>
              </table>
              <div id="notices">
                <div>NOTICE:</div>
                <div className="notice">
                  A finance charge of 1.5% will be made on unpaid balances after
                  30 days.
                </div>
              </div>
            </main>
            <footer className="pb-5">
              Invoice was created on a computer and is valid without the
              signature.
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
