
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

/**
 * @param {resolverName} string - resolver name
 * @param {middleware} middleware - a callback which type ({rp: resolveParameter, resolve, reject}, next) => void
 * @return {Function} a enhance typeComposer
 */
function addResolverMiddleware(resolverName, middleware) {
  return (typeComposer) => {
    const resolver = typeComposer.getResolver(resolverName).wrapResolve(oldResolve => async rp => {
      return new Promise((resolve, reject) => {
        const next = async () => {
          const result = await oldResolve(rp);
          resolve(result);
          return result;
        };
        middleware({
          rp,
          resolve,
          reject,
        }, next);
      });
    }).clone({
      name: resolverName,
    });
    typeComposer.removeResolver(resolverName);
    typeComposer.addResolver(resolver);
    return typeComposer;
  }
}

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
    return wrapResolve(resolverName, rp => Object.assign({}, rp, {
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
  addResolverMiddleware,
  addResolver,
  setResolver,
  renameResolverArg,
  wrapResolve,
  addFilterArg,
  compose,
  addFields,
};
