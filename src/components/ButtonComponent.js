import React from 'react';
import { Button } from 'react-bootstrap';

function ButtonComponent(props) {
    return (
        <Button {...props} variant={props.variant || "primary"}>
            {props.label || "Click Me"}
        </Button>
    );
}

export default ButtonComponent;
