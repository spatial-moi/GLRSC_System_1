import React, { Component } from 'react'


class VideoContainer extends Component {



    render(){
        return(
            <div className="video-container">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/EqzcN58KKWU?si=0DTlLj4cwXcEdRkD" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
        )
    }
}


export default VideoContainer




