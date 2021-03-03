import React from 'react';
import {AddItemForm} from './AddItemForm';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";
import {act} from "react-dom/test-utils";

export default {
    title: 'EditableSpan Stories',
    component: EditableSpan,
}

export const EditableSpanExample = (props: any) => {
    return ( <EditableSpan title={"StartValue"} onChange={action("value change")}/>)
}