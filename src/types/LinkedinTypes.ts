interface ILocalized {
  [key: string]: string;
}

interface IPreferredLocale {
  country: string;
  language: string;
}

export interface IName {
  localized: ILocalized;
  preferredLocale: IPreferredLocale;
}

interface IPaging {
  count: number;
  links: Array<any>;
  start: number;
}

interface IDisplayAspectRatio {
  formatted: string;
  heightAspect: number;
  widthAspect: number;
}

interface IDisplaySize {
  height: number;
  uom: string;
  width: number;
}

interface IRawCodecSpec {
  name: string;
  type: string;
}

interface IStorageAspectRatio {
  formatted: string;
  heightAspect: number;
  widthAspect: number;
}

interface IStorageSize {
  height: number;
  width: number;
}

interface IElementData {
  "com.linkedin.digitalmedia.mediaartifact.StillImage": {
    displayAspectRatio: IDisplayAspectRatio;
    displaySize: IDisplaySize;
    mediaType: string;
    rawCodecSpec: IRawCodecSpec;
    storageAspectRatio: IStorageAspectRatio;
    storageSize: IStorageSize;
  };
}

interface IIdentifier {
  file: string;
  identifier: string;
  identifierExpiresInSeconds: number;
  identifierType: string;
  index: number;
  mediaType: string;
}

interface IElement {
  artifact: string;
  authorizationMethod: string;
  data: IElementData;
  identifiers: Array<IIdentifier>;
}

interface IDisplayImageDetail {
  elements: Array<IElement>;
  paging: IPaging;
}

export interface IMeResponse {
  firstName: IName;
  id: string;
  lastName: IName;
  profilePicture: {
    displayImage: string;
    "displayImage~": IDisplayImageDetail;
  };
}

interface IEmailResponseElement {
  handle: string;
  "handle~": {
    emailAddress: string;
  };
}

export interface IEmailResponse {
  elements: Array<IEmailResponseElement>;
}
