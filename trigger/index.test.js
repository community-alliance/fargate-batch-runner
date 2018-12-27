'use strict';

var expect = require( 'expect' );

var LambdaTester = require( 'lambda-tester' );

var lambda = require( './index' );

describe( 'lambda', function() {
    it( 'successful invocation of lambda', function() {

        return LambdaTester( myLambda.handler )
            .event( { name: validName } )
            .expectResult( ( result ) => {

                expect( result.valid ).to.be.true;
            });
    });
});
