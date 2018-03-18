import React from 'react';
import fetch from '../api/mockFetch';

test('test the window mock fetch API', () => {
  fetch().then(data => {
    expect(data.images.length).toEqual(5);
  });
});

test('mock fetch resolved object should be defined', () => {
  expect(fetch()).resolves.not.toBeNull();
});

test('mock fetch resolved object should have property images', () => {
  expect(fetch()).resolves.toHaveProperty('images');
});

test('mock fetch resolved data should match object array', () => {
  expect(fetch()).resolves.toEqual(expect.objectContaining({images: expect.any(Array)}));
});
