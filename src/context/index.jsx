import React from 'react';
import axios from 'axios';

export const Context = React.createContext();

export class Provider extends React.Component {
    constructor() {
        super();

        this.state = {
            data: 'data',
            classList: null
        };

        this.getClassList = this.getClassList.bind(this);
    }

    getClassList = (id) => {
        axios.get('./api/classList.json')
        .then(response => this.setState({ classList: response.data }));
    }
    
    render() {
        return (
            <Context.Provider value={{
                store: this.state,
                actions: {
                    getClassList: this.getClassList
                }
            }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}

const consume = (Component) => React.forwardRef((props, ref) => (
    <Context.Consumer>
        {value => <Component {...props} context={value} ref={ref} />}
    </Context.Consumer>
));

export default consume;