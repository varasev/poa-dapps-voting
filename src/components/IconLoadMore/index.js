import React from 'react'

export const IconLoadMore = ({ networkBranch }) => {
  return (
    <svg className="sw-IconLoadMore" xmlns="http://www.w3.org/2000/svg" width="15" height="18">
      <path
        className={`sw-IconLoadMore_Path sw-IconLoadMore_Path-${networkBranch}`}
        d="M14 18H1a1 1 0 0 1-1-1v-6a1 1 0 0 1 2 0v4.969h11V5H3.491l1.215 1.215a1.033 1.033 0 0 1-1.46 1.46L.325 4.754a1.013 1.013 0 0 1-.228-.35C.091 4.392.08 4.383.075 4.371a1.036 1.036 0 0 1 .221-1.136L3.235.296a1.038 1.038 0 1 1 1.469 1.469L3.469 3H14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1z"
        fillRule="evenodd"
      />
    </svg>
  )
}
