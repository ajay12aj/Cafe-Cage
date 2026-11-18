import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) setOrders(data.orders || []);
      else toast.error(data.message || "Failed to fetch orders");
    } catch (error) {
      console.error("Fetch orders error:", error);
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch orders"
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar min-w-0 flex-1 h-[95vh] overflow-y-auto">
      <div className="w-full space-y-4 p-4 md:p-6 lg:p-8">
        <h2 className="text-lg font-medium">Orders List</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          orders.map((order, orderIndex) => (
            <div
              key={order?._id || orderIndex}
              className="flex max-w-full flex-col justify-between gap-5 rounded-md border border-gray-300 p-4 md:flex-row md:items-center md:p-5"
            >
              {/* Ordered products and their images */}
              <div className="flex min-w-0 flex-col gap-3 md:max-w-80">
                {(order?.items || []).map((item, itemIndex) => {
                  const product = item?.product;
                  const productName =
                    product?.name || item?.name || "Product unavailable";
                  const productImage =
                    product?.image?.[0] || assets.box_icon;

                  return (
                    <div
                      key={item?._id || itemIndex}
                      className="flex min-w-0 items-center gap-3"
                    >
                      <img
                        src={productImage}
                        alt={productName}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = assets.box_icon;
                        }}
                        className="h-14 w-14 shrink-0 rounded-md border border-gray-200 bg-gray-50 object-cover sm:h-16 sm:w-16"
                      />

                      <div className="min-w-0">
                        <p className="break-words font-medium">
                          {productName}
                          <span className="text-primary">
                            {" "}x {item?.quantity ?? 1}
                          </span>
                        </p>

                        {!product && (
                          <p className="text-xs text-gray-400">
                            Product details unavailable
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}

                {(!order?.items || order.items.length === 0) && (
                  <p className="text-gray-500">
                    No product details available
                  </p>
                )}
              </div>

              {/* Customer address */}
              <div className="text-sm text-black/60 md:text-base">
                <p className="text-black/80">
                  {order?.address?.firstName || ""}{" "}
                  {order?.address?.lastName || ""}
                </p>
                <p>
                  {order?.address?.street || ""},{" "}
                  {order?.address?.city || ""}
                </p>
                <p>
                  {order?.address?.state || ""},{" "}
                  {order?.address?.zipcode || ""},{" "}
                  {order?.address?.country || ""}
                </p>
                <p>{order?.address?.phone || "Phone unavailable"}</p>
              </div>

              {/* Total amount */}
              <p className="my-auto text-lg font-medium">
                {currency}{order?.amount ?? 0}
              </p>

              {/* Payment and order details */}
              <div className="flex flex-col text-sm text-black/60 md:text-base">
                <p>Method: {order?.paymentType || "N/A"}</p>
                <p>
                  Date: {order?.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>Payment: {order?.isPaid ? "Paid" : "Pending"}</p>
                {order?.status && <p>Status: {order.status}</p>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;