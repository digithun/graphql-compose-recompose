const express = require('express')
const bodyParser = require('body-parser')
const { GraphQLString } = require('graphql')
const { TypeComposer } = require('graphql-compose')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const { GQC } = require('graphql-compose')
const { compose, extendField, addResolver, addFields } = require('../lib')

const app = express()
const foo = TypeComposer.create(`type foo { bar: String }`)
const FooTC = compose(
 addResolver({
   name: 'getFool',
   type: foo.getType(),
   resolve: () => {
     return {
       bar: 'hello'
     }
   }
 }),
 extendField('bar', {
   description: 'get bar',
   resolve: (root) => {
     return root.bar + ' bar'
   }
 }),
 addFields({
   foobar: {
     type: GraphQLString,
     resolve: () => 'it foobar!'
   }
 })
)(foo)

GQC
  .rootQuery()
  .addFields({
    getFoo: FooTC.getResolver('getFool')
  })

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: GQC.buildSchema()
}))
app.use('/', graphiqlExpress({
  endpointURL: '/graphql'
}))

app.listen(3000, function () {
  console.log('Graphiql launch on 3000')
})
