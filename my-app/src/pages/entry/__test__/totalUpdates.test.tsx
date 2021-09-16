import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from '../Options';

test('update scoop subtotal when scoops change', async () => {
    render(<Options optionType={'scoops'} />);

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