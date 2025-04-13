import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import JobCard from './JobCard';

export default function FeaturedJobs({ jobs, onApply }) {
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
      <h2 className="text-2xl font-bold mb-4">Recommended Jobs</h2>
      {jobs.length > 0 ? (
        <Slider {...settings}>
          {jobs.map(job => (
            <div key={job.id} className="px-2">
              <JobCard job={job} onApply={onApply} />
            </div>
          ))}
        </Slider>
      ) : (
        <p>No recommended jobs found.</p>
      )}
    </div>
  );
}