import React, { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    const buttonStyle = {
        fontSize: "20px",
        padding: "10px 20px",
        margin: "5px",
        borderRadius: "5px",
        cursor: "pointer",
        backgroundColor: "#4CAF50",
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Számláló: {count}</h2>
            <button
                style={buttonStyle}
                onClick={() => setCount(count + 1)}
            >
                +
            </button>
            <button
                style={buttonStyle}
                onClick={() => setCount(count - 1)}
            >
                -
            </button>
        </div>
    );
}

export default Counter;
