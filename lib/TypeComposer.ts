// TypeComposer High order function
import {
  GraphQLFieldConfigMap,
  GraphQLFieldResolver
} from 'graphql'


const tcHOC = (method: string, ...args) => {
  return (TC: any) => {
    TC[method](...args)
    return TC
  }
}

const setFields = (graphqlFieldMapConfig: GraphQLFieldConfigMap<any, any>) => {
  return tcHOC('setFields', graphqlFieldMapConfig)
}
const addFields = (graphqlFieldMapConfig: GraphQLFieldConfigMap<any, any>) => {
  return tcHOC('addFields', graphqlFieldMapConfig)
}
const removeField = (graphqlRemoveFieldConfig: string | string[]) => {
  return tcHOC('removeField', graphqlRemoveFieldConfig)
}
const removeOtherFields = (graphqlRemoveOtherFields: string[]) => tcHOC('removeOtherFields', graphqlRemoveOtherFields)
const reorderFields = (graphqlReOrderFieldsConfig: string[]) => tcHOC('reorderFields', graphqlReOrderFieldsConfig)
const deprecateFields = (graphqlDeprecateFieldsConfig: { [key: string]: string} ) => tcHOC('deprecateFields', graphqlDeprecateFieldsConfig)
const extendField = (fieldName: string, graphqlExtendFieldsConfig: { description: string, resolve: GraphQLFieldResolver<any,any>}) => tcHOC('extendField', fieldName, graphqlExtendFieldsConfig)
export {
  setFields,
  addFields,
  removeField,
  removeOtherFields,
  reorderFields,
  deprecateFields,
  extendField
}