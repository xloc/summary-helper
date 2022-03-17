import React from 'react';
import { SummaryInfo } from './logic';

interface TableTabProps {
    onChange: (i_model: number, i_product: number, attribute: string, value: string) => void;
    data?: SummaryInfo;
}
export default function TableTab(props: TableTabProps) {
    return (
        <div>TableTab</div>
    );
}
