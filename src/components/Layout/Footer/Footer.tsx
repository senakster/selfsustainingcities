import { cn } from "@/lib/utils/cn";
import Container from '@/components/Layout/Container/Container'

type FooterProps = {
  className: string;
};

export default function Footer(props: FooterProps) {
  const { className, ...rest } = props;
  return (
    <footer className={cn('py-4 backdrop-blur-lg pt-10 mask-[linear-gradient(to_top,black_calc(100%-40px),transparent_100%)]',className)} {...rest}>
      <Container>
        <span></span>
      </Container>
    </footer>
  );
}
