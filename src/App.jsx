import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import DashboardLayout from "./Components/DashboardLayout";
import {Provider} from 'react-redux'
import { Box ,Typography} from '@mui/material';
import store from "./Redux/store";
import Content from "./Components/Content";
import { useState } from "react";
function App() {
  const [projectName,setProjectName]=useState(null)
 

  return (

    // <Content/>
    <Provider store={store}>
      <DashboardLayout setProjectName={setProjectName}>
        {projectName&&<Content projectName={projectName}/>}        
      </DashboardLayout>
      </Provider>
  );
}

export default App;
