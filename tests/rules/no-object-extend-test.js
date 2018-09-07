const rule = require("../../lib/rules/no-object-extend");
const MESSAGE = rule.meta.message;
const RuleTester = require("eslint").RuleTester;
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module"
  }
});

ruleTester.run("no-object-extend", rule, {
  valid: [
    {
      code: `
        test();
        `
    },
    {
      code: `
        obj.method();
        `
    },
    {
      code: `
        function fn() {
        }
        `
    },
    {
      code: `
        const x = '';
        `
    },
    {
      code: `
        const Foo = test.extend({});
        `
    },
    {
      code: `
        test.extend({});
        `
    },
    {
      code: `
        test.extend({}).create();
        `
    }
  ],
  invalid: [
    {
      code: `
        const Foo = Test.extend({});
        `,
      errors: [
        {
          message: MESSAGE
        }
      ]
    },
    {
      code: `
        Test.extend({});
        `,
      errors: [
        {
          message: MESSAGE
        }
      ]
    },
    {
      code: `
        Test.extend({}).create();
        `,
      errors: [
        {
          message: MESSAGE
        }
      ]
    }
  ]
});
