import React from 'react'

export default function FormGroup(props){
  return (
    <div className="form-group row">
      <label htmlFor={props.name} className="col-sm-3 col-form-label">{props.label}</label>
      <div className="col-sm-9">
        {props.children}
      </div>
    </div>
  )
}
