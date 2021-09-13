import React from 'react';
import {Alert} from "react-bootstrap";

interface IAlertBannerProps {
    message?: string;
    variant?: string;
}

export default function AlertBanner({message, variant}: IAlertBannerProps) {
    const alertMessage =
        message || 'An unexpected error occurred. Please try again later.';
    const alertVariant = variant || 'danger';

    return (
        <Alert variant={alertVariant} style={{ backgroundColor: 'red' }}>
            {alertMessage}
        </Alert>
    );
}
