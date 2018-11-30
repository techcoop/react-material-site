import ui, { drawerUpdate } from './ui'

it('should handle UI_CHANGE', () => {
  const newState = {
    drawerOpen: true,
    drawerMaximized: true
  }

  const result = ui({drawerOpen: false, drawerMaximized: false}, drawerUpdate(newState))
  expect(result).toEqual(newState)
})
