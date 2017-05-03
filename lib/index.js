
function compose (...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

function addResolverMiddleware (resolverName, middleware) {
  return (typeComposer) => {
    const resolver = typeComposer
    .getResolver(resolverName)
    .wrapResolve(oldResolve => async rp => new Promise((resolve, reject) => {
      const next = async () => {
        const result = await oldResolve(rp)
        resolve(result)
        return result
      };
      middleware({
        rp,
        resolve,
        reject
      }, next)
    }))
    .clone({
      name: resolverName
    })
    typeComposer.removeResolver(resolverName)
    typeComposer.addResolver(resolver)
    return typeComposer
  };
}

// @bug: wrapResolve should use before setResolver
function wrapResolve (resolverName, resolveParamsMapper) {
  return (TC) => {
    const resolver = TC.getResolver(resolverName)
      .wrapResolve(next => rp => resolveParamsMapper(rp, next))
    TC.setResolver(resolverName, resolver)
    return TC
  };
}

function renameResolverArg (resolverName, oldName, newName) {
  return (TC) => {
    const typeConfig = TC.getResolver(resolverName).getArgType(oldName)
    const resolver = TC.getResolver(resolverName)
      .removeArg(oldName)
      .addArgs({
        [newName]: typeConfig
      })

    TC.setResolver(resolverName, resolver)
    return wrapResolve(resolverName, rp => Object.assign({}, rp, {
      args: {
        [oldName]: rp.args[newName]
      }
    }))(TC)
  };
}

function addRelation (fieldName, relationArgs) {
  return (TC) => {
    TC.addRelation(fieldName, () => relationArgs)
    return TC
  };
}

function addFields (FieldsArgsMapper) {
  return (TC) => {
    TC.addFields(FieldsArgsMapper)
    return TC
  };
}

// This is ambigous method
function removeField (fieldName) {
  return (TC) => {
    TC.removeField(fieldName)
    return TC
  };
}

function addResolver (resolverObject) {
  return (TC) => {
    TC.addResolver(resolverObject)
    return TC
  };
}
function extendField (fieldName, extendFieldOptions) {
  return (TC) => {
    TC.extendField(fieldName, extendFieldOptions)
    return TC
  };
}
function setResolver (resolverName, resolverObject) {
  return (TC) => {
    TC.setResolver(resolverName, resolverObject)
    return TC
  };
}
function addFilterArg (resolverName, filterArg) {
  return (TC) => {
    const resolver = TC.getResolver(resolverName)
    .addFilterArg(filterArg)
    TC.setResolver(resolverName, resolver)
    return TC
  };
}

function addSortArg (resolverName, sortArg) {
  return (TC) => {
    const resolver = TC.getResolver(resolverName)
    .addSortArg(sortArg)
    TC.setResolver(resolverName, resolver)
    return TC
  };
}

module.exports = {
  addSortArg,
  addRelation,
  extendField,
  addResolverMiddleware,
  addResolver,
  setResolver,
  renameResolverArg,
  removeField,
  wrapResolve,
  addFilterArg,
  compose,
  addFields
}
