import Image from 'next/image';

const HeroSection = ({ blockData }) => {
  const { title, subtitle, image } = blockData;

  return (
    <section className="relative top-0">
      <div className="absoulte top-0 left-0 h-screen w-screen">
        <Image src={image?.imageAsset?.url} fill alt={image?.altText} />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
        <h1 className="text-4xl font-bold text-white">{title}</h1>
        <p className="text-2xl text-white">{subtitle}</p>
      </div>
    </section>
  );
};

export default HeroSection;
