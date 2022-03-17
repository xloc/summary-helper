import React, { FormEventHandler, useState } from 'react';
import { SummaryInfo, UnitInfo } from './logic';



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
    <td {...{ className }}><input
      type="text"
      value={value}
      onChange={(e) => {
        const ee = e as React.ChangeEvent<HTMLInputElement>;
        setValue(ee.target.value);
      }}
      onBlur={() => {
        if (value) onChange(i_model, i_unit, attribute, value);
      }} /></td>
  );
}

interface TableTabProps {
  onChange: (i_model: number, i_product: number, attribute: string, value: string) => void;
  data?: SummaryInfo;
}
export default function TableTab({ data, onChange }: TableTabProps) {
  if (!data) return (<div>Invalid Data</div>);

  return (
    <table className='text-sm font-mono w-full'>
      <thead className='font-bold'>
        <tr><td>Year: {data.year}  Week: {data.week}</td></tr>
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
            <tr key={`${i_model} ${i_unit}`} className="">
              <td className='select-all'>{unit.serialNumber}</td>
              <td className='select-all'>{unit.careTicketNumber}</td>
              <TDEdit className='select-all' {...{ i_model, i_unit, attribute: 'country', onChange, text: unit.country }} />
              <td>{unit.summary}</td>
              <td>{unit.company}</td>
            </tr>
          );
        })))}
      </tbody>
    </table>
  );
}
