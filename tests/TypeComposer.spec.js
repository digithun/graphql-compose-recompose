const { setFields, compose, addFields, extendField } = require('../lib')
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

  it('should extendFields equal to Typecomposer.extendField', () => {
    const extendConfig = {
      resolve: () => 'hello'
    }
    const composedType = compose(
      extendField('bar', extendConfig)
    )(createFooType())
    const modType = createFooType()
    modType.extendField('bar', extendConfig)

    expect(composedType).toEqual(expect.anything())
    expect(composedType.getFields()).toEqual(modType.getFields())
  })
})
