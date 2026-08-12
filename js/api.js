// Conexión compartida con el Web App único de Apps Script
// (stock + Panel + Pedidos, todo detrás del mismo doGet)
var URL_API = 'https://script.google.com/macros/s/AKfycbzq4bBO__zxoclUCrp46-nGrxj_tjD8IGeqmXHaQQEVTP1gM28nM1vLeB763VG1wkWb/exec';

function jsonp(params, cb) {
  var cbName = 'jscb_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
  var s = document.createElement('script');
  window[cbName] = function (d) { delete window[cbName]; document.body.removeChild(s); cb(null, d); };
  s.onerror = function () { delete window[cbName]; document.body.removeChild(s); cb(new Error('No se pudo conectar con el servidor.'), null); };
  var qs = '?callback=' + cbName;
  Object.keys(params).forEach(k => qs += `&${k}=${encodeURIComponent(params[k])}`);
  s.src = URL_API + qs;
  document.body.appendChild(s);
}
