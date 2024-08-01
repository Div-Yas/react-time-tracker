import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import Footer from "./component/Footer";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import TimeTracker from "./pages/TimeTracker";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
`;

const MainContent = styled.div`
  margin-left: 250px; /* Match the width of the sidebar */
  padding: 20px;
  flex: 1;
  height: calc(100vh - 3.5rem - 50px); /* Adjust height for navbar and footer */
  overflow-y: auto;
`;

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <AppContainer>
        <Navbar />
        <ContentContainer>
          <Sidebar />
          <MainContent>
            <Routes>
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/" element={<TimeTracker />} />
            </Routes>
          </MainContent>
        </ContentContainer>
        <Footer />
      </AppContainer>
    </Router>
  );
};

export default App;
