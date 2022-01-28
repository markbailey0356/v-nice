import {ObjectDirective} from "vue";

interface CreateDirectiveOptions {
    animate?: (el: Animatable, ...args: Parameters<Animatable['animate']>) => ReturnType<Animatable['animate']>
}

const defaultAnimate: CreateDirectiveOptions["animate"] = (el, ...args) => el.animate(...args);

export const createDirective = (options: CreateDirectiveOptions = {}): ObjectDirective<Element> => {
    const {animate = defaultAnimate} = options;

    return {
        mounted: async (el) => {
            const animation = animate(el, {opacity: 0, offset: 0}, {duration: 500});
            animation.pause();
            const images = getImagesOfElement(el);
            if (images.length) {
                await loadImageElements(images);
            }
            animation.play();
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

