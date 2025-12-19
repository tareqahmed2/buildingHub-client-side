import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const MakePayment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [agreement, setAgreement] = useState({});
  const [loading, setLoading] = useState(true);

  const email = user?.email;

  useEffect(() => {
    if (!email) return;

    setLoading(true);
    axiosSecure
      .get(`/agreements/${email}`)
      .then((res) => {
        setAgreement(res.data || {});
      })
      .catch(() => {
        toast.error("Failed to load agreement information");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [axiosSecure, email]);

  const handlePayment = () => {
    navigate("payment-form");
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <Helmet>
        <title>Buildinghub | Make Payment</title>
      </Helmet>

      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">
            Make Payment
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            <>
              <div className="space-y-4">

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Member Email</span>
                  </label>
                  <input
                    type="email"
                    readOnly
                    value={agreement.userEmail || ""}
                    className="input input-bordered bg-base-200"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Floor</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={agreement.floor || ""}
                    className="input input-bordered bg-base-200"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Block</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={agreement.block || ""}
                    className="input input-bordered bg-base-200"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Apartment No</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={agreement.aptNo || ""}
                    className="input input-bordered bg-base-200"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Rent</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={agreement.rent || ""}
                    className="input input-bordered bg-base-200"
                  />
                </div>

              </div>

              <button
                onClick={handlePayment}
                className="btn btn-success w-full mt-6"
              >
                Pay Now
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
