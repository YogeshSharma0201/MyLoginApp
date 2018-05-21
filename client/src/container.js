import Main from "./Main";

var React = require('react');

var Container = (props) => {
    return (
        <div>
            {props.children}
        </div>
    );
}

export default Container;
