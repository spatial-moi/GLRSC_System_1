import React from 'react'
import { useSelector } from 'react-redux'


function GeoprocessingEngine() {

    const geMessages = useSelector(state => state.geMessages)

    const messages = geMessages.map((message) =>
        <p className="ge-message">{message}</p>
    );

        return(
            <div className="geoprocessing-engine">
                <p className="ge-title"> <b id="intro-system-name"> Geoprocessing Engine: </b> </p>
                    <div className="ge-console">
                        {messages}
                </div>
            </div>
        )
    }



export default GeoprocessingEngine