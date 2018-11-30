if (!window.Reflect) {
  window.Reflect = {};

  window.Reflect.deleteProperty = (target, propertyKey) => {
    if (!target.hasOwnProperty(propertyKey)) {
      return false;
    }

    delete target[propertyKey];
    return true;
  };
}

if (!Object.entries) {
  Object.entries = obj => {
    var ownProps = Object.keys(obj),
        i = ownProps.length,
        resArray = new Array(i);

    while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };
}