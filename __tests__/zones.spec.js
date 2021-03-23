import { get } from 'http';
import { getAllZones, postZone, createZoneFormData } from '../src/networking/zones';

test('get all zones', async () => {
  getAllZones('ba254e9f8bb8072c0fdcb9c58382317408668c7b').then((value) => {
    expect(value).toBe(200);
  });
});

test('post new zone', async () => {
  const formData = createZoneFormData(
    'test4',
    '23.33,32.3223',
    '23.33,32.3223',
    '23.33,32.3223',
    '23.33,32.3223',
    '23.33,32.3223',
    '23.33,32.3223',
    '23.33,32.3223',
    '23.33,32.3223',
  );

  postZone('ba254e9f8bb8072c0fdcb9c58382317408668c7b', formData).then((value) => {
    expect(value).toBe(200);
  });
});

test('update a zone', () => {
  postZones('ba254e9f8bb8072c0fdcb9c58382317408668c7b', data).then((value) => {
    expect(value).toBe(201);
  });
});

test('delete a zone', () => {
  expect('').toBe('');
});
