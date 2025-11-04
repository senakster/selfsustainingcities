import { cn } from "@/lib/utils/cn";
import Container from '@/components/Layout/Container/Container'

type FooterProps = {
  className: string;
};

export default function Footer(props: FooterProps) {
  const { className, ...rest } = props;
  return (
    <footer className={cn('py-2 bg-theme-secondary min-h-[200px] hidden', className)} {...rest}>
      {/* <Container>
        <span></span>
      </Container> */}
    </footer>
  );
}
