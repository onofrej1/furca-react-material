import React from 'react'
import styled from 'react-emotion'

export default styled(({ className, ...rest }) => {
  return <span className={`material-icons ${className}`} {...rest} />
})`
  font-size: 18px;
  vertical-align: text-bottom;
  width: 1.5em;
`
