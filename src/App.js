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


function App() {

    const loggedIn = useSelector(state => state.loggedIn)

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
              </div>
              <div className="column2-box2">
              </div>
              <div className="column2-box3">
              </div>
          </div>
          <div className="column3">
              <div className="column3-box1">
              </div>
              <div className="column3-box2">
                  {<GeoprocessingEngine />}
              </div>
          </div>
        </div>
  )
}


export default App;
