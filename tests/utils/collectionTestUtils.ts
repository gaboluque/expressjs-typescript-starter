import { testApp } from '../utils';
import { SIZE_M, SIZE_L } from '../../src/utils/productUtils/sizeUtils';

const validCollectionCreateDTO = {
  name: `testCollection`,
  description: 'Lorem ipsum dolor sum amit est',
  price: 35000,
  category: 'men',
  options: {
    material: 'Algodón',
  },
  products: [
    {
      name: 'testProduct',
      description: 'testProductDescription',
      price: 35000,
      options: {
        size: [SIZE_L, SIZE_M],
      },
      images: ['https://bluu-temp.s3.amazonaws.com/testImage.jpeg'],
    },
    {
      name: 'testProduct2',
      description: 'testProductDescription2',
      price: 35000,
      options: {
        size: [SIZE_L, SIZE_M],
      },
      images: ['https://bluu-temp.s3.amazonaws.com/testImage.jpeg'],
    },
  ],
};

const invalidCollectionCreateDTO = {
  name: 't',
  description: 'L',
  price: '1',
  options: {
    material: 1,
  },
  products: [
    {
      name: 't',
      description: 't',
      options: {
        size: ['x'],
      },
    },
  ],
};

const createCollection = (token: string) => {
  return testApp
    .post('/collections')
    .set('Authorization', `Bearer ${token}`)
    .send(validCollectionCreateDTO);
};

export { validCollectionCreateDTO, invalidCollectionCreateDTO, createCollection };
