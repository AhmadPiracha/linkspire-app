import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProfileCard from './ProfileCard';

export default function FeaturedProfiles({ profiles, onConnect }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Featured Profiles</h2>
      <Slider {...settings}>
        {profiles.map(p => (
          <div key={p.id} className="px-2">
            <ProfileCard profile={p} onConnect={onConnect} />
          </div>
        ))}
      </Slider>
    </div>
  );
}