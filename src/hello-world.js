import main from './main'

/**
 * Funcion de Ejemplo N. 1 "Hello Word Simple"
 * @method helloWord
 */
export function helloWord() {

  const root = document.getElementById("root")

  class App extends main.Component {

    render() {
      // create elemnt div with the text hello [NAME] !
      return main.createElement("div", null, "Hello ", this.props.name, "!")
    }

  }
   
  const element = main.createElement(App, {name: "World"})
  
  // render the component in dom
  main.render(element, root)

}
