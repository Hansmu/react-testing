import {render, RenderOptions} from "@testing-library/react";
import {OrderDetailsProvider} from "../contexts/OrderDetails";

const renderWithContext = (ui: JSX.Element, options?: Omit<RenderOptions, 'queries'>) => render(ui, {wrapper: OrderDetailsProvider, ...options});

export * from '@testing-library/react';
export {renderWithContext as render};