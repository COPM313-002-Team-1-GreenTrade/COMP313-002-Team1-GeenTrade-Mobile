import * as actions from './actionCreators'
import * as types from './actionTypes'

describe('actions', () => {
  it('should update first name for updateFirstName(payload)', () => {
    const payload = "Justin1.1Johnson@hotmail.com"
    const expectedAction = {
      type: types.UPDATE_EMAIL,
      payload
    }
    expect(actions.updateEmail(payload)).toEqual(expectedAction)
  })
})