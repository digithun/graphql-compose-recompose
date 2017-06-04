const { setFields, compose, addFields } = require('../lib')
const { TypeComposer } = require('graphql-compose')
const { GraphQLString } = require('graphql')

describe('Typecomposer compose test', () => {
  const createFooType = () => TypeComposer.create(` type foo { bar: String }`)
  it('should compose setFields equal to Typecomposer.setFields', () => {
    const fieldToSet = {
      foobar: {
        type: GraphQLString
      }
    }
    const composedType = compose(
      setFields(fieldToSet)
    )(createFooType())
    const modType = createFooType()
    modType.setFields(fieldToSet)

    expect(composedType).toEqual(expect.anything())
    expect(composedType.getFields()).toEqual(modType.getFields())
  })
  it('should compose addFields equal to Typecomposer.addFields', () => {
    const fieldToAdd = {
      foo: {
        type: GraphQLString
      }
    }

    const composedType = compose(
      addFields(fieldToAdd)
    )(createFooType())
    const modType = createFooType()
    modType.addFields(fieldToAdd)

    expect(composedType).toEqual(expect.anything())
    expect(composedType.getFields()).toEqual(modType.getFields())
  })
})
