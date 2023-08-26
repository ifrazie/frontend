import React from "react";
import './App.css';
// import ChatMessages from "./components/ChatMessages";

// Material UI
import { Container, Grid } from '@mui/material';

import ChatHeader from "./components/ChatHeader";

function App() {

return (
    <Container maxWidth="sm" sx={{ pt: 2 }}>
      <ChatHeader />
    </Container>
)

}

export default App;