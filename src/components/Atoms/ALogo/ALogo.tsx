import logo from '@/assets/ssclogo.png';
import { cn } from '@/lib/utils/cn';

export default function ALogo({className, iconClassName}: {className?: string, iconClassName?: string}) {
  const maskUrl = logo.src;;
  
    return (
      <div className={cn("bg-(--color-background) w-10 h-10 rounded-full", className)}>
        <div
          className={cn("w-10 h-10 bg-(--color-foreground)", iconClassName)}
          style={{
            WebkitMaskImage: `url(${maskUrl})`,
            maskImage: `url(${maskUrl})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
        </div>
    )
}