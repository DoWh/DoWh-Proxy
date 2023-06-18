import React from "react";

function ProxyResult(): React.JSX.Element {
    return (
        <section>
            <h2 className="select-none text-lg font-bold p-2 pb-0 w-full">
                Result
            </h2>
            <textarea 
                spellCheck="false" 
                className="
                    focus:outline-0 focus:ring-1 focus:ring-black focus:border-none 
                    bg-gray-50 
                    border-2 rounded-md 
                    p-2 pt-0 
                    w-full h-36 resize-none"
            ></textarea>
        </section>
    )
}

export default ProxyResult;