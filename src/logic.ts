import { DateTime, Duration } from 'luxon';

export interface UnitInfo {
  serialNumber: string;
  careTicketNumber: string;
  country?: string;
  summary?: string;
  company?: string;
}

export interface Model {
  name: string;
  units: UnitInfo[];
}

export interface SummaryInfo {
  year: number;
  week: number;
  models: Model[];
}

function parseCaseLine(line: string): UnitInfo | undefined {
  // SN - 16 digits
  const rawRegex = /^(F[-A-Z0-9]{15}) (\d+) \?\? (.+)$/;
  const rawMatchResult = line.match(rawRegex);
  if (rawMatchResult) {
    const serialNumber = rawMatchResult[1];
    const careTicketNumber = rawMatchResult[2];
    const company = rawMatchResult[3];
    return { serialNumber, careTicketNumber, company };
  }

  const summarizedRegex = /^\d{2}. (F[-A-Z0-9]{15}) (\d+) ([_A-Z]+) -+ (.+)$/;
  const summarizedMatchResult = line.match(summarizedRegex);
  if (summarizedMatchResult) {
    const serialNumber = summarizedMatchResult[1];
    const careTicketNumber = summarizedMatchResult[2];
    const country = summarizedMatchResult[3];
    const summary = summarizedMatchResult[4];
    return { serialNumber, careTicketNumber, country, summary };
  }
}

export const parseText = function (text: string): SummaryInfo {
  var date = DateTime.now()
    .setZone('America/Vancouver')
    .minus(Duration.fromObject({ weeks: 1 }));

  let year = date.year;
  let week: number = date.weekNumber;
  let models: Model[] = [];

  text = text.trim();

  const year_week = text.match(/^Y([0-9]{2})WK([0-9]{2})/);
  if (year_week) {
    year = 2000 + parseInt(year_week[1]);
    week = parseInt(year_week[2]);
    text.slice(text.indexOf('\n') + 1);
  }


  const modelNameRegex = /^(\s*[A-Z]{3}\s*)$/m;

  let splitedModelTexts = text.split(modelNameRegex);

  for (let i = 0; i < splitedModelTexts.length; i++) {
    let modelName = splitedModelTexts[i];

    if (modelName.match(modelNameRegex)) {
      modelName = modelName.trim();
      if (i + 1 < splitedModelTexts.length) {
        i += 1;
        let casesText = splitedModelTexts[i].trim();
        // parse RMA cases
        models.push({
          name: modelName,
          units: casesText.split('\n').map(parseCaseLine).filter(v => v !== undefined) as UnitInfo[]
        });
      }
    }
  }

  return {
    year, week, models
  };
};

`
FMG
FM3K7FT318900025 5811496 ?? SHARED SERVICES 
FMG2KE3R17000019 5779439 ?? SOFTLAYER
FMG2KE3R17000019 5822031 ?? IBM INTERNATIONA
	FAZ
FL-2HFTB21000107 5776989 ?? SIS DISTRIBUTION
FAZ1KFTA20000010 5829910 ?? NEUCA S.A.
FAZ1KFTA21000115 5756695 ?? TELECOM BUSINESS
FL-1KE3R17000131 5813228 ?? ORANGE
FL-2KE3R17000084 5811566 ?? USARMY-CCDC-CBC
FL3K5GTA21900029 5824257 ?? KAPPA10 LTDA
FL-3KFT319000178 5802160 ?? CIBC

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
