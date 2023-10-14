import dayjs from "dayjs";

export const months = [
  { title: "Janeiro", value: "janeiro" },
  { title: "Fevereiro", value: "fevereiro" },
  { title: "Março", value: "marco" },
  { title: "Abril", value: "abril" },
  { title: "Maio", value: "maio" },
  { title: "Junho", value: "junho" },
  { title: "Julho", value: "julho" },
  { title: "Agosto", value: "agosto" },
  { title: "Setembro", value: "setembro" },
  { title: "Outubro", value: "outubro" },
  { title: "Novembro", value: "novembro" },
  { title: "Dezembro", value: "dezembro" },
];

export const getYears = () => {
  const yearCreated = "2023";
  const numberYearCreated = Number(yearCreated.substring(2));

  const currentYear = String(dayjs().year());
  const numberCurrentYear = Number(currentYear.substring(2));

  const years = [];

  for (let i = numberYearCreated; i <= numberCurrentYear; i++) {
    const prefixYear = "20";

    years.push(`${prefixYear}${i}`);
  }

  return years;
};
