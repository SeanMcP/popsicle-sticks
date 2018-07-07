import React from 'react';
import '../styles/index.css';
import Header from './layout/Header';

const App = ({ children }) => (
    <div className="app-container">
        <Header/>
        {children}
    </div>
);

export default App;
