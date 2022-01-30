import {ObjectDirective} from "vue";
import {sortBy} from 'lodash-es';

interface CreateDirectiveOptions {
    animate?: (el: Animatable, ...args: Parameters<Animatable['animate']>) => ReturnType<Animatable['animate']>
}

const defaultAnimate: CreateDirectiveOptions["animate"] = (el, ...args) => el.animate(...args);

export const createDirective = (options: CreateDirectiveOptions = {}): ObjectDirective<Element> => {
    const {animate = defaultAnimate} = options;

    return {
        mounted: async (el, binding) => {
            const options = {
                els: new Array<Element>(),
                stagger: 0,
                duration: 500,
            }
            if (binding.modifiers.leaves) {
                options.els.push(...Array.from(el.querySelectorAll('img, h1, h2, h3, h4, h5, h6, p, button, a')));
            } else {
                options.els.push(el);
            }

            if (binding.modifiers.stagger) {
                options.stagger = 200;
            }

            if (binding.modifiers.order) {
                options.els = sortBy(options.els, el => {
                    const rect = el.getBoundingClientRect();
                    return rect.x + rect.y;
                })
            }

            const {els, stagger, duration} = options;
            els.forEach(async (el, index) => {
                const delay = stagger * index;
                const animation = animate(
                    el,
                    {opacity: 0, offset: 0},
                    {duration, delay, fill: 'backwards'}
                );
                animation.pause();
                const images = getImagesOfElement(el);
                if (images.length) {
                    await loadImageElements(images);
                }
                animation.play();
            });
        }
    }
}

function getImagesOfElement(el: Element): HTMLImageElement[] {
    const images: HTMLImageElement[] = [];
    if (isImageElement(el)) {
        images.push(el);
    }
    const childImages = el.getElementsByTagName('img');
    images.push(...Array.from(childImages));
    return images;
}

function isImageElement(el: Element): el is HTMLImageElement {
    return el.tagName === 'IMG';
}

function loadImageElement(el: HTMLImageElement): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        if (el.complete || !el.src) {
            return resolve(el);
        }
        const onload = () => {
            el.removeEventListener('load', onload);
            el.removeEventListener('error', onerror);
            resolve(el);
        };
        const onerror = (error: ErrorEvent) => {
            el.removeEventListener('load', onload);
            el.removeEventListener('error', onerror);
            reject(error);
        }
        el.addEventListener('load', onload);
        el.addEventListener('error', onerror);
    })
}

async function loadImageElements(els: HTMLImageElement[]): Promise<HTMLImageElement[]> {
    await Promise.allSettled(els.map(el => loadImageElement(el)));
    return els;
}

export default createDirective()

