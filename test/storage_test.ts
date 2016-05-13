import test from 'ava';
import {NullStorage, CookieStorage, getAvailableStorage} from '../src/storage';
import * as detector from '../src/detector';

let cookie_key: string;
let cookie_data: string;

test.beforeEach(t => {
  cookie_key = 'key',
  cookie_data = 'data';
});

test('CookieStorage setItem writes data to a cookie', t => {
  let storage = new CookieStorage();
  storage.setItem(cookie_key, cookie_data);
  t.deepEqual(storage.getItem(cookie_key), cookie_data);
});

test('CookieStorage removeItem removes the cookie', t => {
  let storage = new CookieStorage();
  storage.setItem(cookie_key, cookie_data);
  storage.removeItem(cookie_key);
  t.deepEqual(storage.getItem(cookie_key), null);
});

test('getAvailableStorage returns a CookieStorage when navigator supports cookies', t => {
  detector.hasCookieStorage = () => { return true; };
  t.true(getAvailableStorage() instanceof CookieStorage);
});

test('getAvailableStorage returns a NullStorage when all other storage fails', t => {
  detector.hasCookieStorage = () => { return false; };
  detector.hasLocalStorage = () => { return false; };
  detector.hasSessionStorage = () => { return false; };
  t.true(getAvailableStorage() instanceof NullStorage);
});
