export type Radix =
  | 'N'
  | 'Nx'
  | 'Nxx'
  | 'NK'
  | 'NxK'
  | 'NxxK'

export type Difficult = Record<Radix, boolean>


const range = (start: number, end: number, step = 1) => {
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

const allVariants = [
  getVariants({
    N: true,
    Nx: true,
    Nxx: true,
    NK: false,
    NxK: false,
    NxxK: false
  }),
  getVariants({
    N: false,
    Nx: true,
    Nxx: true,
    NK: true,
    NxK: false,
    NxxK: false
  }),
  getVariants({
    N: false,
    Nx: false,
    Nxx: true,
    NK: true,
    NxK: true,
    NxxK: false
  }),
  getVariants({
    N: false,
    Nx: false,
    Nxx: false,
    NK: true,
    NxK: true,
    NxxK: true
  }),
].flat();
const uniqueVariants = [...new Set(allVariants)].sort((a, b) => a - b);

require('fs').writeFileSync('./res.txt', uniqueVariants.join('\n---\n'), { encoding: 'utf-8' });
