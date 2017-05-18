import types=require("./types")

export import Type=types.Type;
export import IAnnotation=types.IAnnotation;
export import Property=types.Property;
export import Facet=types.ITypeFacet;
export import IAnnotated=types.IAnnotated;

export interface Api extends types.IAnnotated,types.IParsedTypeCollection {

    title(): string

    baseUri(): string

    version(): string

    description(): string

    resources(): Resource[]

    allResources(): Resource[]

    allMethods(): Method[];
}

export interface Library extends types.IAnnotated,types.IParsedTypeCollection{

}

export interface Resource extends types.IAnnotated {

    relativeUrl();

    fullRelativeUrl();

    absoluteUrl();

    parentResource(): Resource

    resources(): Resource[]

    methods(): Method[]

    owningApi(): Api

    uriParameters(): Parameter[];

    allUriParameters(): Parameter[];
}

export interface Method extends types.IAnnotated {

    displayName(): string //

    description(): string //

    method(): string //

    parameters(): Parameter[]; //

    bodies(): Body[]; //

    responses(): Response[] //

    resource(): Resource //
}

export interface Response extends types.IAnnotated {

    code(): string //

    headers(): Parameter[] //

    bodies(): Body[] //

    method(): Method //
}

export interface Parameter extends types.IAnnotated {

    name(): string  //

    required(): boolean //

    type(): Type //

    location(): string //
}

export interface Body extends types.IAnnotated {

    mimeType(): string //

    type(): Type //
}