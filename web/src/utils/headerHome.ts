import dayjs from "dayjs";

// Valores padrão de meses do Javascript (Date)
export const months = [
  { title: "Selecione", value: "all" },
  { title: "Janeiro", value: 0 },
  { title: "Fevereiro", value: 1 },
  { title: "Março", value: 2 },
  { title: "Abril", value: 3 },
  { title: "Maio", value: 4 },
  { title: "Junho", value: 5 },
  { title: "Julho", value: 6 },
  { title: "Agosto", value: 7 },
  { title: "Setembro", value: 8 },
  { title: "Outubro", value: 9 },
  { title: "Novembro", value: 10 },
  { title: "Dezembro", value: 11 },
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
