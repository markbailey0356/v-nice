import {ObjectDirective} from "vue";

interface CreateDirectiveOptions {
    animate?: (el: Animatable, ...args: Parameters<Animatable['animate']>) => ReturnType<Animatable['animate']>
}

const defaultAnimate: CreateDirectiveOptions["animate"] = (el, ...args) => el.animate(...args);

export const createDirective = (options: CreateDirectiveOptions = {}): ObjectDirective<Element> => {
    const {animate = defaultAnimate} = options;

    return {
        mounted: (el) => {
            animate(el, {opacity: 0, offset: 0}, {duration: 500});
        }
    }
}

export default createDirective()

