import { TSESTree } from "@typescript-eslint/experimental-utils";

import {
  isCallExpression,
  isClassLike,
  isFunctionExpressionLike,
  isFunctionLike,
  isIdentifier,
  isMemberExpression,
  isMethodDefinition,
  isProperty,
  isTSInterfaceBody
} from "./typeguard";

/**
 * Return the parent that meets the given check criteria.
 */
function getParentOfType<T extends TSESTree.Node>(
  checker: (node: TSESTree.Node) => node is T,
  node: TSESTree.Node
): T | null {
  return checker(node)
    ? node
    : node.parent == undefined
    ? null
    : getParentOfType(checker, node.parent);
}

/**
 * Test if the given node is in a function.
 */
export function inFunction(node: TSESTree.Node): boolean {
  return getParentOfType(isFunctionLike, node) !== null;
}

/**
 * Test if the given node is in a class.
 */
export function inClass(node: TSESTree.Node): boolean {
  return getParentOfType(isClassLike, node) !== null;
}

/**
 * Test if the given node is in a TS Property Signature.
 */
export function inInterface(node: TSESTree.Node): boolean {
  return getParentOfType(isTSInterfaceBody, node) !== null;
}

/**
 * Test if the given node is in a Constructor.
 */
export function inConstructor(node: TSESTree.Node): boolean {
  const methodDefinition = getParentOfType(isMethodDefinition, node);
  return (
    methodDefinition !== null &&
    isIdentifier(methodDefinition.key) &&
    methodDefinition.key.name === "constructor"
  );
}

/**
 * Is the given node in the return type.
 */
export function isInReturnType(node: TSESTree.Node): boolean {
  return (
    getParentOfType(
      (n): n is TSESTree.Node =>
        n.parent != undefined &&
        isFunctionLike(n.parent) &&
        n.parent.returnType === n,
      node
    ) !== null
  );
}

/**
 * Is the given identifier a property of an object?
 */
export function isPropertyAccess(node: TSESTree.Identifier): boolean {
  return (
    node.parent !== undefined &&
    isMemberExpression(node.parent) &&
    node.parent.property === node
  );
}

/**
 * Is the given identifier a property name?
 */
export function isPropertyName(node: TSESTree.Identifier): boolean {
  return (
    node.parent !== undefined &&
    isProperty(node.parent) &&
    node.parent.key === node
  );
}

/**
 * Is the given function an IIFE?
 */
export function isIIFE(node: TSESTree.Node): boolean {
  return (
    isFunctionExpressionLike(node) &&
    node.parent !== undefined &&
    isCallExpression(node.parent) &&
    node.parent.callee === node
  );
}
