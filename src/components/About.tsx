const experience = [
  { label: 'currently', items: ['studying Computer Science @ University of Waterloo'] },
  { label: 'previously', items: ['software engineer intern @ Shopify', 'design @ Hack the North'] },
]

export default function About() {
  return (
    <section className="flex w-full shrink-0 flex-col gap-[8px] pr-[48px] leading-normal break-words text-main-text">
      <div className="flex w-full flex-col gap-[25px]">
        <h1 className="text-[18px] font-medium">Claire Liu</h1>
        <p className="text-[15.856px] font-light">
          I am passionate about creating experiences and how technology can make us feel wonder
          and excitement.
        </p>
      </div>
      <div className="flex w-full flex-col gap-[12.069px] text-[15.856px]">
        {experience.map(({ label, items }) => (
          <div key={label} className="flex w-full flex-col gap-[2.586px]">
            <h2 className="font-normal">{label}</h2>
            <ul className="list-disc font-light">
              {items.map((item) => (
                <li key={item} className="ms-[23.784px]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
