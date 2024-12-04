import React from "react";
import { useSelector } from "react-redux";

export default function ErrorBanner() {
    const { error: productError } = useSelector((state) => state.product);
    const { error: categoryError } = useSelector((state) => state.category);
    const { error: authError } = useSelector((state) => state.auth);

    if (!productError && !categoryError && !authError) return null;
    //console.log(error);
    return (
        <div className=" w-full bg-red-600 text-white text-center p-2 mb-5">
            {authError
                ? authError.error ?? authError.message
                : productError
                ? productError.error ?? productError.detail
                : categoryError.error ?? categoryError.detail}
        </div>
    );
}
