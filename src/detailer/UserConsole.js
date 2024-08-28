import {useSelector} from "react-redux";
import React from "react";
import UC_Timer from "../Utilities/UC_Timer";

function UserConsole() {
    const ucMessage = useSelector(state => state.ucMessage)
    const requestAccepted = useSelector(state => state.requestAccepted)
    const midpointReturned = useSelector(state => state.midpointReturned)
    const targetInfo = new Date(localStorage.getItem("THEN_IN_MS")).getTime()
    const usefulKey = parseInt(localStorage.getItem("usefulKey"))

    const messages = ucMessage.map((message) =>
    <p className="uc-message">{message}</p>
);

return(
    <div className="user-console">
        <p className="uc-title"> <b id="uc-bold"> User Console: </b> </p>
        <div className="uc-console">
            {messages}
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            {requestAccepted && !midpointReturned && <UC_Timer targetInfo={targetInfo} usefulKey={usefulKey}/>}
        </div>
    </div>
)
}

export default UserConsole