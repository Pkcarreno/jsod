import type { ComponentType } from 'react';
import type { RouteComponentProps } from 'wouter';

type ComponentTypes = ComponentType<
  RouteComponentProps<Record<string, string>>
>; // TODO: infer types from element

export interface routerType {
  title: string;
  path: string;
  element: ComponentTypes;
}
