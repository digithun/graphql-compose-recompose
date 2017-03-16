
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

function wrapResolve(resolverName, resolveParamsMapper) {
  return (TC) => {
    const resolver = TC.getResolver(resolverName)
      .wrapResolve(next => rp => next(resolveParamsMapper(rp)));
    TC.setResolver(resolverName, resolver);
    return TC;
  };
}

function renameResolverArg(resolverName, oldName, newName) {
  return (TC) => {
    const typeConfig = TC.getResolver(resolverName).getArgType(oldName);
    const resolver = TC.getResolver(resolverName)
      .removeArg(oldName)
      .addArgs({
        [newName]: typeConfig,
      });

    TC.setResolver(resolverName, resolver);
    return wrapResolve(resolverName, rp => ({
      ...rp,
      args: {
        [oldName]: rp.args[newName],
      },
    }))(TC);
  };
}


function addRelation(fieldName, relationArgs) {
  return (TC) => {
    TC.addRelation(fieldName, () => relationArgs);
    return TC;
  };
}

function addFields(FieldsArgsMapper) {
  return (TC) => {
    TC.addFields(FieldsArgsMapper);
    return TC;
  };
}

// This is ambigous method
function addResolver(resolverObject) {
  return (TC) => {
    TC.addResolver(resolverObject);
    return TC;
  };
}
function setResolver(resolverName, resolverObject) {
  return (TC) => {
    TC.setResolver(resolverName, resolverObject);
    return TC;
  };
}
function addFilterArg(resolverName, filterArg) {
  return (TC) => {
    const resolver = TC.getResolver(resolverName)
    .addFilters(filterArg);
    TC.setResolver(resolverName, resolver);
    return TC;
  };
}

module.exports = {
  addRelation,
  addResolver,
  setResolver,
  renameResolverArg,
  wrapResolve,
  addFilterArg,
  compose,
  addFields,
};
