export default async function getDentists() {
  const response = await fetch(`https://presentation-day-1-khon-pit-mongodb-liard.vercel.app/api/v1/dentists`);
  if (!response.ok) {
    throw new Error('Failed to fetch dentists');
  }
  const dentistsjson: DentistJson = await response.json();
  return dentistsjson;
}
