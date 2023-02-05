import React, {useState} from "react";

export default function Converter() {

    let [quantity, setQuantity] = useState(1);
    console.log(quantity)

    return (
        <div className="flex gap-2">
            <button className="flex justify-center border-2 rounded-full h-8 w-8" onClick={() => setQuantity(quantity ++ )}>-</button>
            <div className="flex justify-center border-2 h-8 w-12 rounded-full">{quantity}</div>
            <button className="flex justify-center border-2 rounded-full h-8 w-8" onClick={() => setQuantity(Math.max(quantity --, 1))}>+</button>
        </div>
    )
}