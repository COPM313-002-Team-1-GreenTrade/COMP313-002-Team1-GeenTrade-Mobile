import * as actions from './actionCreators'
import * as types from './actionTypes'

describe('actions', () => {
  it('should create an action for getPoints(points)', () => {
    // points 9999
    const payload = 9999
    const expectedAction = {
      type: types.GET_POINTS,
      payload
    }
    expect(actions.getPoints(payload)).toEqual(expectedAction)
  })
})