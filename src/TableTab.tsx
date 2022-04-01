import classNames from 'classnames';
import React, { useState } from 'react';
import { SummaryInfo } from './logic';


interface EditableTDProps {
  text?: string;
  i_unit: number;
  i_model: number;
  attribute: string;
  onChange: (i_model: number, i_product: number, attribute: string, value: string) => void;
  className?: string;
}
function TDEdit({ className, text, i_unit, i_model, attribute, onChange }: EditableTDProps) {
  const [value, setValue] = useState(text);
  return (
    <td {...{ className }}>
      <input
        className='w-full opacity-80'
        type="text"
        value={value}
        onChange={(e) => {
          const ee = e as React.ChangeEvent<HTMLInputElement>;
          setValue(ee.target.value);
        }}
        onBlur={() => {
          if (value) onChange(i_model, i_unit, attribute, value);
        }} />
    </td>
  );
}

interface TableTabProps {
  onChange: (i_model: number, i_product: number, attribute: string, value: string) => void;
  data?: SummaryInfo;
}
export default function TableTab({ data, onChange }: TableTabProps) {
  if (!data) return (<div>Invalid Data</div>);

  const onCountryChange = (
    i_model: number, i_product: number, attribute: string, value: string
  ) => {
    onChange(i_model, i_product, attribute, value.trim().replaceAll(' ', '_'));
  };

  return (
    <div className="h-full w-full">
      <h1 className='font-mono text-sm font-bold py-3'>Year: {data.year}  Week: {data.week}</h1>
      <table className='text-sm font-mono w-full'>
        <thead className='font-bold'>
          <tr>
            <td>Serial Number</td>
            <td>Ticket</td>
            <td>Country</td>
            <td>Summary</td>
            <td>Company</td>
          </tr>
        </thead>
        <tbody>
          {(data.models.flatMap((model, i_model) => model.units.map((unit, i_unit) => {
            return (
              <tr key={`${i_model} ${i_unit}`} className="hover:bg-slate-200">
                <td className='select-all w-[12em]'>{unit.serialNumber}</td>
                <td className='select-all w-[6em]'>{unit.careTicketNumber}</td>
                <TDEdit className='select-all w-[12em] pr-2' {...{ i_model, i_unit, attribute: 'country', onChange: onCountryChange, text: unit.country }} />
                <TDEdit className='w-[35em] pr-2' {...{ i_model, i_unit, attribute: 'summary', onChange, text: unit.summary }} />
                <td>{unit.company}</td>
              </tr>
            );
          })))}
        </tbody>
      </table>
    </div>
  );
}
