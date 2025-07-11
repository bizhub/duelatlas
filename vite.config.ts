import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import laravel from 'laravel-vite-plugin'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.ts'],
            ssr: 'resources/js/ssr.ts',
            refresh: true,
        }),
        tailwindcss(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        Components({
            dirs: ['resources/js/components', 'resources/js/layouts'],
            dts: 'resources/js/types/components.d.ts',
            resolvers: [],
        }),
        AutoImport({
            dts: 'resources/js/types/auto-imports.d.ts',
            imports: [
                'vue',
                // 'vitest',
                // '@vueuse/core',
                'pinia',
                {
                    '@inertiajs/vue3': ['router', 'usePage', 'useForm'],
                },
            ],
            defaultExportByFilename: true,
            dirs: ['resources/js/composables'],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
        },
    },
})
