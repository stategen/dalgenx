export default (api) => {
  // const {config} = api.service;

  api.register('modifyHTMLScript', ({memo}) => {
    let htmlScript = memo;
    let scripts = htmlScript.split(';');
    let dynamicRootScript= `
      if (window.routerBase !== '') {
      var _idxOf_rb = location.pathname.indexOf(window.routerBase);
      if (_idxOf_rb > -1) {
        window.routerBase = location.pathname.substr(0, _idxOf_rb) + window.routerBase;
        if (window.routerBase.slice(-1) !== '/'){
          window.routerBase +='/'
        }
      }
    }`;

    scripts.splice(1,0,dynamicRootScript);
    let result = scripts.join(';')
    return result;
  });


}
