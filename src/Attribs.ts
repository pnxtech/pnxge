import {Utils} from './Utils';

interface IAttribsHash {
  [name: string]: boolean
};

/**
 * @name Attribs
 * @description attributes
 */
export class Attribs {
  private hash: IAttribsHash;

  /**
   * @name constructor
   * @description class initializer
   * @param {string | string[] | undefined} attribs - optional attributes for initilization
   */
  constructor(attribs: string | string[] | undefined = undefined) {
    this.hash = {};
    if (attribs !== undefined) {
      this.add(attribs);
    }
  }

  /**
   * @name add
   * @description add an attribute
   * @param {string | string[]} attrib - attribute name(s)
   * @return {void}
   */
  public add(attribs: string | string[]): void {
    if (typeof attribs !== 'string') {
      attribs.forEach((value) => {
        if (value !== undefined) {
          this.hash[value] = true;
        }
      })
    } else if (attribs !== undefined) {
      this.hash[attribs] = true;
    }
  }

  /**
   * @name remove
   * @description remove an attribute
   * @param {string} attrib - attribute name
   * @return {void}
   */
  public remove(attrib: string): void {
    delete this.hash[attrib];
  }

  /**
   * @name has
   * @description determines whether an attribute exists in the bag
   * @param {string} attrib - attribute name
   * @return {boolean} true if attribute exists, false if not
   */
  public has(attrib: string): boolean {
    return (this.hash[attrib]) ? true : false;
  }

  /**
   * @name all
   * @description return an array containing all attributes names
   * @return {string[]} list of string attribute names
   */
  public all(): string[] {
    return Object.keys(this.hash);
  }

  /**
   * @name flush
   * @description flush all attributes
   * @return {void}
   */
  public flush(): void {
    this.hash = {};
  }

  /**
   * @name clone
   * @description clone attributes into this attribute bag
   * @param {Attribs} attribs
   * @return {void}
   */
  public clone(attribs: Attribs): void {
    this.hash = <IAttribsHash>Utils.mergeObjects({}, attribs.hash)
  }

  /**
   * @name union
   * @description return a union of shared attributes between this and other Attrib
   * @param {Attribs} other Attribs object
   * @return {string[]} array of matching attribute strings if any
   */
  public union(attribs: Attribs): string[] {
    let matches: string[] = [];
    Object.keys(this.hash).forEach((name) => {
      if (attribs.has(name)) {
        matches.push(name);
      }
    });
    return matches;
  }
}
