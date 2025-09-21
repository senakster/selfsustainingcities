import { cn } from "@/lib/utils/cn";
import Container from '@/components/Layout/Container/Container'

type FooterProps = {
  className: string;
};

export default function Footer(props: FooterProps) {
  const { className, ...rest } = props;
  return (
    <footer className={cn('py-4 backdrop-blur-lg',className)} {...rest}>
      <Container>
      Footer
      </Container>
    </footer>
  );
}
