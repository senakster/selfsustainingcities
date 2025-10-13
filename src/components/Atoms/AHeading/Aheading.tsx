import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";

type AHeadingProps = {
  children: ReactNode;
  className: string;
  tag: "h1" | "h2" | "h3" | "h4" | "span";
};
export default function AHeading(props: AHeadingProps) {
  const { tag: Tag, children, className, ...rest } = props;


  const commonClassNames = 'font-serif'
  const classNameByTag = (): string => {
    switch (Tag) {
      case 'h1':
        return 'text-3xl lg:text-4xl'
      case 'h2':
        return 'text-2xl lg:text-3xl'
      case 'h3':
        return 'text-xl lg:text-2xl'
      case 'h4':
        return 'text-lg lg:text-xl'
      case 'span':
        return 'text-base lg:text-base'
      default:
        return 'text-lg lg:text-xl'
    }
  }

  return (
    <Tag className={cn(commonClassNames, classNameByTag(), className)} {...rest}>
      {children}
    </Tag>
  );
}
