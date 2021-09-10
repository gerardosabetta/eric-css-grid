import React from 'react';
import styled from '@emotion/styled';

const ageRanges = ['birth', '1month', '2months', '3months', '6months'];
const vaccines = ['hepatitis', 'sida', 'covid'];

const Table = styled.div({
  display: 'grid',
  background: '#fafafa',
  gridTemplateColumns: `repeat(${ageRanges.length + 1}, 1fr)`
});

const VaccineName = styled.div(({ vaccineName }: any) => ({
  gridColumnStart: 1,
  padding: '8px'
}));

const Dose = styled.div(({ from, to, vaccineIndex }: any) => ({
  gridColumnStart: from,
  gridColumnEnd: to,
  gridRowStart: vaccineIndex,
  display: 'grid',
  margin: '0 8px',
  gridTemplateColumns: `repeat(${to - from}, 1fr)`,
  background: 'lightblue',
  opacity: 1,
  borderRadius: '5rem'
}));

const DoseName = styled.div({
  background: 'teal',
  opacity: 1,
  borderRadius: '5rem',
  display: 'grid',
  justifyContent: 'center',
  alignItems: 'center'
});

const applications = [
  {
    vaccine: 'hepatitis',
    dosis: [
      { name: 'first', from: '1month', to: '2months' },
      { name: 'second', from: '3months', to: '6months' }
    ]
  },
  {
    vaccine: 'covid',
    dosis: [
      { name: 'first', from: 'birth', to: '1month' },
      { name: 'second', from: '3months', to: '3months' }
    ]
  }
];

const getVaccineRow = (vaccine: string): number =>
  vaccines.findIndex((vac) => vac === vaccine);

const getAgeColumn = (age: string): number =>
  ageRanges.findIndex((ag) => ag === age);

const Vaccines = () => {
  return (
    <Table>
      <div>vaccine</div>

      {ageRanges.map((ageRange) => (
        <div>{ageRange}</div>
      ))}

      {vaccines.map((vaccine) => (
        <VaccineName>{vaccine}</VaccineName>
      ))}

      {applications.map((application) => {
        const vaccineIndex = getVaccineRow(application.vaccine) + 2; // +2 because findIndex is 0 indexed and we also dont want to overlap the header

        return application.dosis.map((dose) => {
          const from = getAgeColumn(dose.from) + 2; // +2 because findIndex is 0 indexed and we dont want to overlap the vaccine name
          const to = getAgeColumn(dose.to) + 3; // +3 because all of the above and we want this to end at the right track of the grid cell

          return (
            <Dose vaccineIndex={vaccineIndex} from={from} to={to}>
              <DoseName>
                {application.vaccine} {dose.name}
              </DoseName>
            </Dose>
          );
        });
      })}
    </Table>
  );
};

export default Vaccines;
