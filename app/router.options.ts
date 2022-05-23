import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig>{
    scrollBehavior(_to, _from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
};
