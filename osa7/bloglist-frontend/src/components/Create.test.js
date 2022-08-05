import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Create from './Create'

test('Create new blog', async () => {
  const addBlog = jest.fn()

  render(<Create addBlog={addBlog}/>)

  const sendButton = screen.getByText('create')
  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')
  screen.debug(sendButton)
  userEvent.type(title, 'Testing form')
  userEvent.type(author, 'Jepsu')
  userEvent.type(url, 'Localhost')
  userEvent.click(sendButton)


  expect(addBlog).toHaveBeenCalled()
  expect(addBlog.mock.calls[0][0].content).toBe('Testing form')

})