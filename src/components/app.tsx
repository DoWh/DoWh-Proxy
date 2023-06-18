import React from "react";

import LinkSource from "./LinkSource";
import ProxyResult from "./ProxyResult";
import StartBtn from "./StartBtn";

function App(): React.JSX.Element {
    return (
        <div>
            <LinkSource />
            <ProxyResult />
            <StartBtn />
        </div>
    )
}

export default App;