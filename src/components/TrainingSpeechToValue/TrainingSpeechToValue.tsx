// @ts-nocheck

import { Fragment } from 'preact';
import { useMemo, useState } from "preact/hooks";
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Button from '@mui/joy/Button';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';
import type { Difficult, Radix } from '@/model.ts';

type Props = {
  difficult: Difficult;
}

const range = (start: number, end: number, step: number) => {
  const ret: Array<number> = [];
  for (let i = start; i < end; i += step) {
    ret.push(i);
  }
  return ret;
}

const startByRadix: Record<Radix, number> = {
  N: 0,
  Nx: 10,
  Nxx: 100,
  NK: 1_000,
  NxK: 10_000,
  NxxK: 100_000,
};

const endByRadix: Record<Radix, number> = {
  N: 10,
  Nx: 100,
  Nxx: 1_000,
  NK: 10_000,
  NxK: 100_000,
  NxxK: 1_000_000,
};

const stepByRadix: Record<Radix, number> = {
  N: 1,
  Nx: 10,
  Nxx: 100,
  NK: 1_000,
  NxK: 10_000,
  NxxK: 100_000,
};

const getVariants = (difficult: Difficult) => {
  const radixes = Object.entries(difficult)
    .filter(([, enabled]) => enabled)
    .map(([radix]) => radix as Radix);
  const radixMin = radixes[0];
  const radixMax = radixes[radixes.length - 1];
  return range(
    startByRadix[radixMin],
    endByRadix[radixMax],
    stepByRadix[radixMin],
  );
}

function randomInteger(min: number, max: number): number {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const TrainingSpeechToValueImplementation = ({ difficult }: Props) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const variants = useMemo(() => getVariants(difficult), [difficult]);
  const getRandomVariant = () => variants[randomInteger(0, variants.length - 1)];
  const [answer, setAnswer] = useState(getRandomVariant);
  const handleNextClick = () => {
    setShowAnswer(false);
    setAnswer(getRandomVariant());
  };
  const handleViewClick = () => setShowAnswer(true);
  const handlePlay = () => (new Audio(`/audio/${answer}.wav`)).play();

  return (
    <Card variant="outlined">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography fontSize="3rem">
          {showAnswer ? (
            answer
          ) : (
            <Skeleton>
              000
            </Skeleton>
          )}
        </Typography>
      </Box>
      <CardActions buttonFlex="1">
        <Button variant="outlined" onClick={handleViewClick}>
          View
        </Button>
        <Button onClick={handlePlay}>
          Play
        </Button>
        <IconButton variant="outlined" color="neutral" onClick={handleNextClick}>
          <SkipNextIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export const TrainingSpeechToValue = (props: Props) => {
  return (
    <Fragment key={JSON.stringify(props.difficult)}>
      <TrainingSpeechToValueImplementation {...props} />
    </Fragment>
  )
}

