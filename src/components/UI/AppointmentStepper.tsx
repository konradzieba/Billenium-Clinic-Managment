import { Box, Stepper } from '@mantine/core';

type AppointmentStepperProps = {
  activeStep: number;
};

const AppointmentStepper = ({activeStep}: AppointmentStepperProps) => {
  return (
    <Box w='40vw' mb={'xl'}>
      <Stepper active={activeStep}>
        <Stepper.Step label="Krok 1" description="Wybierz lekarza" allowStepSelect={false}/>
        <Stepper.Step label="Krok 2" description="Wybór terminu" allowStepSelect={false}/>
        <Stepper.Step label="Krok 3" description="Podanie obiawów" allowStepSelect={false}/>
      </Stepper>
    </Box>
  );
};

export default AppointmentStepper;
