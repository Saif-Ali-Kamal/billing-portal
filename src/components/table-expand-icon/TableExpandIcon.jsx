import React from "react";
import { CaretDownFilled, CaretRightFilled } from '@ant-design/icons';

function TableExpandIcon({ expanded, onExpand, record }) {
  return (
    expanded ? (
      <CaretDownFilled onClick={e => onExpand(record, e)} />
    ) : (
        <CaretRightFilled onClick={e => onExpand(record, e)} />
      )
  )
}


export default TableExpandIcon