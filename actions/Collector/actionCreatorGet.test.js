import * as actions from './actionCreator'

describe('actions', () => {
  it('should retrieve points for currentUser(payload)', () => {
      //0 Initial Points
    const payload = "0"
    const expectedAction = {
      type: "GET_INITIAL_POINTS",
      payload
    }
    expect(actions.getPoint(payload)).toEqual(expectedAction)
  })
})