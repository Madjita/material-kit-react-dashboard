import React, { useCallback, useEffect, useState } from 'react';

import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    SvgIcon,
    TextField
  } from '@mui/material';

  import { alpha, useTheme } from '@mui/material/styles';
  import { Chart } from '../../components/chart';
  import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
  import axios from 'axios';

  const states = [
    {
      value: 'MRV',
      label: 'Минеральные Воды'
    },
    {
      value: 'MOW',
      label: 'Москва'
    },
    {
      value: 'LED',
      label: 'Санкт-Петербург'
    },
    {
      value: 'SVX',
      label: 'Екатеринбург'
    },
    {
      value: 'KJA',
      label: 'Красноясрк'
    },
    {
      value: 'HKT',
      label: 'Пхукет',
    },
    {
      value: 'USM',
      label: 'Кох Самуи'
    },
    {
      value: 'KZN',
      label: 'Казань'
    },
    {
      value: 'UUD',
      label: 'Улан-Удэ'
    },
    {
      value: 'ALA',
      label: 'Алматы, Казахстан'
    },
    {
      value: 'EVN',
      label: 'Ереван, Армения'
    },
    {
      value: 'AER',
      label: 'Сочи, Россия'
    }


  ];

  function isTop3MinValue(value, chartData) {
    
    const numericData = chartData.map(Number);
  
    const uniquePrices = Array.from(new Set(numericData)); // Убираем дубликаты цен
    const top3MinPrices = uniquePrices
      .sort((a: any, b: any) => a - b) // Сортируем уникальные цены по возрастанию
      .slice(0, 3); // Вырезаем топ 3 разных минимальных цены
    return top3MinPrices.includes(value);
  }
  

  
  const useChartOptions = (chartData: []) => {
    const theme = useTheme();
  
    // Получите текущую дату
    const currentDate = new Date();

    // Создайте массив с днями от сегодня до 7 дней вперед
    const daysInMonth = [];
    for (let i = 0; i < chartData?.length ?? 8; i++) {
      const day = new Date(currentDate);
      day.setDate(currentDate.getDate() + i);
      const dayOfWeek = day.toLocaleDateString('en-US', { weekday: 'short' });
      const formattedDate = `${day.getDate()}-${day.getMonth() + 1}-${day.getFullYear()}`; //-${day.getMonth() + 1}-${day.getFullYear()}
      const combinedString = `${dayOfWeek} (${formattedDate})`;
      daysInMonth.push(combinedString);
    }

    return {
      chart: {
        background: 'transparent',
        stacked: false,
        toolbar: {
          show: false
        }
      },
      colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
      dataLabels: {
        enabled: false,
        formatter: function (val, opts) {
          // Добавьте условие для применения formatter только к топ 3 минимальным значениям
          // if (isTop3MinValue(val, opts.w.config.series[opts.seriesIndex].data)) {
          //   return val.toLocaleString();
          // } else {
          //   return ''; // Оставить остальные значения без форматирования
          // }

          return val.toLocaleString()
        },
        style: {
          colors: ['#fff'], // Задать черный цвет для текста
        },
        background: {
            enabled: true,
            foreColor: '#000',
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: '#6366f1',
            opacity: 0.9,
            rotate: 90,
            dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: '#6366f1',
              opacity: 0.45
            }
          },
        
      },
      fill: {
        opacity: 1,
        type: 'solid'
      },
      grid: {
        borderColor: theme.palette.divider,
        strokeDashArray: 2,
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      legend: {
        show: false
      },
      plotOptions: {
        bar: {
          columnWidth: '40px'
        }
      },
      stroke: {
        colors: ['transparent'],
        show: true,
        width: 2
      },
      theme: {
        mode: theme.palette.mode
      },
      xaxis: {
        axisBorder: {
            color: theme.palette.divider,
            show: true
        },
        axisTicks: {
            color: theme.palette.divider,
            show: true
        },
        categories: daysInMonth,

     },
      yaxis: {
        labels: {
          formatter: (value) => {
            const formattedValue = parseFloat(value).toFixed(2);
            return formattedValue;
          },
          offsetX: -10,
          style: {
            colors: theme.palette.text.secondary
          }
        }
      }
    };
  };
  
  

// Отправка GET-запроса
async function fetchAeroflotData(origin,destination,departureDate) {

  console.log("fetchAeroflotData");

  const year = departureDate.getFullYear();
  const month = departureDate.getMonth() + 1; // Месяцы в JavaScript нумеруются с 0, поэтому добавляем 1
  const day = departureDate.getDate();
  // Форматируем дату в формат "yyyy-MM-dd"
  const departureDateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  const query = `?Origin=${origin}&Destination=${destination}&DepartureDate=${departureDateString}`
  const url = `http://${window.location.hostname}:5000/api/Aeroflot${query}`;

  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      // Обработка успешного ответа
      const data = response.data;
      return data;

    } else {
      console.error('Ошибка при выполнении GET-запроса:', response.statusText);
    }
  } catch (error) {
    // Обработка ошибок
    console.error('Ошибка при выполнении GET-запроса:', error);
  }
}


// Создаем массив данных для компонента OverviewAeroflotDays
interface ChartData {
  thisYear: any[],
  lastYear: any[],
};


  interface OverviewAeroflotDaysProps {
    sx: any;
  }
  
const OverviewAeroflotDays: React.FC<OverviewAeroflotDaysProps> = ({sx}) => {
    
    const [chartDataOrigion, setChartDataOrigion] = useState<ApexAxisChartSeries>(undefined);
    const [Origion, setOrigion] = useState("KJA");
    const chartOptionsOrigion = useChartOptions(chartDataOrigion);
    const [minValueOrigion, setMinimumValueOrigion] = useState(new Object as {
      amount: any,
      departureDate: any
    });


    const [chartDataDeparture, setChartDataDeparture] = useState<ApexAxisChartSeries>(undefined);
    const [Departure, setDeparture] = useState("MOW");
    const chartOptionsDeparture = useChartOptions(chartDataDeparture);
    const [minValueDeparture, setMinimumValueDeparture] = useState(new Object as {
      amount: any,
      departureDate: any
    });

    const [differenceInDays, setDifferenceInDays] = useState(0);


    const handleChangeDeparture = useCallback(
        (event) => {
            setDeparture((prevState) => (event.target.value));
        },
        []
    );

    const handleChangeOrigion = useCallback(
      (event) => {
        setOrigion((prevState) => (event.target.value));
      },
      []
  );

    const fetchAeroflotDataAsync = useCallback(async () => {

      // Вызываем две асинхронные функции одновременно
      const promiseOrigin = fetchAeroflotData(Origion, Departure, new Date());
      const promiseDeparture = fetchAeroflotData(Departure, Origion, new Date());

      // Ожидаем завершения обеих асинхронных функций
      const [resultOrigin, resultDeparture] = await Promise.all([promiseOrigin, promiseDeparture]);

      console.log("resultOrigin = ",resultOrigin,resultDeparture)
      //console.log("resultDeparture = ",resultDeparture)
      if(resultOrigin == undefined || resultDeparture == undefined)
      {
        return;
      }
      // Доступ к минимальным ценам и другим данным
      const minPrices = resultOrigin.data.minPrices;
      let chartData = [];

      // Пример обхода данных и разбивки их по годам (предполагая, что "This year" и "Last year" относятся к разным годам)
      minPrices.forEach((priceData) => {
        const year = new Date(priceData.departureDate).getFullYear();
        chartData.push(priceData.amount);
      });

      chartData = chartData.map(Number);

      setChartDataOrigion(chartData);

      let min = Math.min(...chartData);
      const selectedItems = minPrices.filter(item => Number(item.amount) === min);
      if(selectedItems.length > 0)
      {
        setMinimumValueOrigion({
          amount: Number(selectedItems[0].amount),
          departureDate: selectedItems[0].departureDate
        });
      }
      else
      {
        setMinimumValueOrigion(undefined);
      }

      /////////////////
      // Доступ к минимальным ценам и другим данным
      const minPricesDeparture = resultDeparture.data.minPrices;
      let chartDataDeparture = [];

      // Пример обхода данных и разбивки их по годам (предполагая, что "This year" и "Last year" относятся к разным годам)
      minPricesDeparture.forEach((priceData) => {
        const year = new Date(priceData.departureDate).getFullYear();
        chartDataDeparture.push(priceData.amount);
      });

      chartDataDeparture = chartDataDeparture.map(Number);

      setChartDataDeparture(chartDataDeparture);

      let minDeparture = Math.min(...chartDataDeparture);
      const selectedDeparture = minPricesDeparture.filter(item => Number(item.amount) === minDeparture);
      if(selectedDeparture.length > 0)
      {
        setMinimumValueDeparture({
          amount: Number(selectedDeparture[selectedDeparture.length-1].amount),
          departureDate: selectedDeparture[selectedDeparture.length-1].departureDate
        });
        
        const date1 = new Date(selectedItems[0].departureDate);
        const date2 = new Date(selectedDeparture[selectedDeparture.length-1].departureDate);
        
        setDifferenceInDays(daysBetweenDates(date1, date2));

      }
      else
      {
        setMinimumValueDeparture(undefined);
      }



    }, [Departure]);


    

  function daysBetweenDates(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // Количество миллисекунд в одном дне
    const timeDifference = Math.abs(date2.getTime() - date1.getTime()); // Разница в миллисекундах
    const daysDifference = Math.floor(timeDifference / oneDay); // Разница в днях
    return daysDifference;
  }

  /*useEffect(() => {
    console.log("Start useEffect");
    fetchAeroflotDataAsync();
  }, [fetchAeroflotDataAsync]);*/
      
    return (
        <Card sx={sx}>
        <CardHeader
          action={
            <Button
              color="inherit"
              size="small"
            >
              Sync
            </Button>
          }
          title="AeroflotDays"
        />
        <TextField
          fullWidth
          label="Select State"
          name="state"
          onChange={handleChangeOrigion}
          required
          select
          SelectProps={{ native: true }}
          value={Origion}
        >
          {states.filter(option => option.value !== Departure).map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Select State"
          name="state"
          onChange={handleChangeDeparture}
          required
          select
          SelectProps={{ native: true }}
          value={Departure}
        >
          {states.filter(option => option.value !== Origion).map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </TextField>
        <CardContent>

          {
            chartDataOrigion ? 
            <>
            {
              minValueOrigion ?
              <div>
                <CardHeader
                subheader={`Departure date: ${minValueOrigion.departureDate.toLocaleString()}`}
                title={`Cheapest ticket: ${minValueOrigion.amount.toLocaleString()}  руб.`}
               />
               <p>{differenceInDays}</p>
              </div>
              :
              null
            }

            <Chart
              height={350}
              options={chartOptionsOrigion}
              series={[{ data: chartDataOrigion }]}
              type="bar"
              width="100%"
              /> 

{
              minValueDeparture ?
              <div>
              <CardHeader
                subheader={`Departure date: ${minValueDeparture.departureDate.toLocaleString()}`}
                title={`Cheapest ticket: ${minValueDeparture.amount.toLocaleString()}  руб.`}
              />
              </div>
              :
              null
            }
              <Chart
              height={350}
              options={chartOptionsDeparture}
              series={[{ data: chartDataDeparture }]}
              type="bar"
              width="100%"
              /> 
            </>
            :
            <div>Loading...</div>
          }
         
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            color="inherit"
            size="small"
          >
            Overview
          </Button>
        </CardActions>
      </Card>
    );
  };
  
  export default OverviewAeroflotDays;
  