import '../css/app.css'

import { createInertiaApp } from '@inertiajs/vue3'
import { configureEcho } from '@laravel/echo-vue'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createPinia } from 'pinia'
import type { DefineComponent } from 'vue'
import { createApp, h } from 'vue'

configureEcho({
    broadcaster: 'reverb',
})

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
    title: title => (title ? `${title} - ${appName}` : appName),
    resolve: name => resolvePageComponent(`./pages/${name}.vue`, import.meta.glob<DefineComponent>('./pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const pinia = createPinia()
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(pinia)
            .mount(el)
    },
    progress: {
        color: '#4B5563',
    },
})
