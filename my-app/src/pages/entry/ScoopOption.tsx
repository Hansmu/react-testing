import React, {ChangeEvent, useState} from 'react';
import {Col, Form, Row} from "react-bootstrap";

interface IScoopOptionProps {
    name: string;
    imagePath: string;
    updateItemCount: (name: string, value: string) => void;
}

export default function ScoopOption({name, imagePath, updateItemCount}: IScoopOptionProps) {
    const [isValid, setIsValid] = useState(true);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const currentValue = event.target.value;

        // make sure we're using a number and not a string to validate
        const currentValueFloat = parseFloat(currentValue);
        const valueIsValid =
            0 <= currentValueFloat &&
            currentValueFloat <= 10 &&
            Math.floor(currentValueFloat) === currentValueFloat;

        // validate
        setIsValid(valueIsValid);

        // only update context if the value is valid
        if (valueIsValid) updateItemCount(name, currentValue);
    };

    return (
        <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
            <img
                style={{ width: '75%' }}
                src={`http://localhost:3030/${imagePath}`}
                alt={`${name} scoop`}
            />
            <Form.Group
                controlId={`${name}-count`}
                as={Row}
                style={{ marginTop: '10px' }}
            >
                <Form.Label column xs="6" style={{ textAlign: 'right' }}>
                    {name}
                </Form.Label>
                <Col xs="5" style={{ textAlign: 'left' }}>
                    <Form.Control
                        type="number"
                        defaultValue={0}
                        onChange={handleChange}
                        isInvalid={!isValid}
                    />
                </Col>
            </Form.Group>
        </Col>
    );
}