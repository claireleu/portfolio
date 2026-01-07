export default function DesignCard({
  imgSrc,
  description,
  category,
}) {
  const hasWhiteBackground = category === 'product';
  
  return (
    <div className={`group overflow-hidden rounded-md p-[15px] mb-2 md:mb-4 lg:mb-6 ${hasWhiteBackground ? 'bg-off-white' : ''}`}>
      <div className="w-full flex-shrink-0">
        <img
          src={imgSrc}
          alt=""
          className="w-full h-auto block"
        />
      </div>
      <div className="flex-grow-0 flex-shrink-0 text-dark-grey">
        {description && (
          <p className="text-sm font-effra font-light pt-2 leading-3.5">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
