export const clearAppointmentData = () => {
  const patientId = sessionStorage.getItem('patientId');
  sessionStorage.removeItem(`appointmentDate${patientId}`);
  sessionStorage.removeItem(`appointmentTime${patientId}`);
  sessionStorage.removeItem(`meds${patientId}`);
  sessionStorage.removeItem(`symptoms${patientId}`);
};
