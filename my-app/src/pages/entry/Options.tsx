import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ScoopOption from "./ScoopOption";
import {Row} from "react-bootstrap";
import ToppingOption from "./ToppingOption";

interface IItem {
    name: string;
    imagePath: string;
}

interface IOptionsProps {
    optionType: 'scoops' | 'toppings';
}

export default function Options({optionType}: IOptionsProps) {
    const [items, setItems] = useState<IItem[]>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:3030/${optionType}`)
            .then((response) => setItems(response.data))
            .catch((error) => setError(true));
    }, [optionType]);

    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

    const optionItems = items.map(item => (
        <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} updateItemCount={() => {}} />
    ))

    return (
        <Row>
            {optionItems}
        </Row>
    );
}