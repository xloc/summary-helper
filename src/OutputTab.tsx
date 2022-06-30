import React from 'react';
import { SummaryInfo } from './logic';

const format = (n: number) => n.toString().padStart(2, '0');


interface OutputTabProps {
  data?: SummaryInfo;
}
export default function OutputTab({ data }: OutputTabProps) {
  if (!data) return <div>Invalid Data</div>;

  const { year, week, models } = data;

  const nUnit = models.flatMap(model => model.units.length).reduce((prev, curr) => prev + curr);

  const maxCountryLength = models.flatMap(model => model.units.map(unit => unit.country?.length ?? 0)).reduce((a, b) => Math.max(a, b));
  console.log({ year, week, nUnit, maxCountryLength });

  return (
    <pre>
      Y{format(year % 100)}WK{format(week)} - {nUnit} units<br />

      {models.map(model => {
        return '\n' + model.name + '\n' + model.units
          .map((unit, i_unit) => (
            `${format(i_unit + 1)}. ${unit.serialNumber} ${unit.careTicketNumber} ${unit.country} ${'-'.repeat(maxCountryLength + 1 - (unit.country?.length ?? 0))} ${unit.summary}\n`
          ))
          .reduce((a, b) => (a + b), "");
      })}
    </pre>
  );
}
