export const ageGroups = [
  {
    key: "YEAR3_AND_BELOW",
    label: "Year 3 & Below",
    schoolYears: ["RECEPTION", "YEAR1", "YEAR2", "YEAR3"],
  },
  {
    key: "YEAR4_TO_YEAR6",
    label: "Year 4–6",
    schoolYears: ["YEAR4", "YEAR5", "YEAR6"],
  },
  {
    key: "YEAR7_PLUS",
    label: "Year 7+",
    schoolYears: [
      "YEAR7",
      "YEAR8",
      "YEAR9",
      "YEAR10",
      "YEAR11",
      "YEAR12",
      "YEAR13",
    ],
  },
];

export function getAgeGroupForSchoolYear(schoolYear) {
  return ageGroups.find((group) => group.schoolYears.includes(schoolYear));
}