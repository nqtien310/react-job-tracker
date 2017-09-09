import React from 'react'
import moment from 'moment'

export default function Entry(props){
  let entry = props.entry
  let date = moment(entry.formatted_date)
  let formattedDate = date.format("dddd, MMMM Do YYYY")

  return (
    <tr>
      <td className="date">
        {formattedDate}
      </td>
      <td>
        {entry.formatted_distance}
      </td>
      <td>
        {entry.readable_time}
      </td>
      <td>
        {entry.formatted_speed}
      </td>
      <td className="actions">
        <a onClick={()=> props.onDelete(entry.id)} className="btn btn-danger">
          <i className="fa fa-trash"></i>
        </a>
        <a onClick={()=> props.onEdit(entry.id)} className="btn btn-warning">
          <i className="fa fa-edit"></i>
        </a>
      </td>
    </tr>
  )
}
