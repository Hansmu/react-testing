import {render, screen} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from '../Options';
import OrderEntry from "../OrderEntry";

test('update scoop subtotal when scoops change', async () => {
    render(<Options optionType={'scoops'}/>);

    // Could use regex as well, but this is another way of doing it. Additionally, not including the price in the
    // search as this element will be reused as the sum changes. So it's clearer to just get the text without the number.
    const scoopSubtotal = screen.getByText('Scoops total: $', {exact: false});
    // Partial text match
    expect(scoopSubtotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'});
    // Good idea to clear the input before, as you might not know where the cursor is.
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(scoopSubtotal).toHaveTextContent('2.00');

    const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'});
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');
    expect(scoopSubtotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when toppings change', async () => {
    render(<Options optionType="toppings"/>);

    const toppingsTotal = screen.getByText('Toppings total: $', {exact: false});
    expect(toppingsTotal).toHaveTextContent('0.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
        name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);
    expect(toppingsTotal).toHaveTextContent('1.50');

    const hotFudgeCheckbox = screen.getByRole('checkbox', {name: 'Hot fudge'});
    userEvent.click(hotFudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent('3.00');

    userEvent.click(hotFudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
    test('grand total starts at $0.00', async () => {
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', {
            name: /grand total: \$/i
        });
        expect(grandTotal).toHaveTextContent('0.00');

        await screen.findByRole('spinbutton', {
            name: 'Vanilla'
        });
        await screen.findByRole('checkbox', {
            name: 'Cherries'
        });
    });

    test('grand total updates properly if scoop is added first', async () => {
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', {
            name: /grand total: \$/i
        });

        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla'
        });
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '2');
        expect(grandTotal).toHaveTextContent('4.00');

        const cherriesCheckbox = await screen.findByRole('checkbox', {
            name: 'Cherries'
        });
        userEvent.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('5.50');

    });

    test('grand total updates properly if topping is added first', async () => {
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', {
            name: /grand total: \$/i
        });

        const cherriesCheckbox = await screen.findByRole('checkbox', {
            name: 'Cherries'
        });
        userEvent.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('1.50');

        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla'
        });
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '2');
        expect(grandTotal).toHaveTextContent('5.50');
    });

    test('grand total updates properly if item is removed', async () => {
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', {
            name: /grand total: \$/i
        });

        const cherryCheckbox = await screen.findByRole('checkbox', {
            name: 'Cherries'
        });
        userEvent.click(cherryCheckbox);

        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla'
        });
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '2');

        expect(grandTotal).toHaveTextContent('5.50');

        userEvent.type(vanillaInput, '1');
        expect(grandTotal).toHaveTextContent('3.50');

        userEvent.click(cherryCheckbox);
        expect(grandTotal).toHaveTextContent('2.00');
    });
});