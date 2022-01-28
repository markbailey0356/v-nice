import test from 'ava';
import {mount} from '@vue/test-utils';
import { createDirective } from '../src/directive';
import sinon from 'sinon';

test('calls the mounted hook', async t => {
    const animate = sinon.spy();
    const directive = sinon.spy(createDirective({animate}), 'mounted');
    const TestComponent = {
        template: `
          <div v-nice></div>`,
        directives: {nice: directive},
    };
    mount(TestComponent);
    t.true(directive.calledOnce);
})

test('calls animate on directed element', async t => {
    const animate = sinon.spy();
    const directive = createDirective({animate});
    const TestComponent = {
        template: `
          <div v-nice></div>`,
        directives: {nice: directive},
    };
    const wrapper = mount(TestComponent);
    const el = wrapper.element;
    t.true(animate.calledWith(el));
})

test('waits for images to load before animating', async t => {
    const animate = sinon.spy();
    const directive = createDirective({animate});
    const onload = sinon.spy();
    const TestComponent = {
        template: `
          <img @load="onload" v-nice>`,
        directives: {nice: directive},
        methods: { onload }
    };
    const wrapper = mount(TestComponent);
    const el = wrapper.element;
    await wrapper.trigger('load');
    t.true(onload.called);
    t.true(animate.calledWith(el));
    t.true(animate.calledAfter(onload));
})
