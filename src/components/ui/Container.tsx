import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";

type ContainerProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Container<T extends ElementType = "div">({
  as,
  children,
  className,
  ...rest
}: ContainerProps<T>) {
  const Tag = as || "div";
  return (
    <Tag className={clsx("mx-auto max-w-content px-5 sm:px-8 lg:px-12", className)} {...rest}>
      {children}
    </Tag>
  );
}
