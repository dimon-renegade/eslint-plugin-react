/**
 * @fileoverview Enforce boolean attributes notation in JSX
 * @author Yannick Croissant
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/jsx-boolean-value');
var RuleTester = require('eslint').RuleTester;

var parserOptions = {
  ecmaVersion: 8,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true
  }
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester({parserOptions});
ruleTester.run('jsx-boolean-value', rule, {
  valid: [
    {code: '<App foo />;', options: ['never']},
    {code: '<App foo bar={true} />;', options: ['always', {never: ['foo']}]},
    {code: '<App foo />;'},
    {code: '<App foo={true} />;', options: ['always']},
    {code: '<App foo={true} bar />;', options: ['never', {always: ['foo']}]}
  ],
  invalid: [{
    code: '<App foo={true} />;',
    output: '<App foo />;',
    options: ['never'],
    errors: [{message: 'Value must be omitted for boolean attributes'}]
  }, {
    code: '<App foo={true} bar={true} baz={true} />;',
    output: '<App foo bar baz={true} />;',
    options: ['always', {never: ['foo', 'bar']}],
    errors: [
      {message: 'Value must be omitted for boolean attributes for the following props: `foo`, `bar`'},
      {message: 'Value must be omitted for boolean attributes for the following props: `foo`, `bar`'}
    ]
  }, {
    code: '<App foo={true} />;',
    output: '<App foo />;',
    errors: [{message: 'Value must be omitted for boolean attributes'}]
  }, {
    code: '<App foo = {true} />;',
    output: '<App foo />;',
    errors: [{message: 'Value must be omitted for boolean attributes'}]
  }, {
    code: '<App foo />;', output: '<App foo={true} />;', options: ['always'],
    errors: [{message: 'Value must be set for boolean attributes'}]
  }, {
    code: '<App foo bar baz />;',
    output: '<App foo={true} bar={true} baz />;',
    options: ['never', {always: ['foo', 'bar']}],
    errors: [
      {message: 'Value must be set for boolean attributes for the following props: `foo`, `bar`'},
      {message: 'Value must be set for boolean attributes for the following props: `foo`, `bar`'}
    ]
  }]
});
