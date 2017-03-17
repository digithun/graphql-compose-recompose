# Caution working process...

## GraphQL Compose Recompose

This library help your life easier by create composing function that workwith GraphQL compose
> Inspire by React utility lib [Recompose](https://github.com/acdlite/recompose)
## Installation
```bash
  $ npm install graphql-compose graphql graphql-compose-connection graphql-compose-recompose
``` 

## Example

### From
```js
UserTC.addRelation(
  'friends',
  () => ({
     ... // Relation arg
  })
);
UserTC.addRelation(
  'adultFriendsWithSameGender',
  () => ({
    ... // Relation arg
  })
);

exports.TC = UserTC
```

### To
```js
const { compose, addRelation } = require('graphql-compose-recompose');
exports.TC = compose(
    addRelation(
    'friends',
    () => ({
        ... // Relation arg
    })
    addRelation(
    'adultFriendsWithSameGender',
    () => ({
        ... // Relation arg
    })
)(UserTC);
```

## API

- TBD

## TODO
- [ ] Wraping whole Graphql compose library
- [ ] Add real life example
- [ ] Unit test
- [ ] Type definition
- [ ] Use Commitizen
- [ ] Add CI Build
- [ ] Coverage
