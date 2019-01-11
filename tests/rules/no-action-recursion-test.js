const rule = require("../../lib/rules/no-action-recursion");
const MESSAGE = rule.meta.reportMessage("onClick");
const RuleTester = require("eslint").RuleTester;
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module"
  }
});

ruleTester.run("no-action-recursion", rule, {
  valid: [
    {
      code: `
        export default Component.extend({
          someFn() {
            this.someFn();
            tryInvoke(this, 'someFn', [])
          }
        })
        `
    }
  ],
  invalid: [
    {
      code: `
        export default Component.extend({
          actions: {
            onClick() {
              this.onClick();
            }
          }
        })
        `,
      errors: [
        {
          message: MESSAGE
        }
      ]
    },
    {
      code: `
        export default Component.extend({
          actions: {
            onClick() {
              tryInvoke(this, 'onClick', [...arguments]);
            }
          }
        })
        `,
      errors: [
        {
          message: MESSAGE
        }
      ]
    }
  ]
});
