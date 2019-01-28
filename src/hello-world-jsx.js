import main from './main'

export function helloWordJsx(){
  
  const root = document.getElementById("root");
  class App extends main.Component {
    render() {
      return <div>Hello {this.props.name}!</div>;
    }
  }
  main.render(<App name="World" />, root);
}
