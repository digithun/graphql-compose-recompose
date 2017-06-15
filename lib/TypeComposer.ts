// TypeComposer High order function
import {
  GraphQLFieldConfigMap,
  GraphQLFieldResolver,
  GraphQLFieldConfig,
  GraphQLArgumentConfig
} from 'graphql'


const tcHOC = (method: string, ...args) => {
  return (TC: any) => {
    TC[method](...args)
    return TC
  }
}

type  GraphQLResolverConfig = {
  name: string;
  args: {
    [key: string]: GraphQLArgumentConfig
  };
  type: GraphQLFieldConfig<any, any>;
  resolve: GraphQLFieldResolver<any,any>;
}

const setFields = (graphqlFieldMapConfig: GraphQLFieldConfigMap<any, any>) => tcHOC('setFields', graphqlFieldMapConfig)
const addFields = (graphqlFieldMapConfig: GraphQLFieldConfigMap<any, any>) => tcHOC('addFields', graphqlFieldMapConfig)
const removeField = (graphqlRemoveFieldConfig: string | string[]) => tcHOC('removeField', graphqlRemoveFieldConfig)
const removeOtherFields = (graphqlRemoveOtherFields: string[]) => tcHOC('removeOtherFields', graphqlRemoveOtherFields)
const reorderFields = (graphqlReOrderFieldsConfig: string[]) => tcHOC('reorderFields', graphqlReOrderFieldsConfig)
const deprecateFields = (graphqlDeprecateFieldsConfig: { [key: string]: string} ) => tcHOC('deprecateFields', graphqlDeprecateFieldsConfig)
const extendField = (fieldName: string, graphqlExtendFieldsConfig: { description: string, resolve: GraphQLFieldResolver<any,any>}) => tcHOC('extendField', fieldName, graphqlExtendFieldsConfig)
const addResolver = (resolver: GraphQLResolverConfig) => tcHOC('addResolver', resolver)
const removeResolver = (resolverName: string) => tcHOC('removeResolver', resolverName)
const setTypeName = (newTypename: string) => tcHOC('setTypeName', newTypename)
const setDescription = (newDescription: string) => tcHOC('setDescription', newDescription)

export {
  setFields,
  addFields,
  removeField,
  removeOtherFields,
  reorderFields,
  deprecateFields,
  extendField,
  addResolver,
  setTypeName,
  setDescription
}