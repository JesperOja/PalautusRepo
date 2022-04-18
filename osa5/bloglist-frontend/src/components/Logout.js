import React from 'react'

const Logout = ({ setUser, name }) => {
  const onClickLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }
  return (
    <>
      <p>{name} is logged in <button onClick={onClickLogout}>logout</button></p>
    </>
  )
}

export default Logout