import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {OverlayTrigger, Popover} from "react-bootstrap";
import {TSetOrderPhase} from "../../types";

export default function SummaryForm({ setOrderPhase }: {setOrderPhase: TSetOrderPhase}) {
    const [tcChecked, setTcChecked] = useState(false);

    function handleSubmit(event: any) {
        event.preventDefault();

        // pass along to the next phase.
        // The next page will handle submitting order from context.
        setOrderPhase('completed');
    }

    const popover = (
        <Popover id="termsandconditions-popover">
            <Popover.Content>No ice cream will actually be delivered</Popover.Content>
        </Popover>
    );

    const checkboxLabel = (
        <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: 'blue' }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="terms-and-conditions">
                <Form.Check
                    type="checkbox"
                    checked={tcChecked}
                    onChange={(e) => setTcChecked(e.target.checked)}
                    label={checkboxLabel}
                />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!tcChecked}>
                Confirm order
            </Button>
        </Form>
    );
}