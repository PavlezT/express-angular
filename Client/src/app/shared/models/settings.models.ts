export interface IListItemPathology {
  effects: string[];
  text: string;
  side: boolean;
  area: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface IUpdatePathology {
  text: string;
  side: boolean;
  area: string;
}

export interface IListSurgeryItem {
  text: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface IListMarketingItem {
  text: string;
  count: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface IUpdateMarketingItem {
  text: string;
  count: string;
}
