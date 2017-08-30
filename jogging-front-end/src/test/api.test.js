import React from 'react';
import ReactDOM from 'react-dom';
import Api from '../api'
import Axios from 'axios'
import Auth from '../auth'

it('should have an adapter and its adapter should be functioned', () => {
  expect(Api.adapter).not.toBe(null)
  expect(Api.adapter.get).not.toBe(null)
  expect(Api.adapter.post).not.toBe(null)
  expect(Api.adapter.put).not.toBe(null)
  expect(Api.adapter.delete).not.toBe(null)
});
