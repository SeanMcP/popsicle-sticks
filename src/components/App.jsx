import React from 'react';
import Header from './layout/Header';

const App = ({ children }) => (
    <div className="app-container">
        <Header/>
        {children}
    </div>
);

export default App;
