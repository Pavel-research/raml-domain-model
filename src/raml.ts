import types=require("./types")

export import IAnnotation=types.IAnnotation;
export import Property=types.Property;
export import Facet=types.ITypeFacet;
export import IAnnotated=types.IAnnotated;

export interface Type extends types.Type,IAnnotated {

}
export interface SecuritySchemeDefinition extends IAnnotated{

    name(): string

    type(): string

    description(): string

    settings(): {[name: string]: any}
}

export interface SecuredBy {
    name(): string
    settings(): {[name: string]: any}
}
export interface Documentation{
    title(): string
    content(): string;
}
export interface Api extends types.IAnnotated,types.IParsedTypeCollection {

    title(): string

    baseUri(): string

    version(): string

    description(): string

    documentation(): Documentation[]

    resources(): Resource[]

    allResources(): Resource[]

    allMethods(): Method[];

    securitySchemes(): SecuritySchemeDefinition[]

    securedBy(): SecuredBy[]

    protocols(): string[]

    mediaType(): string[]

    baseUriParameters(): Parameter[];
}


export interface Library extends types.IAnnotated,types.IParsedTypeCollection {

    securitySchemes(): SecuritySchemeDefinition[]

    usage(): string
}

export interface Resource extends types.IAnnotated {

    securedBy(): SecuredBy[]

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

    securedBy(): SecuredBy[]

    displayName(): string //

    description(): string //

    method(): string //

    parameters(): Parameter[]; //

    bodies(): Body[]; //

    responses(): Response[] //

    resource(): Resource //

    protocols(): string[]
}

export interface Response extends types.IAnnotated {

    code(): string //

    headers(): Parameter[] //

    bodies(): Body[] //

    method(): Method //

    description(): string
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