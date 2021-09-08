import React, {useState} from 'react';
import './App.css';

export function replaceCamelWithSpaces(text: string): string {
    return text.replace(/\B([A-Z])\B/g, ' $1');
}

function App() {
    const [buttonColor, setButtonColor] = useState<'red' | 'blue'>('red');
    const newButtonColor = buttonColor === 'red' ? 'blue' : 'red';
    const [disabled, setDisabled] = useState(false);

    return (
        <div>
            <button disabled={disabled} onClick={() => setButtonColor(newButtonColor)} style={{backgroundColor: disabled ? 'gray' : buttonColor}}>
                Change to {newButtonColor}
            </button>

            <br />

            <input
                type="checkbox"
                id="disable-button-checkbox"
                defaultChecked={disabled}
                aria-checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
            />
            <label htmlFor="disable-button-checkbox">Disable button</label>
        </div>
    );
}

export default App;
