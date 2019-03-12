import Chart from 'chart.js';

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
    return length % 2
        ? numbers[(length - 1) / 2]
        : (numbers[length / 2 - 1] + numbers[length / 2]) / 2;
};
export const findRange = (numbers: number[] | undefined): number => {
    if (numbers === undefined) {
        return 0;
    }
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    return max - min;
};
const rgba = (nums: number[], solid: boolean = true) => {
    return `rgba(${nums[0]}, ${nums[1]}, ${nums[2]}, ${solid ? 1 : 0.2})`;
};
export const chartColors = (gildings: boolean = false) => {
    const colors = [
        [204, 0, 153],
        [51, 102, 204],
        [0, 255, 153],
        [245, 124, 0],
    ];
    const colorsGild = [[155, 155, 155], [247, 228, 56], [0, 188, 248]];
    return (gildings ? colorsGild : colors).map((color) => ({
        background: rgba(color, false),
        border: rgba(color),
    }));
};
export const chartDataset = (labels: string[], gildings: boolean = false) => {
    const colors = chartColors(gildings);
    const datasets = labels.map((label, index) => ({
        label,
        data: [],
        backgroundColor: colors[index].background,
        borderColor: colors[index].border,
        borderWidth: 1,
    }));
    return {
        labels: chartLabels(),
        datasets,
    };
};
export const chartConfig = (labels: string[], gildings: boolean = false) => ({
    type: 'line',
    data: chartDataset(labels, gildings),
    options: chartOptions,
});

export const chartMixin = {
    methods: {
        updateChart(chart: Chart, index: number, dataset: any) {
            chart!.data!.datasets![index].data = dataset;
            chart.update();
        },
    },
};
