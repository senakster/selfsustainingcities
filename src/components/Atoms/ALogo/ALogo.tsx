import logo from '@/assets/ssclogo.png';

export default function ALogo() {
  const maskUrl = logo.src;;
  
    return (
      <div className="bg-(--color-background) w-10 h-10 rounded-full">
        <div
          className="w-10 h-10 bg-(--color-foreground)"
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