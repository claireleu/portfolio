export default function DesignCard({
  imageSrc,
  purpose,
  description,
  tools = [],
}) {
  return (
    <div
      className="
        group
        w-[360px]
        overflow-hidden
        bg-dark-grey
      "
    >
      {/* Image crop window */}
      <div
        className="
          w-full
        "
      >
        <img
          src={imageSrc}
          alt=""
          className="w-full h-auto block"
        />
      </div>

      {/* Text content (never animated) */}
      <div className="p-4 space-y-2 text-off-white">
        {purpose && (
          <p className="text-sm font-inconsolata">
            @{purpose}
          </p>
        )}

        {description && (
          <p className="text-base font-inconsolata">
            {description}
          </p>
        )}

        {tools.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {tools.map((tool) => (
              <span
                key={tool}
                className="
                  text-sm
                  px-2 py-1
                  rounded-full
                  bg-accent
                  text-off-white
                  font-inconsolata
                  whitespace-nowrap
                "
              >
                {tool}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
