import {ObjectDirective} from "vue";
import {animate as motionAnimate} from 'motion';

interface CreateDirectiveOptions {
    animate?: typeof motionAnimate,
}

export const createDirective = (options: CreateDirectiveOptions = {}): ObjectDirective => {
    const {animate = motionAnimate} = options;

    return {
        mounted: (el) => {
            animate(el);
        }
    }
}

export default createDirective()

