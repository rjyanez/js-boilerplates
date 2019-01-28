import { scheduleUpdate } from "./reconciler";

/**
 * Clase Padre de los Componentes 
 * @method Component
 */
export class Component {

  /**
 * Constructor de la clase
 * @method constructor
 * @param {propiedades de los componentes} props
 */
  constructor(props) {
    this.props = props || {};
    this.state = this.state || {};
  }

  /**
 * setear el estado del componente 
 * @method setState
 * @param {estado a ser setteado} partialState
 */
  setState(partialState) {
    scheduleUpdate(this, partialState)
  }
}

export function createInstance(fiber) {
  const instance = new fiber.type(fiber.props);
  instance.__fiber = fiber;
  return instance;
}