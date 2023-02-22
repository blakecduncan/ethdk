import { expect } from 'chai';

import { test } from '../src';

describe('test', () => {
    it('should return test', () => {
        expect(test()).to.equal('test');
    });
});