import {Utils} from './Utils';

interface IAttribsHash {
  [name: string]: boolean
};

/**
 * @name Attribs
 * @description attributes
 */
export class Attribs {
  public hash: IAttribsHash;
  private utils: Utils;

  /**
   * @name constructor
   * @description class initializer
   * @param {string | string[] | undefined} attribs - optional attributes for initilization
   */
  constructor(attribs: string | string[] | undefined = undefined) {
    this.hash = {};
    this.utils = new Utils();
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
  add(attribs: string | string[]): void {
    if (typeof attribs !== 'string') {
      attribs.forEach((value) => {
        this.hash[value] = true;
      })
    } else {
      this.hash[attribs] = true;
    }
  }

  /**
   * @name remove
   * @description remove an attribute
   * @param {string} attrib - attribute name
   * @return {void}
   */
  remove(attrib: string): void {
    delete this.hash[attrib];
  }

  /**
   * @name has
   * @description determines whether an attribute exists in the bag
   * @param {string} attrib - attribute name
   * @return {boolean} true if attribute exists, false if not
   */
  has(attrib: string): boolean {
    return (this.hash[attrib]) ? true : false;
  }

  /**
   * @name all
   * @description return an array containing all attributes names
   * @return {string[]} list of string attribute names
   */
  all(): string[] {
    return Object.keys(this.hash);
  }

  /**
   * @name flush
   * @description flush all attributes
   * @return {void}
   */
  flush(): void {
    this.hash = {};
  }

  /**
   * @name clone
   * @description clone attributes into this attribute bag
   * @param {Attribs} attribs
   * @return {void}
   */
  clone(attribs: Attribs): void {
    this.hash = <IAttribsHash>this.utils.mergeObjects({}, attribs.hash)
  }

  /**
   * @name union
   * @description return a union of shared attributes between this and other Attrib
   * @param {Attribs} other Attribs object
   * @return {string[]} array of matching attribute strings if any
   */
  union(attribs: Attribs): string[] {
    let matches: string[] = [];
    Object.keys(this.hash).forEach((name) => {
      if (attribs.has(name)) {
        matches.push(name);
      }
    });
    return matches;
  }
}
