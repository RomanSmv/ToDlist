import React from 'react';
import {AddItemForm} from '../AddItemForm';
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemForm Stories',
    component: AddItemForm,
}

export const AddItemFormExample = () => {
    return (
        <AddItemForm addItem={action('Button inside from clicked')} />
    )
}
export const AddItemFormDisabledExample = () => {
    return (
        <AddItemForm disabled={true}
            addItem={action('Button inside from clicked')} />
    )
}