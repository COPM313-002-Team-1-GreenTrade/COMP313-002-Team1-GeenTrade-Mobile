import * as actions from './actionCreators'
import * as types from './actionTypes'

describe('actions', () => {
  it('should update first name for updateFirstName(payload)', () => {
    const payload = "Justin"
    const expectedAction = {
      type: types.UPDATE_FIRST_NAME,
      payload
    }
    expect(actions.updateFirstName(payload)).toEqual(expectedAction)
  })
})