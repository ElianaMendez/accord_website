import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Diagnostic from './pages/Diagnostic';
import DiagnosticResults from './pages/DiagnosticResults';
import ConsultationRequest from './pages/ConsultationRequest';
import './index.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diagnostic" element={<Diagnostic />} />
        <Route path="/diagnostic/results" element={<DiagnosticResults />} />
        <Route path="/diagnostic/consultation" element={<ConsultationRequest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
