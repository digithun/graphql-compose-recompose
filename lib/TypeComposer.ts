// TypeComposer High order function
import {
  GraphQLFieldConfigMap
} from 'graphql'

const setFields = (graphqlFieldMapConfig: GraphQLFieldConfigMap<any, any>) => {
  return (TC: any) => {
    TC.setFields(graphqlFieldMapConfig)
    return TC    
  }
}
const addFields = (graphqlFieldMapConfig: GraphQLFieldConfigMap<any, any>) => {
  return (TC: any) => {
    TC.addFields(graphqlFieldMapConfig)
    return TC    
  }
}


export {
  setFields,
  addFields
}