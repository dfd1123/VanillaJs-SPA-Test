import { RouteType } from '@/core/types';
import Home from '@pages/Home';

export default [
    { path: '/', redirect: '/homework' },
    { path: '/homework', view: Home }
] as RouteType[];