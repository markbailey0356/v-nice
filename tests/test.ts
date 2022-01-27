import test from 'ava';
import {mount} from '@vue/test-utils';
import { createDirective } from '../src/directive';
import sinon from 'sinon';

test('calls the mounted hook', async t => {
    const directive = sinon.spy(createDirective(), 'mounted');
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
