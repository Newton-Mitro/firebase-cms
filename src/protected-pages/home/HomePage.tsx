import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Colors,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Line, PolarArea } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  RadialLinearScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Colors,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
    colors: {
      forceOverride: true,
    },
  },
};

const labels = ["Pages", "Posts", "Notices", "Events", "Users"];

export const data = {
  labels,
  datasets: [
    {
      label: "Pages",
      data: [6, 150, 50, 10, 10],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-10 w-6/12 h-[calc(85vh/2)]">
        <Line options={options} data={data} />
        <Doughnut data={data} />
      </div>
      <div className="flex gap-10 w-6/12 h-[calc(85vh/2)]">
        <PolarArea data={data} />
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}

export default HomePage;
