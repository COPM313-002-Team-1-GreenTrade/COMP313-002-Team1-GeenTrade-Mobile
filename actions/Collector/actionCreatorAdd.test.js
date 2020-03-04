import * as actions from './actionCreator'

describe('actions', () => {
  it('should add points to currentUser(payload)', () => {
      //100 Points Added
    const payload = "100"
    const expectedAction = {
      type: "INSERT_POINTS",
      payload
    }
    expect(actions.addPoints(payload)).toEqual(expectedAction)
  })
})