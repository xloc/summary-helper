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
        input.textContent = `
Y22WK03 - 10 units

FMG
01. FMG3HE3R16000139 5732527 GERMANY -------- HDD failed (no HDD info in log files)
02. FM-4KE3R15000004 5728948 UNITED_KINGDOM - Suspected defective flash (CF)

FAZ
01. FL-2HFTB20000262 5736423 UNITED_ARAB ---- Defective PSU
02. FL-4HE3R16900396 5740980 FRANCE --------- HDD failed (no HDD info in log files)
03. FL-4HE3R16900660 5731308 JAPAN ---------- HDD failed (no HDD info in log files)
04. FL-4HET318900062 5740254 TAIWAN --------- HDD failed (no HDD info in log files)
05. FL-2KE3R17000082 5733921 UNITED_STATES -- HDD failed (no HDD info in log files)
06. FL-2KET321000017 5734114 JAPAN ---------- DOA. HDD failed (ST3000NM000A-2J1100 TN02)
07. FL3K5GTA20900030 5725611 UNITED_STATES -- No console output
08. FL-3KE3R15000033 5725265 CHINA ---------- HDD failed (ST2000NM0033-9ZM175 GA0A)
`;
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
