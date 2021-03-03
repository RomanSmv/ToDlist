import React from 'react';
import {AddItemForm} from './AddItemForm';
import {action} from "@storybook/addon-actions";
import AppWithredux from "./AppWithredux";
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";

export default {
    title: 'AppWithredux Stories',
    component: AppWithredux,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithreduxExample = (props: any) => {
    return <AppWithredux/>
}