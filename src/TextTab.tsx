import React from 'react';
import { SummaryInfo } from './logic';

interface TextTabProps {
    onChange: (text: string) => void;
    data?: SummaryInfo;
}
export default function TextTab(props: TextTabProps) {

    return (
        <textarea
            className='border p-2 w-full h-full font-mono text-xs'
            onChange={(e) => {
                let ee = e as React.ChangeEvent<HTMLTextAreaElement>;
                props.onChange(ee.target.value);
            }} />
    );
}
