// @ts-check
import axios from 'axios';
import adapter from 'axios/lib/adapters/http';
import { promises as fs } from 'fs';
import path from 'path';
import { screen } from '@testing-library/dom/dist/screen.js';
import { fireEvent } from '@testing-library/dom/dist/events.js';
import nock from 'nock';
import '@testing-library/jest-dom';

import init from '../src/init';

nock.disableNetConnect();

axios.defaults.adapter = adapter;

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const readFixture = (filename) => fs.readFile(getFixturePath(filename), 'utf-8');

beforeEach(async () => {
  const html = await readFixture('index.html');
  document.body.innerHTML = html;
  init();
});

test('init', () => {
  expect(document.body.innerHTML).toMatchSnapshot();
});

test('add rss feed', async () => {
  const requestURL = 'https://google.com';
  const fakeRSS = await readFixture('rss.xml');

  nock('https://hexlet-allorigins.herokuapp.com')
    .get(`/get?url=${encodeURIComponent(requestURL)}&disableCache=true`)
    .reply(200, { contents: fakeRSS });

  fireEvent.input(screen.getByPlaceholderText('ссылка RSS'), { target: { value: requestURL } });
  fireEvent.click(screen.getByRole('button', { name: 'add' }));

  const uploaded = await screen.findByText('RSS успешно загружен');
  expect(uploaded).toBeInTheDocument();

  expect(document.body.innerHTML).toMatchSnapshot();

  fireEvent.input(screen.getByPlaceholderText('ссылка RSS'), { target: { value: requestURL } });
  fireEvent.click(screen.getByRole('button', { name: 'add' }));
  const exists = await screen.findByText('RSS уже существует');
  expect(exists).toBeInTheDocument();
});
