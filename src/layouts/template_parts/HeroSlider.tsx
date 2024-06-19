import { useEffect } from "react";

interface HeroSliderProps {}

const HeroSlider: React.FC<HeroSliderProps> = ({}) => {
  useEffect(() => {}, []);

  return (
    <div>
      <div className="h-auto md:h-[calc(100vh-120px)] lg:h-[calc(100vh-120px)]"></div>
    </div>
  );
};

export default HeroSlider;
