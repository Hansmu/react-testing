import {render, screen, fireEvent} from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test('Button disabled initially, checkbox unchecked initially', () => {
    render(<SummaryForm />);
    const submitButton = screen.getByRole('button', {name: /confirm order/i});
    const termsCheckbox = screen.getByRole('checkbox', {name: /i agree to/i});

    expect(submitButton).toBeDisabled();
    expect(termsCheckbox).not.toBeChecked();
});

test('Checkbox enables button on first click and disables on second click', () => {
    render(<SummaryForm />);
    const submitButton = screen.getByRole('button', {name: /confirm order/i});
    const termsCheckbox = screen.getByRole('checkbox', {name: /i agree to/i});

    fireEvent.click(termsCheckbox);

    expect(submitButton).toBeEnabled();
    expect(termsCheckbox).toBeChecked();

    fireEvent.click(termsCheckbox);

    expect(submitButton).toBeDisabled();
    expect(termsCheckbox).not.toBeChecked();
});
