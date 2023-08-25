import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "../Context/ThemeContext";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Graph({ graphData }) {
  const { theme } = useTheme();
  return (
    <>
      <Line
        data={{
          labels: graphData.map((item) => item[0]),
          datasets: [
            {
              data: graphData.map((item) => item[1]),
              label: "wpm",
              borderColor: theme.textColor,
            },
          ],
        }}
      />
    </>
  );
}

export default Graph;
