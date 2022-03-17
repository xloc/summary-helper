import classNames from 'classnames';
import { useState } from 'react';
import { parseText, SummaryInfo } from './logic';
import TableTab from './TableTab';
import InputTab from './InputTab';
import update from 'immutability-helper';
import OutputTab from './OutputTab';


enum Tab {
  input = 'input',
  output = 'output',
  table = "table",
}




function App() {
  const [currentTab, setCurrentTab] = useState(Tab.table);

  const makeTabItem = (tab: Tab, text: string) => {
    return <li
      className={classNames(
        "p-1 w-40 text-center  rounded-lg shadow-md",
        {
          "text-white bg-slate-600": currentTab === tab,
          "text-black border ": currentTab !== tab,
        }
      )}
      onClick={() => { setCurrentTab(tab); }}
    >{text}</li>;
  };

  const [summaryInfo, setSummaryInfo] = useState<SummaryInfo>();
  const onTextChange = (text: string) => {
    let parseResult = parseText(text);

    if (parseResult) {
      setSummaryInfo(parseResult);
    }
  };
  const onTableChange = (i_model: number, i_unit: number, attribute: string, value: string) => {
    if (!summaryInfo) return;
    setSummaryInfo(update(summaryInfo, {
      models: { [i_model]: { units: { [i_unit]: { [attribute]: { $set: value } } } } }
    }));
  };

  return (
    <div className='h-screen'>
      <div className="flex flex-col p-2 h-full">
        <ul className='flex text-lg w-full h-30 space-x-2 mb-2 select-none'>
          {makeTabItem(Tab.input, "Input")}
          {makeTabItem(Tab.table, "Table")}
          {makeTabItem(Tab.output, "Output")}
        </ul>
        <div className="flex-1">
          {currentTab === Tab.input ?
            <InputTab data={summaryInfo} onChange={onTextChange} /> :
            currentTab === Tab.table ?
              <TableTab data={summaryInfo} onChange={onTableChange} /> :
              currentTab === Tab.output ?
                <OutputTab data={summaryInfo} /> :
                "not a valid tab"}
        </div>

      </div>

    </div>
  );
}

export default App;
