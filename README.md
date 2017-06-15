# Caution working process...

## GraphQL Compose Recompose

This library help your life easier by create composing function that workwith GraphQL compose

Also with Typescript

> Inspire by React utility lib [Recompose](https://github.com/acdlite/recompose)
## Installation
```bash
  $ npm install graphql-compose graphql graphql-compose-recompose
``` 

## Example

### From
```js
UserTC.addFields({
  friend: {
    type: GraphQLString,
    resolve: () => 'Alan' 
  }
});
UserTC.extendField('friend',{
  description: 'Get his friend'
});

exports.TC = UserTC
```

### To
```js
const { compose, addRelation } = require('graphql-compose-recompose');
exports.TC = compose(
    addFields(
    'friends',{
      type: GraphQLString,
      resolve: () => 'Alan' 
    })
    extendField(
    'friend',{
      description: 'Get his friend'
    })
)(UserTC);
```

# API

## Typecomposer
```js
  compose(
    setFields({
      foobar: {
      type: GraphQLString
      }
    }),
    addFields({
      foo: {
        type: GraphQLString
      }     
    }),
    // and more
    // removeField
    // removeOtherFields
    // reorderFields
    // deprecateFields
    // extendField
    // addResolver
    // removeResolver
    // setTypeName
    // setDescription
  )(type)
```

## TODO
- [x] Wraping Typecomposer api
- [ ] Wraping InputTypecomposer api
- [ ] Wraping Resolver api
- [ ] Add real life example
- [ ] Unit test
- [x] Type definition
- [x] Use Commitizen
- [ ] Add CI Build
- [ ] Coverage
