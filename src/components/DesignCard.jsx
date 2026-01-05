export default function DesignCard({
  imgSrc,
  description,
}) {
  return (
    <div className="group w-[360px] overflow-hidden bg-off-white rounded-lg p-[20px]">
      <div className="w-full">
        <img
          src={imgSrc}
          alt=""
          className="w-full h-auto block rounded-md"
        />
      </div>
      <div className="space-y-2 text-dark-grey">
        {description && (
          <p className="text-base font-inconsolata">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
