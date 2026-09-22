import type { ComponentPropsWithoutRef } from "react";
import { Callout } from "@/components/mdx/callout";
import { cn } from "@/lib/utils";

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className={cn(
        "font-display mt-10 mb-3 text-xl font-semibold tracking-tight text-foreground scroll-mt-24",
        props.className
      )}
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className={cn(
        "font-display mt-8 mb-2 text-lg font-semibold tracking-tight text-foreground scroll-mt-24",
        props.className
      )}
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p
      className={cn(
        "my-4 leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline [&_strong]:text-foreground",
        props.className
      )}
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className={cn(
        "my-4 space-y-2 pl-5 text-muted-foreground marker:text-primary",
        props.className
      )}
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className={cn(
        "my-4 list-decimal space-y-2 pl-5 text-muted-foreground marker:text-primary",
        props.className
      )}
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className={cn("leading-relaxed [&>strong]:text-foreground", props.className)} {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className={cn(
        "rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-violet",
        props.className
      )}
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-xl border bg-surface p-4 font-mono text-[0.8rem] leading-relaxed text-foreground",
        props.className
      )}
      {...props}
    />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-primary underline-offset-4 hover:underline"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  ),
  Callout,
};
