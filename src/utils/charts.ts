export const range = (n: number) => Array.from({ length: n }, (_, k) => k + 1);
export const chartLabels = () => {
    const ams = range(11).map((n) => `${n} AM`);
    const pms = range(11).map((n) => `${n} PM`);
    return ['12 AM', ...ams, '12 PM', ...pms];
};
export const emptyData = () => Array.from({ length: 24 }).fill(0) as number[];
export const chartOptions = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

export const findCount = (numbers: number[] | undefined): number =>
    numbers === undefined ? 0 : numbers.length;
export const findTotal = (numbers: number[] | undefined): number => {
    if (numbers === undefined) {
        return 0;
    }
    return numbers.reduce((acc: number, val) => (acc += val), 0);
};
export const findMedian = (numbers: number[] | undefined): number => {
    if (numbers === undefined) {
        return 0;
    }
    numbers.sort((a, b) => a - b);
    const length = numbers.length;
    return length % 2 ? numbers[(length - 1) / 2] : (numbers[length / 2 - 1] + numbers[length / 2]) / 2;
};
export const findRange = (numbers: number[] | undefined): number => {
    if (numbers === undefined) {
        return 0;
    }
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    return max - min;
};
