import React, {useState} from "react";

export default function Converter() {

    let [quantity, setQuantity] = useState(1);
    console.log(quantity)

    return (
        <div className="flex justify-center">
            <button className="border-2" onClick={() => setQuantity(quantity ++ )}>+</button>
            <div className="border-2">{quantity}</div>
            <button className="border-2" onClick={() => setQuantity(Math.max(quantity --, 1))}>-</button>
        </div>
    )
}