import React from 'react';

export const Context = React.createContext();

export class Provider extends React.Component {
    state = {
        data: 'data'
    };
    render() {
        return (
            <Context.Provider value={{
                store: this.state
            }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const consume = (Component) => React.forwardRef((props, ref) => (
    <Context.Consumer>
        {value => <Component {...props} value={value} ref={ref} />}
    </Context.Consumer>
));