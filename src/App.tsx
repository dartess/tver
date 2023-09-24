import { useMemo, useState } from 'preact/hooks';
import { SelectDifficult } from '@/components/SelectDifficult/SelectDifficult.tsx';
import { TrainingSpeechToValue } from '@/components/TrainingSpeechToValue/TrainingSpeechToValue.tsx';

const isIn = (value: number, range: [number, number]) => {
  return value >= range[0] && value < range[1];
}

const parseDifficult = (rawDifficult: [number, number]) => {
  return {
    'N': isIn(0, rawDifficult),
    'Nx': isIn(1, rawDifficult),
    'Nxx': isIn(2, rawDifficult),
    'NK': isIn(3, rawDifficult),
    'NxK': isIn(4, rawDifficult),
    'NxxK': isIn(5, rawDifficult),
  };
}

export function App() {
  const [rawDifficult, setRawDifficult] = useState<[number, number]>([0, 1]);
  const difficult = useMemo(() => parseDifficult(rawDifficult), rawDifficult);

  return (
    <>
      <SelectDifficult
        difficult={rawDifficult}
        setDifficult={setRawDifficult}
      />
      <TrainingSpeechToValue difficult={difficult} />
    </>
  )
}
