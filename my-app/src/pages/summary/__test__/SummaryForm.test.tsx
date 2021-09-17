import {render, screen, fireEvent, waitForElementToBeRemoved} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test('Button disabled initially, checkbox unchecked initially', () => {
    render(<SummaryForm setOrderPhase={jest.fn()}/>);
    const submitButton = screen.getByRole('button', {name: /confirm order/i});
    const termsCheckbox = screen.getByRole('checkbox', {name: /i agree to/i});

    expect(submitButton).toBeDisabled();
    expect(termsCheckbox).not.toBeChecked();
});

test('Checkbox enables button on first click and disables on second click', () => {
    render(<SummaryForm setOrderPhase={jest.fn()}/>);
    const submitButton = screen.getByRole('button', {name: /confirm order/i});
    const termsCheckbox = screen.getByRole('checkbox', {name: /i agree to/i});

    fireEvent.click(termsCheckbox);

    expect(submitButton).toBeEnabled();
    expect(termsCheckbox).toBeChecked();

    fireEvent.click(termsCheckbox);

    expect(submitButton).toBeDisabled();
    expect(termsCheckbox).not.toBeChecked();
});

test('Popover opens when hovering, but is hidden otherwise', async () => {
    const popoverText = /no ice cream will actually be delivered/i;

    render(<SummaryForm setOrderPhase={jest.fn()}/>);

    // Null will be returned if the element doesn't exist on screen
    const missingPopover = screen.queryByText(popoverText);
    expect(missingPopover).not.toBeInTheDocument();

    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);

    // Even though this would throw an error if the element is not found, then it would still be better to include to expect
    // to make it explicit what is expected.
    const popover = screen.getByText(popoverText);
    expect(popover).toBeInTheDocument();

    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() => screen.queryByText(popoverText));
});