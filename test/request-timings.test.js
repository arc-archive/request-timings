import { fixture, assert, nextFrame } from '@open-wc/testing';
import '../request-timings.js';

describe('<request-timings>', () => {
  async function basicFixture() {
    return await fixture(`<request-timings></request-timings>`);
  }

  describe('_round()', () => {
    let element;
    before(async () => {
      element = await basicFixture();
    });

    it('returns "unknown" when not a number', () => {
      const result = element._round(undefined);
      assert.equal(result, 'unknown');
    });

    it('returns the same integer', () => {
      const result = element._round(10);
      assert.equal(result, 10);
    });

    it('rounds the number', () => {
      const result = element._round(7.751456734);
      assert.equal(result, 7.7515);
    });

    it('rounds number as string', () => {
      const result = element._round('7.751456734');
      assert.equal(result, 7.7515);
    });
  });

  describe('_computeSum()', () => {
    let element;
    before(async () => {
      element = await basicFixture();
    });

    it('sums two numbers', () => {
      const result = element._computeSum(1, 2);
      assert.equal(result, 3);
    });

    it('sums two numbers as string', () => {
      const result = element._computeSum('1', '2');
      assert.equal(result, 3);
    });

    it('sums when first is missing', () => {
      const result = element._computeSum(undefined, 2);
      assert.equal(result, 2);
    });

    it('sums when second is missing', () => {
      const result = element._computeSum(2, undefined);
      assert.equal(result, 2);
    });

    it('ignores negative first argument', () => {
      const result = element._computeSum(-1, 2);
      assert.equal(result, 2);
    });

    it('ignores negative second argument', () => {
      const result = element._computeSum(1, -2);
      assert.equal(result, 1);
    });
  });

  describe('_hasValue()', () => {
    let element;
    before(async () => {
      element = await basicFixture();
    });

    it('returns false when no argument', () => {
      const result = element._hasValue();
      assert.isFalse(result);
    });

    it('returns false for empty string', () => {
      const result = element._hasValue('');
      assert.isFalse(result);
    });

    it('returns false for negative value', () => {
      const result = element._hasValue(-1);
      assert.isFalse(result);
    });

    it('returns false for 0', () => {
      const result = element._hasValue(0);
      assert.isFalse(result);
    });

    it('returns true for positive number', () => {
      const result = element._hasValue(1);
      assert.isTrue(result);
    });

    it('returns true for a string', () => {
      const result = element._hasValue('test');
      assert.isTrue(result);
    });
  });

  describe('_update()', () => {
    let element;
    let timings;
    beforeEach(async () => {
      element = await basicFixture();
      timings = {
        startTime: 1483368432132,
        blocked: 7.751456734,
        dns: 279.3812349,
        connect: 883.1201243,
        ssl: 633.0517329,
        send: 0.2900234,
        wait: 649.8810009,
        receive: 1.7121211
      };
    });

    it('computes _fullTime', () => {
      element.timings = timings;
      assert.equal(element._fullTime, 2455.187694234);
    });

    it('computes values when no timings', () => {
      element._update();
      assert.equal(element._fullTime, 0, 'fulltime is 0');
      assert.equal(element._connect, 0, 'connect is 0');
      assert.equal(element._receive, 0, 'receive is 0');
      assert.equal(element._send, 0, 'send is 0');
      assert.equal(element._wait, 0, 'wait is 0');
      assert.equal(element._dns, -1, 'dns is -1');
      assert.equal(element._blocked, -1, 'blocked is -1');
      assert.equal(element._ssl, -1, 'ssl is -1');
    });

    ['connect', 'blocked', 'dns', 'ssl', 'send', 'wait', 'receive'].forEach((prop) => {
      it(`sets _${prop}`, () => {
        element.timings = timings;
        assert.equal(element[`_${prop}`], timings[prop]);
      });

      it(`ignores negative _${prop}`, () => {
        const value = timings[prop];
        const total = 2455.187694234 - value;
        timings[prop] = -1;
        element.timings = timings;
        assert.equal(element._fullTime, total);
      });

      it(`ignores non number _${prop}`, () => {
        const value = timings[prop];
        const total = 2455.187694234 - value;
        timings[prop] = undefined;
        element.timings = timings;
        assert.equal(element._fullTime, total);
      });
    });
  });

  describe('render()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
      element.timings = {
        startTime: 1483368432132,
        blocked: 7.751456734,
        dns: 279.3812349,
        connect: 883.1201243,
        ssl: 633.0517329,
        send: 0.2900234,
        wait: 649.8810009,
        receive: 1.7121211
      };
      await nextFrame();
    });

    it('renders total time', () => {
      const node = element.shadowRoot.querySelector('.timing-value.total');
      const value = node.innerText.trim().toLowerCase();
      assert.equal(value, '2455.1877 ms');
    });

    [
      ['block-time', 'blocked', 7.7515, 7.7515],
      ['dns-time', 'dns', 287.1327, 279.3812],
      ['ttc-time', 'connect', 1170.2528, 883.1201],
      ['ssl-time', 'ssl', 1803.3045, 633.0517],
      ['send-time', 'send', 1803.5946, 0.29],
      ['ttfb-time', 'wait', 2453.4756, 649.881],
      ['receive-time', 'receive', 2455.187694234, 1.7121]
    ].forEach(([type, prop, value, roundValue]) => {
      it(`renders propgress bar for ${prop}`, () => {
        const node = element.shadowRoot.querySelector(`[data-type="${type}"]`);
        assert.ok(node);
      });

      it(`paper-progress has secondaty-progress for ${prop}`, () => {
        const node = element.shadowRoot.querySelector(`[data-type="${type}"] paper-progress`);
        assert.equal(node.secondaryProgress, value);
      });

      it(`paper-progress has max for ${prop}`, () => {
        const node = element.shadowRoot.querySelector(`[data-type="${type}"] paper-progress`);
        assert.equal(node.max, 2455.187694234);
      });

      it(`renders ${prop} round time`, () => {
        const node = element.shadowRoot.querySelector(`[data-type="${type}"] .timing-value`);
        const value = node.innerText.trim().toLowerCase();
        assert.equal(value, `${roundValue} ms`);
      });
    });
  });
});
