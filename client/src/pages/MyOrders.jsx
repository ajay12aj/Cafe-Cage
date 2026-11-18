import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const { currency, axios, user } = useAppContext();

    const fetchMyOrders = async () => {
        try {
            setLoading(true);

            const { data } = await axios.get('/api/order/user');

            if (data.success) {
                setMyOrders(Array.isArray(data.orders) ? data.orders : []);
            } else {
                setMyOrders([]);
            }
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            setMyOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchMyOrders();
        } else {
            setMyOrders([]);
            setLoading(false);
        }
    }, [user]);

    // Safe date formatting
    const formatDate = (date) => {
        if (!date) return 'N/A';

        const parsedDate = new Date(date);

        return Number.isNaN(parsedDate.getTime())
            ? 'N/A'
            : parsedDate.toLocaleDateString();
    };

    // Safe image fallback
    const fallbackImage =
        'https://placehold.co/100x100?text=No+Image';

    return (
        <div className="mt-16 pb-16">
            <div className="flex flex-col items-end w-max mb-8">
                <p className="text-2xl font-medium uppercase">
                    My orders
                </p>
                <div className="w-16 h-0.5 bg-primary rounded-full" />
            </div>

            {!user ? (
                <p className="text-gray-500">
                    Please login to view your orders.
                </p>
            ) : loading ? (
                <p className="text-gray-500">Loading your orders...</p>
            ) : myOrders.length === 0 ? (
                <p className="text-gray-500">
                    You have not placed any orders yet.
                </p>
            ) : (
                myOrders.map((order, orderIndex) => {
                    const items = Array.isArray(order.items)
                        ? order.items
                        : [];

                    return (
                        <div
                            key={order._id || orderIndex}
                            className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
                        >
                            <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col gap-2">
                                <span>
                                    Order ID: {order._id || 'N/A'}
                                </span>

                                <span>
                                    Payment: {order.paymentType || 'N/A'}
                                </span>

                                <span>
                                    Total Amount: {currency}
                                    {Number(order.amount) || 0}
                                </span>
                            </p>

                            {items.length === 0 ? (
                                <p className="text-gray-500 py-5">
                                    No items found for this order.
                                </p>
                            ) : (
                                items.map((item, itemIndex) => {
                                    // Handle deleted or missing products
                                    const product = item?.product;
                                    const quantity = Number(item?.quantity) || 1;

                                    const image = Array.isArray(product?.image)
                                        ? product.image[0]
                                        : product?.image;

                                    const productName =
                                        product?.name || 'Product no longer available';

                                    const productCategory =
                                        product?.category || 'N/A';

                                    const unitPrice = Number(
                                        product?.offerPrice
                                    ) || 0;

                                    const itemAmount = product
                                        ? unitPrice * quantity
                                        : 0;

                                    return (
                                        <div
                                            key={item?._id || itemIndex}
                                            className={`relative bg-white text-gray-500/70 ${
                                                itemIndex !== items.length - 1
                                                    ? 'border-b'
                                                    : ''
                                            } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}
                                        >
                                            <div className="flex items-center mb-4 md:mb-0">
                                                <div className="bg-primary/10 p-4 rounded-lg shrink-0">
                                                    <img
                                                        src={image || fallbackImage}
                                                        alt={productName}
                                                        onError={(e) => {
                                                            e.currentTarget.onerror = null;
                                                            e.currentTarget.src = fallbackImage;
                                                        }}
                                                        className="w-16 h-16 object-contain"
                                                    />
                                                </div>

                                                <div className="ml-4 min-w-0">
                                                    <h2 className="text-xl font-medium text-gray-800 break-words">
                                                        {productName}
                                                    </h2>

                                                    <p>
                                                        Category: {productCategory}
                                                    </p>

                                                    {!product && (
                                                        <p className="text-sm text-red-500">
                                                            Product details unavailable
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0 shrink-0">
                                                <p>Quantity: {quantity}</p>

                                                <p>
                                                    Status: {order.status || 'Pending'}
                                                </p>

                                                <p>
                                                    Date: {formatDate(order.createdAt)}
                                                </p>
                                            </div>

                                            <p className="text-primary text-lg font-medium shrink-0">
                                                Amount: {currency}
                                                {itemAmount.toFixed(2)}
                                            </p>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default MyOrders;