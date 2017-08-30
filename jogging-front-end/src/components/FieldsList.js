import {Field} from 'redux-form'
import FormGroup from './FormGroup'
import React from 'react';
import PropTypes from 'prop-types'

class FieldsList extends React.Component {
  constructor(props) {
    super(props)
  }

  renderFields = () => {
    return this.props.fields.map( (field,index) =>  {
      let {name,label,component,type} = field
      return (
        <FormGroup key={index} name={name} label={label}>
          <Field autoFocus={this.props.focusOn==name} className="form-control" id={name} name={name} component={component} type={type} ref={name} withRef />
        </FormGroup>
      )
    })
  }

  render(){
    return( <div> {this.renderFields()} </div>)
  }
}

FieldsList.propTypes = {
  fields: PropTypes.array.isRequired,
  focusOn: PropTypes.string
}

export default FieldsList
