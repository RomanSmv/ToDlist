import React from 'react';
import AppWithredux from "../AppWithredux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: 'AppWithredux Stories',
    component: AppWithredux,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithreduxExample = (props: any) => {
    return <AppWithredux demo={true} />
}