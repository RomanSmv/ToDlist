import React from 'react';
import App from "../App";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: 'App Stories',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithreduxExample = (props: any) => {
    return <App demo={true} />
}