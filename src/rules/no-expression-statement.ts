import { TSESTree } from "@typescript-eslint/experimental-utils";
import { JSONSchema4 } from "json-schema";

import {
  IgnorePatternOption,
  ignorePatternOptionSchema
} from "../common/ignore-options";
import {
  createRule,
  RuleContext,
  RuleMetaData,
  RuleResult
} from "../util/rule";

// The name of this rule.
export const name = "no-expression-statement" as const;

// The options this rule can take.
type Options = IgnorePatternOption;

// The schema for the rule options.
const schema: JSONSchema4 = [ignorePatternOptionSchema];

// The default options for the rule.
const defaultOptions: Options = {};

// The possible error messages.
const errorMessages = {
  generic: "Using expressions to cause side-effects not allowed."
} as const;

// The meta data for this rule.
const meta: RuleMetaData<keyof typeof errorMessages> = {
  type: "suggestion",
  docs: {
    description: "Disallow expression statements.",
    category: "Best Practices",
    recommended: false
  },
  messages: errorMessages,
  schema
};

/**
 * Check if the given ExpressionStatement violates this rule.
 */
function checkExpressionStatement(
  node: TSESTree.ExpressionStatement,
  context: RuleContext<keyof typeof errorMessages, Options>
): RuleResult<keyof typeof errorMessages, Options> {
  // All expression statements violate this rule.
  return { context, descriptors: [{ node, messageId: "generic" }] };
}

// Create the rule.
export const rule = createRule<keyof typeof errorMessages, Options>(
  name,
  meta,
  defaultOptions,
  {
    ExpressionStatement: checkExpressionStatement
  }
);
