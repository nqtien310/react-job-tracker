import React from 'react'

export default function FormGroup(props){
  return (
    <div className="form-group row">
      <div className="offset-sm-3 col-sm-9">
        {props.children}
      </div>
    </div>
  )
}
