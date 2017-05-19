# RAML HTTP DOMAIN MODEL

RAML is a language for the definition of HTTP-based APIs that embody most or all of the principles of Representational State Transfer (REST)

-----

The goal of this repository is to define set of typescript interfaces describing RAMLs view on HTTP interfaces. This interfaces represent semantic view on RAML documents and ignores document/templating level abstractions such as *Overlays* and *Traits*

Major interfaces:

![Diagram](diagram.png)


It is expected that this view is good for tool developers who are only interested in semantic concepts encoded in RAML files, such as mock servers, api consoles, client generators. In other words this interfaces are not expected to be best for somebody who is writing an IDE, but should be good for the person who want to generate API documentation from RAML files or striving for creation of another testing tool for APIs.

