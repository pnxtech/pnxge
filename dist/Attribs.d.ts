interface IAttribsHash {
    [name: string]: boolean;
}
/**
 * @name Attribs
 * @description attributes
 */
export declare class Attribs {
    hash: IAttribsHash;
    private utils;
    /**
     * @name constructor
     * @description class initializer
     */
    constructor();
    /**
     * @name add
     * @description add an attribute
     * @param {string | string[]} attrib - attribute name(s)
     * @return {void}
     */
    add(attribs: string | string[]): void;
    /**
     * @name remove
     * @description remove an attribute
     * @param {string} attrib - attribute name
     * @return {void}
     */
    remove(attrib: string): void;
    /**
     * @name has
     * @description determines whether an attribute exists in the bag
     * @param {string} attrib - attribute name
     * @return {boolean} true if attribute exists, false if not
     */
    has(attrib: string): boolean;
    /**
     * @name all
     * @description return an array containing all attributes names
     * @return {string[]} list of string attribute names
     */
    all(): string[];
    /**
     * @name flush
     * @description flush all attributes
     * @return {void}
     */
    flush(): void;
    /**
     * @name clone
     * @description clone attributes into this attribute bag
     * @param {Attribs} attribs
     * @return {void}
     */
    clone(attribs: Attribs): void;
}
export {};
//# sourceMappingURL=Attribs.d.ts.map