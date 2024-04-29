import React from 'react';

import "./App.css"
import GenerateAccount from "./AccountServices/GenerateAccount";
import LogIn from "./AccountServices/LogIn";
import Introduction from "./detailer/Introduction";
import GeoprocessingEngine from "./geoproccesing_engine/GeoprocessingEngine";
import Account from "./Account/Account";
import { useSelector } from 'react-redux'
import LogOut from "./AccountServices/LogOut";
import ChangePassword from "./AccountServices/ChangePassword";
import DeleteProfile from "./AccountServices/DeleteProfile";
import MeetingRequest from "./Meetings/MeetingRequest";
import UserConsole from "./detailer/UserConsole";
import MR_TimerDelete from "./Utilities/MR_TimerDelete";
import MeetingListHeader from "./Meetings/MeetingListHeader"
import Midpoint_Router from "./RoutingService/Midpoint_Router";
import VideoContainer from "./detailer/VideoContainer";




function App() {

    const loggedIn = useSelector(state => state.loggedIn)
    const located = useSelector(state => state.isLocated)
    const requestOut = useSelector(state => state.requestOut)
    const requestAccepted = useSelector(state => state.requestAccepted)
    const NOW_IN_MS = new Date().getTime();
    const midpointReturned = useSelector(state => state.midpointReturned)

  return (
      <div className="App">
          <div className="column1">
              <div className="column1-box1">
                  {!loggedIn && <GenerateAccount/>}
                  {!loggedIn && <LogIn/>}
                  {loggedIn && <Account/>}
                </div>
              <div className="column1-box2">
                  {loggedIn && <LogOut/>}
                  {loggedIn && <ChangePassword/>}
                  {loggedIn && <DeleteProfile/>}
                </div>
          </div>
          <div className="column2">
              <div className="column2-box1">
                  {!loggedIn && <Introduction />}
                  {loggedIn && <UserConsole/>}
              </div>
              <div className="column2-box2">
                  {/* eslint-disable-next-line react/jsx-pascal-case */}
                  {!loggedIn && <VideoContainer />}
                  {loggedIn && midpointReturned && <Midpoint_Router/>}
              </div>
              <div className="column2-box3">
                  {loggedIn && (!requestAccepted || requestOut) && <MeetingListHeader/>}
              </div>
          </div>
          <div className="column3">
              <div className="column3-box1">
                  {located && (!requestOut || requestAccepted) && <MeetingRequest />}
                  {/* eslint-disable-next-line react/jsx-pascal-case */}
                  {requestOut && <MR_TimerDelete targetDate={NOW_IN_MS} />}
              </div>
              <div className="column3-box2">
                  {<GeoprocessingEngine />}
              </div>
          </div>
        </div>
  )
}


export default App;
