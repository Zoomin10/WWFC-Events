export default function SponsorFooter() {
  const sponsors = [
    "/images/sponsors/sponsor1.png",
    "/images/sponsors/sponsor2.png",
    "/images/sponsors/sponsor3.png",
    "/images/sponsors/sponsor4.png",
    "/images/sponsors/sponsor5.png",
  ];

  return (
    <div className="border-top mt-5 pt-4 pb-3 text-center">

      <div className="small text-muted mb-3">
        Proudly supported by our sponsors
      </div>

      <div className="d-flex justify-content-center align-items-center flex-wrap gap-4">
        {sponsors.map((logo) => (
          <img
            key={logo}
            src={logo}
            alt=""
            style={{
              height: "55px",
              maxWidth: "140px",
              objectFit: "contain",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ))}
      </div>

    </div>
  );
}