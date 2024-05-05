import categories from './categories.json';
import couponList from './couponList.json';
import product from './product.json';
import products from './products.json';
import profile from './profile.json';
import users from './users.json';

import { apiRoutes } from '@/apiRoutes';

export default {
  [apiRoutes.users]: users,
  [apiRoutes.profile]: profile,
  [apiRoutes.products]: products,
  [apiRoutes.product]: product,
  [apiRoutes.categories]: categories,
  [apiRoutes.couponList]: couponList,
};
