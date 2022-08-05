import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../reducers/userReducer'


const Logout = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const onClickLogout = () => {
    dispatch(userLogout())
  }

  return (
    <>
      <p>{user[0].name} is logged in <button onClick={onClickLogout}>logout</button></p>
    </>
  )
}

export default Logout