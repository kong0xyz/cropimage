declare module "rough-notation" {
  export type AnnotationType =
    | "highlight"
    | "underline"
    | "box"
    | "circle"
    | "strike-through"
    | "crossed-off"
    | "bracket";

  export interface AnnotationConfig {
    type: AnnotationType;
    color?: string;
    strokeWidth?: number;
    animationDuration?: number;
    iterations?: number;
    padding?: number;
    multiline?: boolean;
  }

  export interface RoughAnnotation {
    show: () => void;
    hide: () => void;
    remove: () => void;
  }

  export function annotate(
    element: Element,
    config: AnnotationConfig
  ): RoughAnnotation;
}

declare module "rough-notation/lib/model" {
  export interface RoughAnnotation {
    show: () => void;
    hide: () => void;
    remove: () => void;
  }
}
