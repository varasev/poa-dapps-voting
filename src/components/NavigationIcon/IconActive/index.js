import React from 'react'

export const IconActive = ({ networkBranch }) => {
  return (
    <svg className={`nl-IconActive`} xmlns="http://www.w3.org/2000/svg" width="18" height="18">
      <path
        className={`nl-IconActive_Path nl-IconActive_Path-${networkBranch}`}
        d="M17 18a1 1 0 0 1-1-1v-1H2v1a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1zm0-5H1a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1zm-1-6H2v4h14V7zM4 8h1a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm4 0h6a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zm9-4H1a1 1 0 0 1-1-1V1a1 1 0 0 1 2 0v1h14V1a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1z"
        fillRule="evenodd"
      />
    </svg>
  )
}
