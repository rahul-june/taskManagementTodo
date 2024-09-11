import React, { useState } from 'react';
import Sidebar from './Sidebar';  // Assuming the Sidebar component is in a separate file
import Header from './Header';    // Assuming the Header component is in a separate file

const DashboardLayout = ({ children,setProjectName }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setProjectNamefun={setProjectName}/>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e0e0e0' }}>
          <Header />
        </div>
        <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;