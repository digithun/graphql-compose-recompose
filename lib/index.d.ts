
type ResolverParams = {source: any, args: any, context: any};
type ResolveParamsMapper = (resolverParams: ResolverParams, oldResolver: (params: ResolverParams) => any) => void | Promise;
type RelationResolverArg = {
    /** Arguments to passing to resolver */
    resolver: any;
    args: any & { argumentName: (source, args, context) => void };
    argsMapper: any & { argumentName: (source, args, context) => void };
    projection: any & { fieldName: number };
}
type GraphQLFieldsArgsMapper = any;
export type RejectFn = (error: any) => void;
export type ResolveFn = (result: any) => void;
export type MiddlewareArgs = { rp: ResolverParams, resolve: ResolveFn, reject: RejectFn };
export type MiddlewareFn = (args: MiddlewareArgs) => void;
/** Like wrapResolver but write with middleware style */
export function addResolverMiddleware(resolverName: String, middleware: MiddlewareFn);
/** Create resolve middleware for Resolver */
export function wrapResolve(resolverName: String, resolveParamsMapper: ResolveParamsMapper);
/** Rename InputType argument name of resolver */
export function renameResolverArg(resolverName: String, oldName: String, newName: String);

/** Add relation nested object from fieldName */
export function addRelation(fieldName: String, relationArgs: RelationResolverArg);

/** Add Resolver to TC */
export function addResolver(resolverObject);
/** set resolver to TC */
export function setResolver(resolverName: String, resolverObject: any);


export function addFields(FieldsArgsMapper: GraphQLFieldsArgsMapper)