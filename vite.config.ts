import {defineConfig} from "vite";
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    root: 'playground',
    resolve: {
        alias: {
            'src': './src',
        }
    },
    server: {
        open: '/',
    }
})
