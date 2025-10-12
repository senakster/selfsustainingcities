// import Image from "next/image";
import { ImageProps } from "next/image";
import { cn } from "@/lib/utils/cn";
import { urlFor } from "@/sanity/lib/image";

const svgStringToB64 = (svgString: string) => {
  return `data:image/svg+xml;base64,${Buffer.from(svgString).toString('base64')}`;
}
export default function AIcon({img, className, alt, color}: {img: ImageProps | string, className?: string, alt?: string, color?: string}) {
  if(!img) return null
  const { className: imgClassName, alt: imgAlt,...rest } = typeof img === 'object' ? img : {};
  const iconColor = color || "var(--color-foreground)";
  const altText = alt || imgAlt;
  const imgUrl = typeof img === 'string' ? null : urlFor(img)?.toString();
  const svgString = typeof img === 'string' ? svgStringToB64(img) : null;
  const maskStyle = {
    backgroundColor: iconColor,
    WebkitMaskImage: imgUrl ? `url(${imgUrl})` : svgString ? `url(${svgString})` : null,
    maskImage: imgUrl ? `url(${imgUrl})` : svgString ? `url(${svgString})` : null,
    WebkitMaskRepeat: "no-repeat",  
    maskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  }
  return (
    <div>
      {imgUrl && (
      <div 
        className={cn(imgClassName, className)}
        {...rest}
        title={altText}
        style={{
          ...maskStyle,
          WebkitMaskImage: maskStyle.WebkitMaskImage ?? undefined,
          maskImage: maskStyle.maskImage ?? undefined,
        }}
         />
      )}
      {svgString && (
        <div dangerouslySetInnerHTML={{ __html: svgString }} className={cn(imgClassName, className)} {...rest} title={altText} style={{
          ...maskStyle,
          WebkitMaskImage: maskStyle.WebkitMaskImage ?? undefined,
          maskImage: maskStyle.maskImage ?? undefined,
        }} />
      )}
    </div>
  )
}