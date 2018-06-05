var React = require('react');
class Indexpage extends React.Component {
  constructor(){
    super();
  }
  render() {
    let contenido = 'Bienvenidos a la pagina, este es el index, presiona usuarios para ver usuarios registrados y ligas para ver las ligas de futbol';
    let header={
      width : '100%',
      height: '100%',
      maring: 'auto'
    }
    return (
      <div style={header}>
        <h1>{this.props.nombre}</h1>
      </div>);
  }
}

module.exports = Indexpage;
