import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

interface Props {
  right?: boolean;
  opacity: number;
  children: React.ReactNode;
}

const Section = (props: Props) => {
  return (
    <section
      className={`h-[100dvh] flex flex-col justify-center p-10 ${
        props.right ? "items-end" : "items-start"
      } `}
      style={{
        opacity: props.opacity,
      }}
    >
      <div className="lg:w-1/2 flex items-center justify-center">
        <div className="max-w-sm w-full">{props.children}</div>
      </div>
    </section>
  );
};

export const Content = () => {
  const scroll = useScroll();
  const [opacityFirstSection, setOpacityFirstSection] = useState(1);
  const [opacitySecondSection, setOpacitySecondSection] = useState(1);
  const [opacityLastSection, setOpacityLastSection] = useState(1);

  useFrame(() => {
    setOpacityFirstSection(1 - scroll.range(0, 1 / 3));
    setOpacitySecondSection(scroll.curve(1 / 3, 1 / 3));
    setOpacityLastSection(scroll.range(2 / 3, 1 / 3));
  });

  return (
    <Scroll html>
      <div className="w-screen text-black">
        <p className="text-gray-500 font-normal text-xs">
          *Disclaimer not a real site - for showcase purposes only.
        </p>
        <Section opacity={opacityFirstSection}>
          <div className="font-bold font-sans flex flex-col absolute top-20 left-30">
            <h1>| NIKE AIR</h1>
            <h1 className="text-orange-500">"ZOOM"</h1>
            <h1> PEGASUS |</h1>
            <p className="animate-bounce  mt-6  self-center">↓</p>
          </div>
          <h1 className="absolute right-6 font-thin">| 36</h1>
        </Section>
        <Section right opacity={opacitySecondSection}>
          <h1 className=" font-bold font-sans flex">"COMFORT"</h1>
          <p className="text-gray-500">
            The Air Zoom Pegasus features a responsive cushioning system that
            absorbs impact and bounces back to propel you forward. The Nike Zoom
            Air units in the heel and forefoot deliver a snappy, smooth ride,
            while the foam midsole adds an extra layer of cushioning for
            long-lasting comfort.
          </p>
          <p className="animate-bounce  mt-6">↓</p>
        </Section>
        <Section opacity={opacityLastSection}>
          <h1 className=" font-bold font-sans">"Ready"</h1>
          <p className="text-gray-500">
            Whether you're training for a race or simply looking for a
            comfortable and reliable shoe for your daily runs, the Nike Air Zoom
            Pegasus is the perfect choice. Order your pair today and experience
            the ultimate in performance and style.
          </p>
          <div className="flex justify-end items-center">
            <p>$89.99</p>
            <button className=" bg-black text-white py-2 px-4 m-4 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
              Add to Bag
            </button>
          </div>
        </Section>
      </div>
    </Scroll>
  );
};
