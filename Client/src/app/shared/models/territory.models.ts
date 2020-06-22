export interface IListItemTerritory {
  name: string;
  id: string;
}

export interface ITerritory<T> {
  referrals: Array<T>;
  paymentTypes: Array<T>;
  supportedPackages: Array<T>;
  dropOutReasons: Array<T>;
  id?: string;
  postcode: boolean;
  isUK: boolean;
  name: string;
  language: string;
  unitSystem: string;
  insurers: Array<T>;
  activityStatus: Array<{ id: string; name: string ; session?: string} | T>;
}

export interface IActivityStatus {
  id: string;
  name: string;
}

export interface ITableData {
  source: string;
  id?: string;
}

export class TerritoryDTO implements ITerritory<ITableData> {
  referrals: Array<ITableData>;
  paymentTypes: Array<ITableData>;
  supportedPackages: Array<ITableData>;
  dropOutReasons: Array<ITableData>;
  insurers: Array<ITableData>;
  id: string;
  postcode: boolean;
  isUK: boolean;
  name: string;
  language: string;
  unitSystem: string;
  activityStatus: Array<ITableData>;

  set setActivityStatuses(data: Array<IActivityStatus>) {
    this.activityStatus = buildTableData(data, 'name');
  }

  formatForUpdate(): ITerritory<string> {
    const result = {
      name: this.name,
      language: this.language,
      id: this.id,
      postcode: this.postcode,
      isUK: this.isUK,
      unitSystem: this.unitSystem,
      referrals: normalizeData(this.referrals || []),
      paymentTypes: normalizeData(this.paymentTypes || []),
      supportedPackages: normalizeData(this.supportedPackages || []),
      dropOutReasons: normalizeData(this.dropOutReasons || []),
      insurers: normalizeData(this.insurers || []),
      activityStatus: normalizeData(this.activityStatus, 'source')
    };
    return result;
  }

  formatForCreate(): ITerritory<string> {
    const result = {
      name: this.name,
      language: this.language,
      postcode: this.postcode,
      isUK: this.isUK,
      unitSystem: this.unitSystem,
      referrals: normalizeData(this.referrals),
      paymentTypes: normalizeData(this.paymentTypes),
      supportedPackages: normalizeData(this.supportedPackages),
      dropOutReasons: normalizeData(this.dropOutReasons),
      insurers: normalizeData(this.insurers),
      activityStatus: normalizeData(this.activityStatus, 'source')
    };
    return result;
  }

  static createEmptyTerritory(): TerritoryDTO {
    const result = Object.assign(new TerritoryDTO(), {
      name: '',
      language: '',
      unitSystem: '',
      id: '',
      postcode: false,
      isUK: false,
      referrals: buildTableData([]),
      paymentTypes: buildTableData([]),
      supportedPackages: buildTableData([]),
      dropOutReasons: buildTableData([]),
      insurers: buildTableData([]),
      activityStatus: buildTableData([], 'name')
    });
    return result;
  }

  static createNewTerritory(): TerritoryDTO {
    const result = Object.assign(new TerritoryDTO(), {
      name: '',
      language: '',
      unitSystem: '',
      postcode: false,
      isUK: false,
      referrals: [],
      paymentTypes: [],
      supportedPackages: [],
      dropOutReasons: [],
      insurers: [],
      activityStatus: []
    });
    return result;
  }

  static initializeTerritory(data: ITerritory<string>): TerritoryDTO {
    const result = Object.assign(new TerritoryDTO(), {
      name: data.name,
      language: data.language,
      unitSystem: data.unitSystem,
      postcode: data.postcode,
      isUK: data.isUK,
      referrals: buildTableData(data.referrals),
      paymentTypes: buildTableData(data.paymentTypes),
      supportedPackages: buildTableData(data.supportedPackages),
      dropOutReasons: buildTableData(data.dropOutReasons),
      insurers: buildTableData(data.insurers),
      activityStatus: buildTableData(data.activityStatus, 'name')
    });
    return result;
  }
}

function normalizeData(arr: Array<any>, option?: string): Array<any> {
  if (arr.length) {
    if (!option) {
      return arr.map(el => {
        return el.source;
      });
    } else {
      return arr.map(el => {
        return { name: el[option], id: el.id, session: el.session};
      });
    }
  } else {
    return [];
  }
}

function buildTableData(arr: Array<any>, option?: string): Array<ITableData> {
  if (!option) {
    if (arr.length) {
      return arr.map(el => {
        return { source: el };
      });
    } else {
      return null;
    }
  } else {
    return arr.map(el => {
      return { source: el[option], id: el.id, session: el.session };
    });
  }
}
