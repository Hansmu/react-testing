import React from 'react';
import {Col, Form} from "react-bootstrap";

interface IToppingOptionProps {
    name: string;
    imagePath: string;
    updateItemCount: (name: string, value: string | number) => void;
}


export default function ToppingOption({name, imagePath, updateItemCount}: IToppingOptionProps) {
    return (
        <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: 'center' }}>
            <img
                style={{ width: '75%' }}
                src={`http://localhost:3030/${imagePath}`}
                alt={`${name} topping`}
            />
            <Form.Group controlId={`${name}-topping-checkbox`}>
                <Form.Check
                    type="checkbox"
                    onChange={(e) => {
                        updateItemCount(name, e.target.checked ? 1 : 0);
                    }}
                    label={name}
                />
            </Form.Group>
        </Col>
    );
}