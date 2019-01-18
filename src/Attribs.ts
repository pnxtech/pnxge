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
   */
  constructor() {
    this.hash = {};
    this.utils = new Utils();
  }

  /**
   * @name add
   * @description add an attribute
   * @param {string} attrib - attribute name
   * @return {void}
   */
  add(attrib: string): void {
    this.hash[attrib] = true;
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
}
