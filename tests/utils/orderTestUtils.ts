import { PAYMENT_METHOD_CASH } from '../../src/utils/orderUtils/paymentUtils';
import { validProviderDTO, validSellerDTO } from './userTestUtils';
import { SIZE_2XL } from '../../src/utils/productUtils/sizeUtils';
import { ICollectionDoc } from '../../src/modules/collections/collections.types';
import { userCreator } from '../../src/modules/auth/services/userCreator';
import { sessionCreator } from '../../src/modules/auth/services/sessionCreator';
import { createCollection } from './collectionTestUtils';
import { ShippingModel } from '../../src/modules/shipping/shipping.model';
import { tokenConfirmator } from '../../src/modules/auth/services/tokenConfirmator';
import { IUser } from '../../src/modules/users/users.types';
import { UsersRepo } from '../../src/modules/users/users.repo';

const validOrderDTO = (collection: ICollectionDoc) => ({
  products: collection.products.map((_id) => ({
    _id,
    quantity: 1,
    image:
      'https://bluu-prod-bucket.s3.us-east-1.amazonaws.com/603ff102eb1e2c1994eaf43f/60412dca912e5a592a820b5e/60412dca912e5a592a820b60',
    options: { size: [SIZE_2XL] },
  })),
  client: {
    name: 'Gabriel',
    lastName: 'Luque',
    phone: '3174046079',
    city: 'Bogota',
    state: 'Cundinamarca',
    address: 'Calle 142 # 13-36',
    neighborhood: 'Cedritos',
    extra: 'Extra',
  },
  sellerProfit: 10000,
  paymentMethod: PAYMENT_METHOD_CASH,
  total: 100000,
});

const confirmUser = (user: IUser) =>
  UsersRepo.confirmUserToken(user.userContext.confirmationToken);

const setupCreateOrder = async () => {
  const user = await userCreator(validSellerDTO);
  const provider = await userCreator(validProviderDTO);

  await confirmUser(user);
  await confirmUser(provider);

  const auth = await sessionCreator(validSellerDTO);
  const providerAuth = await sessionCreator(validProviderDTO);
  const { token } = auth;
  await createCollection(providerAuth.token);
  await ShippingModel.create({
    origin: 'Bogota',
    frequency: 'LUN, MAR, MIE, JUE, VIE, SAB',
    destinationId: 10,
    destinationRegion: 'Bogota',
    destinationCity: 'Bogota',
    destinationState: 'Cundinamarca',
    destinationFrequency: 'LUN, MAR, MIE, JUE, VIE, SAB',
    deliveryTime: 1,
    journeyKind: 'URBANO',
    shippingCost: 9800,
    shippingPrice: 8000,
  });

  return { token };
};

export { setupCreateOrder, validOrderDTO };
