import * as actions from './actionCreators'
import * as types from './actionTypes'

describe('actions', () => {
  it('should create an action for sortRewards(index)', () => {
    const payload = 7777
    const expectedAction = {
      type: types.SORT_REWARDS,
      payload
    }
    expect(actions.sortRewards(payload)).toEqual(expectedAction)
  })
})