import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Blogs', () => {
  let container
  const viewInfo = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'Test blog here',
      author: 'Jepsu',
      url: 'Localhost'
    }

    container = render(

      <Blog blog={blog} toggle={viewInfo}/>

    ).container
  })

  test('display normal info', () => {
    const div = container.querySelector('.smallInfo')
    expect(div).toBeVisible()
  })

  test('show fullinfo', async () => {

    const button = screen.getByText('view')

    userEvent.click(button)
    screen.debug(button)

    expect(viewInfo.mock.calls).toHaveLength(1)
    const div = container.querySelector('.fullInfo')
    expect(div).toBeVisible()
  })

  test('like button clicked twice', async () => {
    const button = screen.getByText('view')

    userEvent.click(button)

    const likeButton = screen.getByText('like')
    userEvent.click(likeButton)
    userEvent.click(likeButton)

    expect(viewInfo.mock.calls).toHaveLength(2)
  })
})