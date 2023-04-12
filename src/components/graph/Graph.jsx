import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import SelectButton from './SelectButton'

const Graph = () => {


  const params = useParams()

  const [historicalData, setHistoricalData] = useState(null)

  const historicalChart = (id, days = 365) =>
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;

  const [days, setDays] = useState(1)

  const fetchHistoricalData = async () => {
    try {
      const { data } = await axios.get(historicalChart(params.coinID, days))
      setHistoricalData(data.prices)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    fetchHistoricalData()
  }, [days])

 

  const chartDays = [
    {
      label: '24 Hours',
      value: 1,
    },
    {
      label: '30 Days',
      value: 30,
    },
    {
      label: '3 Month',
      value: 90,
    },
    {
      label: '1 Year',
      value: 365,
    },
  ]


  return (
    <div style={{ height: '30vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 15 }}>

      {
        !historicalData ? (
          <CircularProgress
            style={{ color: 'gold' }}
            size={250}
            thickness={1}
          />
        ) : (<>
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0])
                let time = date.getHours() > 12
                  ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`

                return days === 1 ? time : date.toLocaleString()

              }),
              datasets: [{
                data: historicalData.map((coin) => coin[1]),
                label: `Price (Past ${days} Days) in USD`,
                borderColor: '#DAA400',
              },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                }
              }
            }}
          />

          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            with: '100%',
          }}>
            {chartDays.map(day => (
              <SelectButton
                key={day.value}
                onClick={() => setDays(day.value)}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
          </div>


        </>


        )
      }

    </div>


  )
}







export default Graph