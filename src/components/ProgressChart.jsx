import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const ProgressChart = ({ habits }) => {

  const labels = habits.map(h => h.name);

  const goal = habits.map(h => h.goal);

  const actual = habits.map(h => h.today || 0);

  const data = {

    labels,

    datasets: [

      {

        label:"Goal",

        data:goal,

      },

      {

        label:"Actual",

        data:actual,

      }

    ]

  };

  const options={

    responsive:true,

    plugins:{

      legend:{

        labels:{
          color:"white"
        }

      }

    },

    scales:{

      x:{
        ticks:{
          color:"white"
        }
      },

      y:{
        ticks:{
          color:"white"
        }
      }

    }

  };

  return(

<div
style={{

background:"#0b3448",

padding:"30px",

borderRadius:"20px",

marginBottom:"40px"

}}
>

<h2 style={{marginBottom:"20px"}}>

Goal vs Actual

</h2>

<Bar
data={data}
options={options}
/>

</div>

  );

};

export default ProgressChart;