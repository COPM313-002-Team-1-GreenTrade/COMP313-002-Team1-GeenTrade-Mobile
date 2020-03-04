import * as actions from './actionCreator'

describe('actions', () => {
  it('should create an action for currentUser(payload)', () => {
    const payload = "Green Trade Team"
    const expectedAction = {
      type: "SELECTED",
      payload
    }
    expect(actions.currentUser(payload)).toEqual(expectedAction)
  })
})