import React from "react";
import { useSelector } from "react-redux";

export default function ErrorBanner() {
    const { error: productError } = useSelector((state) => state.product);
    const { error: categoryError } = useSelector((state) => state.category);

    if (!productError && !categoryError) return null;
    //console.log(error);
    return (
        <div className=" w-full bg-red-600 text-white text-center p-2 mb-5">
            {!productError ? categoryError.error ?? categoryError.detail : productError.error ?? productError.detail}
        </div>
    );
}
