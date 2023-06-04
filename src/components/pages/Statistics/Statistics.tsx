import { Flex, Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ChartType, ClinicStats, DoctorsStats } from '../../../helpers/types';
import { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { useLocation } from 'react-router-dom';



// const data = [
//   {
//     "id": "java",
//     "label": "java",
//     "value": 15,
//     "color": "hsl(126, 70%, 50%)"
//   },
//   {
//     "id": "hack",
//     "label": "hack",
//     "value": 350,
//     "color": "hsl(130, 70%, 50%)"
//   },
//   {
//     "id": "lisp",
//     "label": "lisp",
//     "value": 8,
//     "color": "hsl(36, 70%, 50%)"
//   },
//   {
//     "id": "elixir",
//     "label": "elixir",
//     "value": 70,
//     "color": "hsl(343, 70%, 50%)"
//   },
//   {
//     "id": "haskell",
//     "label": "haskell",
//     "value": 50,
//     "color": "hsl(350, 70%, 50%)"
//   }
// ]

const fetchStats = async () => {
  const response = await axios.get("http://localhost:8080/api/appointments/clinic-stats")
  return response.data as ClinicStats
}

const Statistics = () => {
  const [docStat, setDocStat] = useState<DoctorsStats>();
  const [stats, setStats] = useState<ChartType[]>([]);
  const { pathname } = useLocation();
  const doctorId = pathname.split('/')[2];

  const { isLoading } = useQuery(["stats", doctorId], fetchStats, {
    onSuccess: (data) => {
      if (data && data.doctorsStats) {
        const docItem = data.doctorsStats.find(
          (doc) => doc.doctorId.toString() === doctorId
        );
        if (typeof docItem !== "undefined") {
          setDocStat(docItem);
        }
      }
    },
  });

  useEffect(() => {
    if (typeof docStat !== 'undefined') {
      const newApp: ChartType = {
        id: "Nowe",
        label: "Nowe",
        value: docStat.doctorAppointmentsStats.numberOfNew,
        color: "hsl(350, 70%, 50%)",
      };
      const approvedApp: ChartType = {
        id: "Potwierdzone",
        label: "Potwierdzone",
        value: docStat.doctorAppointmentsStats.numberOfApproved,
        color: "hsl(350, 70%, 50%)",
      };
      const doneApp: ChartType = {
        id: "Zakończone",
        label: "Zakończone",
        value: docStat.doctorAppointmentsStats.numberOfDone,
        color: "hsl(350, 70%, 50%)",
      };
      const cancelApp: ChartType = {
        id: "Anulowane",
        label: "Anulowane",
        value: docStat.doctorAppointmentsStats.numberOfCanceled,
        color: "hsl(350, 70%, 50%)",
      };
      const rescheduledApp: ChartType = {
        id: "Przełożone",
        label: "Przełożone",
        value: docStat.doctorAppointmentsStats.numberOfRescheduled,
        color: "hsl(350, 70%, 50%)",
      };
      setStats([])
      setStats((prevState) => [
        ...prevState,
        newApp,
        approvedApp,
        doneApp,
        cancelApp,
        rescheduledApp,
      ]);
    }
  }, [docStat]);

  console.log(stats);
  return(
    <Flex
      h='200px'
      w='340px'
      justify='center'
    >
      {isLoading ? (<Loader/>) : (
        <ResponsivePie
          data={stats}
          margin={{right: 80, left: 100 }}
          innerRadius={0.5}
          padAngle={4}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: 'color',
            modifiers: [
              [
                'darker',
                0.2
              ]
            ]
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsDiagonalLength={5}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: 'color',
            modifiers: [
              [
                'darker',
                2
              ]
            ]
          }}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              size: 4,
              padding: 1,
              stagger: true
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              rotation: -45,
              lineWidth: 5,
              spacing: 10
            }
          ]}
          fill={[
            {
              match: {
                id: 'ruby'
              },
              id: 'dots'
            },
            {
              match: {
                id: 'c'
              },
              id: 'dots'
            },
            {
              match: {
                id: 'go'
              },
              id: 'dots'
            },
            {
              match: {
                id: 'python'
              },
              id: 'dots'
            },
            {
              match: {
                id: 'scala'
              },
              id: 'lines'
            },
            {
              match: {
                id: 'lisp'
              },
              id: 'lines'
            },
            {
              match: {
                id: 'elixir'
              },
              id: 'lines'
            },
            {
              match: {
                id: 'javascript'
              },
              id: 'lines'
            }
          ]}
        />
      )}


    </Flex>
  )
}

export default Statistics