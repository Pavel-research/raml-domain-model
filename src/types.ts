export interface MarkerObject {
    line: number
    column: number
    position: number
}

export interface RangeObject {
    start: MarkerObject,
    end: MarkerObject
}
export interface IValidationPath {
    name: string|number
    child?: IValidationPath
}
export interface IExample {
    name(): string;
    strict(): boolean;
    value(): any;
    annotationsMap(): {
        [key: string]: IAnnotation[];
    };
    annotations(): IAnnotation[];
}
export interface IStatus {


    /**
     * returns true if status does not have errors
     */
    isOk(): boolean

    /**
     * return true if this status contains a warning
     */
    isWarning(): boolean
    /**
     * return true if this status contains a error
     */
    isError(): boolean
    /**
     * return true if this status is just information
     */
    isInfo(): boolean
    /**
     * returns human readable message associated with this status
     */
    getMessage(): string

    setMessage(m: string): void;

    /**
     * returns an array of nested statuses
     */
    getSubStatuses(): IStatus[]

    /**
     * return an object which raised this status
     */
    getSource(): any

    /**
     * returns primitive error statuses gathered recurrently, returns warnings to.
     */
    getErrors(): IStatus[];

    getValidationPath(): IValidationPath;

    setValidationPath(p: IValidationPath): void;

    /**
     * returns path to this status
     */
    getValidationPathAsString(): string;

    /**
     * Unique identifier
     */
    getCode(): string

    setCode(c: string): void;

    getSeverity(): number;

    getInternalRange(): RangeObject;

    getInternalPath(): IValidationPath;

    getFilePath(): string;
}

export interface IAnnotated {

    annotations(): IAnnotation[]

    annotation(name: string): any
}

export enum MetaInformationKind {
    Description,
    NotScalar,
    DisplayName,
    Usage,
    Annotation,
    FacetDeclaration,
    CustomFacet,
    Example,
    Required,
    HasPropertiesFacet,
    AllowedTargets,
    Examples,
    XMLInfo,
    Default,
    Constraint,
    Modifier,
    Discriminator,
    DiscriminatorValue
}
/**
 * this is a common super interface for restrictions and meta data
 */
export interface ITypeFacet {

    /**
     * name of the facet
     */
    facetName(): string

    /**
     * returns a type to which this facet  belongs
     */
    owner(): Type

    /**
     * return true if this facet is inheritable
     */
    isInheritable(): boolean

    /**
     * returns value associated with the facet
     */
    value(): any

    /**
     * Returns kind of meta-information this instance represents.
     */
    kind(): MetaInformationKind

    /**
     * Annotations applied to the facet
     */
    annotations(): IAnnotation[]
}
export  interface PropertyIsFacet extends ITypeFacet {
    cloneWithType(t: Type): PropertyIsFacet;
    readonly name: string
}
/**
 * Model of annotation instances applied to types or their facets
 */
export interface IAnnotation {

    /**
     * Returns owner facet for annotations applied to facets
     */
    ownerFacet(): ITypeFacet

    /**
     * Returns owner type for annotations applied to types
     */
    owner(): Type

    /**
     * Annotation name
     */
    name(): string;

    /**
     * Annotation value
     */
    value(): any;

    /**
     * Annotation definition type
     */
    definition(): Type;
}

export interface IParsedTypeCollection {

    /**
     * returns a type for a given name
     * @param name
     */
    getType(name: string): Type

    /**
     * returns annotation type for a given name
     * @param name
     */
    getAnnotationType(name: string): Type

    /**
     * lists the types defined in this collection
     */
    types(): Type[]
    /**
     * lists annotation types defined in this collection
     */
    annotationTypes(): Type[]

}


export  interface ITypeRegistry {

    /**
     * returns a type associated with a given name
     * @param name
     */
    get(name: string): Type

    /**
     * list all types stored in this registry
     */
    types(): Type[]
}


export interface Property {

    name();

    required(): boolean

    range(): Type

    declaredAt(): Type

    isPattern(): boolean

    isAdditional(): boolean
}

/**
 * parsed representation of the type
 * you should not create instances of this interfaces manually
 */
export interface Type extends IAnnotated{

    /**
     * returns  list of directly declared sub types of this type
     */
    subTypes(): Type[]
    /**
     * returns  list of directly declared super types of this type
     */
    superTypes(): Type[]


    /**
     * name of the type
     */
    name(): string

    /**
     * returns full list of known types which inherit from this type.
     * Note: built-in types does not list their not built in sub types
     */
    allSubTypes(): Type[]


    /**
     * returns full list of ancestor types
     */

    allSuperTypes(): Type[]


    examples(): IExample[]


    annotations(): IAnnotation[]


    declaredAnnotations(): IAnnotation[]


    componentType(): Type

    /**
     * for union types returns options, for a normal ones returns an array consisting from type itself
     */

    allOptions(): Type[]

    properties(): Property[]


    declaredProperties(): Property[]


    property(name: string): Property

    /**
     * validates a potential instance of type and returns a status describing the results of validation
     * @param i
     */
    validate(i: any, autoClose?: boolean): IStatus


    ac(i: any): Type



    /**
     * returns all meta information and restrictions associated with the type all inheritable facets from super types are included
     */
    allFacets(): ITypeFacet[]


    exampleObject(): any
    /**
     * returns  meta information and restrictions associated with the type only declared facets are included
     */
    declaredFacets(): ITypeFacet[]

    /**
     * returns array of custom facets directly declared on this type
     */
    customFacets(): ITypeFacet[]

    /**
     * returns array of custom facets directly declared on this type
     */
    restrictions(): ITypeFacet[]

    /**
     * returns true if this type is anonimous
     */
    isAnonymous(): boolean;
    /**
     * returns true if this type is empty
     */
    isEmpty(): boolean;

    /**
     * returns true if this type inherits from object type
     */
    isObject(): boolean
    /**
     * returns true if this type inherits from string type
     */
    isString(): boolean
    /**
     * returns true if this type inherits from number type
     */
    isNumber(): boolean

    /**
     * returns true if this type inherits from boolean type
     */
    isBoolean(): boolean
    /**
     * returns true if this type inherits from integer type
     */
    isInteger(): boolean
    /**
     * returns true if this type inherits from one of date related types
     */
    isDateTime(): boolean

    /**
     * returns true if this type inherits from one of date related types
     */
    isDateOnly(): boolean

    /**
     * returns true if this type inherits from one of date related types
     */
    isTimeOnly(): boolean

    /**
     * returns true if this type inherits from one of date related types
     */
    isDateTimeOnly(): boolean
    /**
     * returns true if this type inherits from array type
     */
    isArray(): boolean
    /**
     * returns true if this type inherits from scalar type
     */
    isScalar(): boolean

    /**
     * returns true if this type is a union type
     */
    isUnion(): boolean

    /**
     * returns true if this type is an intersection type
     */
    isIntersection(): boolean

    /**
     * returns true if this type inherits from an unknown type
     */
    isUnknown(): boolean;

    /**
     * return true if this type inherits from a file type
     */
    isFile(): boolean;

    /**
     * returns true if this type has recurrent definition;
     */
    isRecurrent(): boolean;

    /**
     * returns true if this type is built in
     */
    isBuiltin(): boolean

    cloneWithFilter(x: (y: ITypeFacet, transformed?: Type) => boolean | ITypeFacet, f?: (t: Type) => Type): Type;

    registry(): IParsedTypeCollection

    isAssignableFrom(t: Type): boolean
}