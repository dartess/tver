// @ts-nocheck

import Slider from '@mui/joy/Slider';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Button from '@mui/joy/Button';

import styles from './SelectDifficult.module.css';

const VALUE_MIN = 0;
const VALUE_MAX = 6;
const DISTANCE_MIN = 1;
const DISTANCE_MAX = 3

const values = [
  'N',
  'Nx',
  'Nxx',
  'NK',
  'NxK',
  'NxxK',
]

type Props = {
  difficult: [number, number];
  setDifficult: (difficult: [number, number]) => void;
}

export const SelectDifficult = ({ difficult, setDifficult }: Props) => {
  const handleChangeSlider = (
    _: unknown,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    const newValuesDiff = newValue[1] - newValue[0];

    if (newValuesDiff < DISTANCE_MIN) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], VALUE_MAX - DISTANCE_MIN);
        setDifficult([clamped, clamped + DISTANCE_MIN]);
      } else {
        const clamped = Math.max(newValue[1], DISTANCE_MIN);
        setDifficult([clamped - DISTANCE_MIN, clamped]);
      }
      return;
    }

    if (newValuesDiff > DISTANCE_MAX) {
      if (activeThumb === 0) {
        setDifficult([newValue[0], newValue[0] + DISTANCE_MAX]);
      } else {
        setDifficult([newValue[1] - DISTANCE_MAX, newValue[1]]);
      }
      return;
    }

    setDifficult(newValue as [number, number]);
  };

  const handleClickButton = (value: number) => {
    setDifficult([value, value + 1])
  }

  return (
    <div class={styles.root}>
      <Slider
        min={VALUE_MIN}
        max={VALUE_MAX}
        getAriaLabel={() => 'Setup difference'}
        value={difficult}
        onChange={handleChangeSlider}
        disableSwap
        size="lg"
      />
      <ButtonGroup buttonFlex={1} size="sm">
        {values.map((value, index) => (
          <Button variant="plain" onClick={() => handleClickButton(index)}>{value}</Button>
        ))}
      </ButtonGroup>
    </div>
  )
}
