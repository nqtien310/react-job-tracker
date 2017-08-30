import React from 'react'
import FormGroupAlignedRight from './FormGroupAlignedRight'

export default function Submit(props) {
  return (
    <FormGroupAlignedRight>
      <button type="Submit" className="btn btn-primary"> {props.label} </button>
    </FormGroupAlignedRight>
  )
}
