declare module '*.jpg';
declare module '*.png';
declare module '*.svg';

declare module 'react-xml-parser' {
    interface XMLElement {
      name: string;
      attributes: {
        [name: string]: string;
      };
      value: string;
      children: XMLElement[];
  
      getElementsByTagName(tagName: string): XMLElement[];
    }
  
    export default class XMLParser {
      constructor();
      public parseFromString(string: string): XMLElement;
      public toString(xml: XMLElement): string;
    }
  }