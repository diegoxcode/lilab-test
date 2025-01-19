import { IClient } from "../../interfaces/client";
import ReactApexChart from 'react-apexcharts'

interface IProps {
    accessClients: IClient[]
}

const Chart = ({accessClients} : IProps) => {

    const chartData = {
        series: [
            {
              name: "Hora de Entrada",
              data: accessClients.map((client: IClient) => ({
                x: client.name, // Nombre del cliente en el eje Y
                y: new Date(client.entryTime).getTime(), // Fecha y hora en milisegundos para el eje X
              })),
            },
          ],
      };
      
      const chartOptions = {
        chart: {
          type: "chart",
          height: 450,
          toolbar: {
            show: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true, // Cambia a barras horizontales
            dataLabels: {
              position: "end", // Coloca las etiquetas al final de las barras
            },
          },
        },
        dataLabels: {
            enabled: true,
            formatter: function (value: number) {
              return new Date(value).toLocaleString("es-PE", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              });
            },
            offsetX: 10,
          },
        xaxis: {
          type: "category",
          title: {
            text: "Fecha y Hora de Acceso",
          },
        },
        yaxis: {
          title: {
            text: "Nombres de Clientes",
          },
        },
        tooltip: {
            y: {
              formatter: function (value: number) {
                return new Date(value).toLocaleString("es-PE", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                });
              },
            },
          },
        title: {
          text: "Accesos Recientes por Cliente",
          align: "center",
        },
      };

    return (
        <div>
            
        <ReactApexChart
          // @ts-ignore
          options={chartOptions}
          series={chartData.series}
          type="area"
          height={280}
        />
        </div>
    )
}

export default Chart;