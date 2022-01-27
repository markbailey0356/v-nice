import test from 'ava';
import {mount} from '@vue/test-utils';
import directive from '../src/directive';
import sinon from 'sinon';

test('calls the mounted hook', async t => {
    const spy = sinon.spy(directive, 'mounted');
    const TestComponent = {
        template: `
          <div v-nice></div>`,
        directives: {nice: spy},
    };
    mount(TestComponent);
    t.true(spy.calledOnce);
})
