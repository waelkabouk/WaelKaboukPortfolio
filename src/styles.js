// Type roles. Newsreader (serif) for headlines, numbers and the name: regular
// for statements, medium for titles, never bold. IBM Plex Sans for everything else.
const styles = {
  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-24 py-16",

  heroHeadText:
    "font-serif font-normal text-white lg:text-[96px] sm:text-[72px] xs:text-[56px] text-[48px] leading-[0.98] tracking-[-0.02em]",
  heroSubText:
    "font-sans text-white-100 lg:text-[24px] sm:text-[22px] text-[18px] leading-[1.4]",

  sectionHeadText:
    "font-serif font-medium text-white md:text-[64px] sm:text-[52px] text-[40px] leading-[1.02] tracking-[-0.02em]",
  sectionSubText:
    "font-sans sm:text-[18px] text-[16px] text-secondary",
  cardTitle: "font-serif font-medium text-white",
};

export { styles };
