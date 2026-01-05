export default function DesignCard({
  imgSrc,
  description,
}) {
  return (
    <div className="group overflow-hidden bg-off-white rounded-md p-[15px] mb-2 md:mb-4 lg:mb-6">
      <div className="w-full flex-shrink-0">
        <img
          src={imgSrc}
          alt=""
          className="w-full h-auto block rounded-md"
        />
      </div>
      <div className="flex-grow-0 flex-shrink-0 text-dark-grey">
        {description && (
          <p className="text-sm font-inconsolata pt-2 leading-3.5">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
