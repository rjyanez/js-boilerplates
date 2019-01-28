export const TEXT_ELEMENT = "TEXT ELEMENT";

/**
 * Crear elemntos virtuales
 * @method createElement
 * @param {tipo de elemento} type
 * @param {configuracion del elemento, propiedades} config
 * @param {hijos asociados al elemento} args 
 */
export function createElement(type, config, ...args) {
  
  const props = Object.assign({}, config); 
  const hasChildren = args.length > 0;
  const rawChildren = hasChildren ? [].concat(...args) : [];

  // filter and map the childrens creating the TextElements
  props.children = rawChildren
    .filter(c => c != null && c !== false)
    .map(c => c instanceof Object ? c : createTextElement(c));

  
  return { type, props };
}

/**
 * Crear Elemntos Virtuales de Texto
 * @method createTextElement
 * @param {contenido del elemento} value
 */
function createTextElement(value) {
  return createElement(TEXT_ELEMENT, { nodeValue: value });
}