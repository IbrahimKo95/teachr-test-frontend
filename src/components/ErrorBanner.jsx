import React from "react";
import { useSelector } from "react-redux";

export default function ErrorBanner() {
    const { error } = useSelector((state) => state.product);

    if (!error) return null;
    //console.log(error);
    return (
        <div className=" w-full bg-red-600 text-white text-center p-2 mb-5">
            {error.error??error.detail}
        </div>
    );
}
