import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import rmwcTestPolyfill from '@rmwc/base/testPolyfill';
import 'jest-enzyme';
import './utils/polyfill';
configure({
  adapter: new Adapter()
});
const mockStorage = {
  setItem: jest.fn(),
  removeItem: jest.fn(),
  key: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  length: 0
};
window.localStorage = mockStorage;
window.sessionStorage = mockStorage;
window.console.error = jest.fn();
window.console.warn = jest.fn();
rmwcTestPolyfill();