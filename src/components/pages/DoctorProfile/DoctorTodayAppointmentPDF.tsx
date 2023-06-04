import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import dayjs from 'dayjs';

import StudentMedFullLogo from '../../../assets/StudentMedFullLogo.png';
import { AppointmentResponseType } from '../../../helpers/types';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
});

const styles = StyleSheet.create({
  body: {
    fontSize: 14,
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: 'Roboto',
  },
  titleText: {
    borderLeft: '2px solid #fd7e14',
    paddingLeft: 5,
    marginBottom: 10,
  },
  tilteFirstText: {
    marginTop: 30,
    borderLeft: '2px solid #fd7e14',
    paddingLeft: 5,
    marginBottom: 10,
  },
  table: {
    marginTop: 30,
    width: 'auto',
    borderStyle: 'solid',
    textAlign: 'center',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableRowHeader: {
    margin: 'auto',
    flexDirection: 'row',
    backgroundColor: '#eaeaea',
    color: '#fd7e14',
    fontSize: 12,
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    margin: 5,
  },
  generatedAtText: {
    fontSize: 8,
  }
});

type DoctorTodayAppointmentPDFProps = {
  visits: AppointmentResponseType[] | undefined;
};

const DoctorTodayAppointmentPDF = ({
  visits,
}: DoctorTodayAppointmentPDFProps) => {
  const todaysDateShort = dayjs(new Date()).format('D MMMM').toString();
  const todaysDateLong = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss') 
  console.log(visits);
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Image src={StudentMedFullLogo} />
        <Text
          style={styles.tilteFirstText}
        >{`Wizyty na dzień, ${todaysDateShort}`}</Text>
        <Text
          style={styles.titleText}
        >{`Lekarz: dok. ${visits?.[0].doctorName}`}</Text>
        <Text
          style={styles.titleText}
        >{`Wizyt na dziś: ${visits?.length}`}</Text>
        <View style={styles.table}>
          <View style={styles.tableRowHeader}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Godzina</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Pacjent</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Stosowane leki</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Objawy</Text>
            </View>
          </View>
          {visits?.map((visit, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{visit.appointmentDate.split(' ')[1]}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{visit.patientName}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{visit.medicinesTaken}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{visit.patientSymptoms}</Text>
              </View>
            </View>
          ))}
        </View>
        <Text style={styles.generatedAtText}>{`Wygenerowano: ${todaysDateLong}`}</Text>
      </Page>
    </Document>
  );
};

export default DoctorTodayAppointmentPDF;
