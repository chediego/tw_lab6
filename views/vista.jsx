var React = require('react');
class Indexpage extends React.Component {
  constructor(){
    super();
  }
  render() {
    let header={
      width : '100%',
      height: '100%',
      maring: 'auto'
    }
    return (
      <div style={header}>
        <h1>Usuarios</h1>
        <br></br>
        <p>{this.props.usuarios}</p>
      </div>);
  }
}

module.exports = Indexpage;
