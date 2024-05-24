import { lazy } from 'react';
const Notifications = lazy(() => import('../pages/Notifications'));
const Profile = lazy(() => import('../pages/Profile'));
const ProfileSettings = lazy(() => import('../pages/ProfileSettings'));
const Admins = lazy(() => import('../pages/Admins'));
const Users = lazy(() => import('../pages/Users'));
const User = lazy(() => import('../pages/User'));
const Products = lazy(() => import('../pages/Products'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));
const AddProduct = lazy(() => import('../pages/AddProduct'));
const EditProduct = lazy(() => import('../pages/EditProduct'));
const Listings = lazy(() => import('../pages/Orders'));
const Listing = lazy(() => import('../pages/Order'));

const coreRoutes = [
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/profile/settings',
    title: 'Profile Settings',
    component: ProfileSettings,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: ProfileSettings,
  },
  {
    path: '/admins',
    title: 'Admins',
    component: Admins,
  },
  {
    path: '/admins/:id',
    title: 'Users',
    component: User,
  },
  {
    path: '/users',
    title: 'Users',
    component: Users,
  },
  {
    path: '/users/:id',
    title: 'Users',
    component: User,
  },
  {
    path: '/products',
    title: 'products',
    component: Products,
  },
  {
    path: '/products/add-product',
    title: 'products',
    component: AddProduct,
  },
  {
    path: '/products/:id',
    title: 'products',
    component: ProductDetails,
  },
  {
    path: '/products/:id/edit-product',
    title: 'products',
    component: EditProduct,
  },
  {
    path: '/orders',
    title: 'orders',
    component: Listings,
  },
  {
    path: '/orders/:id',
    title: 'orders',
    component: Listing,
  },
  {
    path: '/notifications',
    title: 'Notifications',
    component: Notifications,
  },
];

const routes = [...coreRoutes];
export default routes;
5;
