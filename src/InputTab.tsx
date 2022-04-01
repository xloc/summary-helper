import React, { useEffect, useRef } from 'react';
import { SummaryInfo } from './logic';

interface InputTabProps {
    onChange: (text: string) => void;
    data?: SummaryInfo;
}
export default function InputTab(props: InputTabProps) {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (!inputRef.current) return;
        const input = inputRef.current;
        input.textContent = ``;
        props.onChange(input.textContent);
    }, []);

    return (
        <textarea
            ref={inputRef}
            className='border p-2 w-full h-full font-mono text-xs'
            onChange={(e) => {
                let ee = e as React.ChangeEvent<HTMLTextAreaElement>;
                props.onChange(ee.target.value);
            }} />
    );
}
