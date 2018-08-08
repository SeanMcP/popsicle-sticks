import React from 'react';
import Header from './layout/Header';
import Modal from './common/Modal';
import Toast from './common/Toast';
// import withAuthentication from './routing/withAuthentication';

const App = ({ children }) => (
    <div className="app-container">
        <Header/>
        {children}
        <Modal/>
        <Toast/>
    </div>
);

export default App;
// export default withAuthentication(App);
