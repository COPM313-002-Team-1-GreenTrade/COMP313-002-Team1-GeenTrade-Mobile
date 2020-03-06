import * as actions from './actionCreators'
import * as types from './actionTypes'

describe('actions', () => {
  it('should update first name for updateFirstName(payload)', () => {
    const payload = 2464389275
    const expectedAction = {
      type: types.UPDATE_PHONE,
      payload
    }
    expect(actions.updatePhone(payload)).toEqual(expectedAction)
  })
})