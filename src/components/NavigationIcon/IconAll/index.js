import React from 'react'

export const IconAll = ({ networkBranch }) => {
  return (
    <svg className={`nl-IconAll`} xmlns="http://www.w3.org/2000/svg" width="18" height="17">
      <path
        className={`nl-IconAll_Path nl-IconAll_Path-${networkBranch}`}
        d="M16 10.95V11H2v-.05a2.502 2.502 0 0 1 0-4.9V6h14v.05a2.502 2.502 0 0 1 0 4.9zM16 8H2v1h14V8zm0-3.05V5H2v-.05a2.502 2.502 0 0 1 0-4.9V0h14v.05a2.502 2.502 0 0 1 0 4.9zM16 2H2v1h14V2zM2 12.05V12h14v.05a2.502 2.502 0 0 1 0 4.9V17H2v-.05a2.502 2.502 0 0 1 0-4.9zM2 15h14v-1H2v1z"
        fillRule="evenodd"
      />
    </svg>
  )
}
