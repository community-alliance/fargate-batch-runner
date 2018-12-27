'use strict'

const expect = require('expect');
const parseEnvironmentJson = require('./config').parseEnvironmentJson;

describe('Config', () => {
    describe('parseEnvironmentJson', () => {
        it('Empty String returns empty', () => {
            //arrange
            let expected = {};
            //act
            let actual = parseEnvironmentJson("");
            //assert
            expect(actual).toEqual(expected);
 
        });
        it('Undefined returns empty', () => {
            //arrange
            let expected = {};
            //act
            let actual = parseEnvironmentJson(undefined);
            //assert
            expect(actual).toEqual(expected);
 
        });
        it('JSON string returns JSON', () => {
            //arrange
            let input = '{"KEY": "KEY_VALUE", "VALUE": "VALUE_VALUE"}';
            let expected = [{name: "KEY", value: "KEY_VALUE"}, {name: "VALUE", value: "VALUE_VALUE"}];

            //act
            let actual = parseEnvironmentJson(input);
            //assert
            expect(actual).toEqual(expected);
 
        });
    });
})
