import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export default class Textfield extends React.Component {
  state = {
    name: this.props.name,
    value: this.props.value,
    style: {
        marginBottom: 10,
        marginTop: 5,
    },
    attr: this.props.attr
  };

  componentWillReceiveProps(nextProps){
    this.setState({value: nextProps.value});
  }

  handleChange = event => {
    this.setState({value: event.target.value}, () =>{
      this.props.collector(this.state.attr, this.state.value);
    });
  };

  render() {
    return (
      <div>
        <FormControl fullWidth style = {this.state.style}>
          <InputLabel htmlFor={this.props.id}>{this.state.name}</InputLabel>
          <Input id={this.props.id} value={this.state.value} onChange={this.handleChange} />
        </FormControl>
      </div>
    );
  }
}