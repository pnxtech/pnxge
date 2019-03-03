/**
 * @name Attribs
 * @description attributes
 */
export declare class Attribs {
    private hash;
    /**
     * @name constructor
     * @description class initializer
     * @param {string | string[] | undefined} attribs - optional attributes for initilization
     */
    constructor(attribs?: string | string[] | undefined);
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
    /**
     * @name union
     * @description return a union of shared attributes between this and other Attrib
     * @param {Attribs} other Attribs object
     * @return {string[]} array of matching attribute strings if any
     */
    union(attribs: Attribs): string[];
}
//# sourceMappingURL=Attribs.d.ts.map