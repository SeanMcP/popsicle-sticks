import React from 'react';
import Header from './layout/Header';
import Modal from './common/Modal';

const App = ({ children }) => (
    <div className="app-container">
        <Header/>
        {children}
        <Modal/>
    </div>
);

export default App;
