import React from 'react';
import useFetch from './useFetch';

const Product = () => {
    const { data, loading, error } = useFetch('https://api.escuelajs.co/api/v1/products');

    if (loading) return <h1 className="w-screen text-center text-xl font-bold mt-10">Loading... Please wait.</h1>;

    if (error) return <h2 className="w-screen text-center text-red-500 text-xl mt-10">Error occurred: {error}</h2>;

    return (
        <div className="p-5 font-sans bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
                My Product Store
            </h1>

            <div className="flex flex-wrap justify-center gap-6">
                {data && data.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-lg p-4 w-64 shadow-sm"
                    >
                        <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />

                        <h3 className="text-lg font-semibold mb-2 truncate">
                            {item.title}
                        </h3>

                        <p className="text-green-600 font-bold text-xl text-center">
                            Price: ${item.price}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;