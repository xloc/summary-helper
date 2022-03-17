import classNames from 'classnames';
import { useState } from 'react';
import { parseText, SummaryInfo } from './logic';
import TableTab from './TableTab';
import TextTab from './TextTab';

enum Tab {
  text = "text",
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
    console.log(parseResult.models[0]);

    if (parseResult) {
      setSummaryInfo(parseResult);
    }
  };
  const onTableChange = (i_model: number, i_product: number, attribute: string, value: string) => { };

  return (
    <div className='h-screen'>
      <div className="flex flex-col p-2 h-full">
        <ul className='flex text-lg w-full h-30 space-x-2 mb-2 select-none'>
          {makeTabItem(Tab.text, "Text")}
          {makeTabItem(Tab.table, "Table")}
        </ul>
        {/* <div className="flex-1">
          {currentTab === Tab.text ?
            <TextTab /> :
            currentTab === Tab.table ?
              <TableTab /> :
              "not a valid tab"}
        </div> */}
        <div className="flex h-full">
          <div className="flex-1"><TextTab data={summaryInfo} onChange={onTextChange} /></div>
          <div className="flex-1"><TableTab data={summaryInfo} onChange={onTableChange} /></div>
        </div>

      </div>

    </div>
  );
}

export default App;
