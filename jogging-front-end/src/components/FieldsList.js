import {Field} from 'redux-form'
import FormGroup from './FormGroup'
import React from 'react';
import PropTypes from 'prop-types'

class FieldsList extends React.Component {
  constructor(props) {
    super(props)
  }

  renderRadioFields = (name, values) => {
    return values.map((value,index) => {
      return (
        <label key={index}><Field name={name} component="input" type="radio" value={value}/> {value}</label>
      )
    })
  }

  renderFields = () => {
    return this.props.fields.map( (field,index) =>  {
      let {name,label,component,type} = field
      if(field.type == "radio") {
        return (
          <div key={index} className="form-group row">
            <label className="col-sm-3 col-form-label">{field.label}</label>
            <div className="col-sm-9 radio-btns-group">
              {this.renderRadioFields(field.name, field.values)}
            </div>
          </div>
        )
      }else{
        return (
          <FormGroup key={index} name={name} label={label}>
            <Field autoFocus={this.props.focusOn==name} className="form-control" id={name} name={name} component={component} type={type} ref={name} withRef />
          </FormGroup>
      )}
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
