import dayjs from "dayjs";

export const months = [
  { title: "Selecione", value: "all" },
  { title: "Janeiro", value: 1 },
  { title: "Fevereiro", value: 2 },
  { title: "Março", value: 3 },
  { title: "Abril", value: 4 },
  { title: "Maio", value: 5 },
  { title: "Junho", value: 6 },
  { title: "Julho", value: 7 },
  { title: "Agosto", value: 8 },
  { title: "Setembro", value: 9 },
  { title: "Outubro", value: 10 },
  { title: "Novembro", value: 11 },
  { title: "Dezembro", value: 12 },
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
