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
        "font-display mt-8 mb-3 text-base font-bold tracking-tight text-foreground",
        "after:mt-1.5 after:block after:h-0.5 after:w-8 after:rounded-full after:bg-primary/60",
        props.className
      )}
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p
      className={cn(
        "my-3.5 text-[0.95rem] leading-7 text-foreground/75",
        "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4",
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        props.className
      )}
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className={cn(
        "my-4 space-y-2 rounded-xl border border-border/60 bg-card/60 px-4 py-3 text-[0.95rem] leading-6 text-foreground/75 marker:text-primary",
        props.className
      )}
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className={cn(
        "my-4 list-decimal space-y-2 pl-5 text-[0.95rem] leading-6 text-foreground/75 marker:font-semibold marker:text-primary",
        props.className
      )}
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li
      className={cn(
        "pl-1 [&>p]:my-1.5 [&>strong]:text-foreground",
        props.className
      )}
      {...props}
    />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="italic text-foreground/80" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className={cn(
        "rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em] font-medium text-violet",
        props.className
      )}
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-xl border border-border/80 bg-surface p-4 font-mono text-[0.8rem] leading-relaxed text-foreground shadow-xs",
        "[&_code]:m-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit",
        props.className
      )}
      {...props}
    />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="font-medium text-primary underline-offset-4 hover:underline"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className={cn(
        "my-6 rounded-r-xl border-l-4 border-primary/50 bg-primary/5 px-4 py-3 text-[0.95rem] italic leading-7 text-foreground/80 [&_p]:my-1.5",
        props.className
      )}
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-border/60" />,
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border/80 bg-card shadow-xs">
      <table
        className="w-full min-w-[440px] border-collapse text-left text-sm"
        {...props}
      />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead className="bg-muted/70" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-b border-border/80 px-3.5 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
      {...props}
    />
  ),
  tr: (props: ComponentPropsWithoutRef<"tr">) => (
    <tr
      className="transition-colors even:bg-muted/30 hover:bg-primary/5"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td
      className="border-b border-border/50 px-3.5 py-2.5 align-top leading-relaxed text-foreground/80 last:border-b-0 [&_code]:whitespace-nowrap"
      {...props}
    />
  ),
  Callout,
};
