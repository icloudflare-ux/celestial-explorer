// A figure is an array of 4 bits (1 for odd/one dot, 0 for even/two dots)
export type RamalFigureShape = [number, number, number, number];

export interface RamalFigureInfo {
    name: string;
    translationKey: string;
    element: 'آتش' | 'هوا' | 'آب' | 'خاک';
    quality: 'سعد' | 'نحس' | 'ممتزج';
}

export const ramalFiguresData: { [key: string]: RamalFigureInfo } = {
    '1111': { name: 'طریق', translationKey: 'ramal_figure_via', element: 'خاک', quality: 'نحس' },
    '0000': { name: 'جماعت', translationKey: 'ramal_figure_populus', element: 'آب', quality: 'نحس' },
    '1001': { name: 'فرح', translationKey: 'ramal_figure_laetitia', element: 'هوا', quality: 'سعد' },
    '0110': { name: 'عقله', translationKey: 'ramal_figure_tristitia', element: 'خاک', quality: 'نحس' },
    '1011': { name: 'صبی', translationKey: 'ramal_figure_puer', element: 'آتش', quality: 'نحس' },
    '0100': { name: 'جاریه', translationKey: 'ramal_figure_puella', element: 'آب', quality: 'سعد' },
    '0010': { name: 'حمره', translationKey: 'ramal_figure_rubeus', element: 'آتش', quality: 'نحس' },
    '1101': { name: 'بیاض', translationKey: 'ramal_figure_albus', element: 'هوا', quality: 'سعد' },
    '0011': { name: 'نصرة الخارج', translationKey: 'ramal_figure_fortuna_major', element: 'خاک', quality: 'سعد' },
    '1100': { name: 'نصرة الداخل', translationKey: 'ramal_figure_fortuna_minor', element: 'آتش', quality: 'سعد' },
    '0101': { name: 'قبض الداخل', translationKey: 'ramal_figure_acquisitio', element: 'هوا', quality: 'سعد' },
    '1010': { name: 'قبض الخارج', translationKey: 'ramal_figure_amissio', element: 'خاک', quality: 'نحس' },
    '1000': { name: 'اجتماع', translationKey: 'ramal_figure_conjunctio', element: 'آب', quality: 'ممتزج' },
    '0111': { name: 'انكیس', translationKey: 'ramal_figure_carcer', element: 'خاک', quality: 'نحس' },
    '1110': { name: 'رأس', translationKey: 'ramal_figure_caput_draconis', element: 'آتش', quality: 'سعد' },
    '0001': { name: 'ذنب', translationKey: 'ramal_figure_cauda_draconis', element: 'آب', quality: 'نحس' },
};

export const getFigureInfo = (figure: RamalFigureShape): RamalFigureInfo => {
    const key = figure.join('');
    return ramalFiguresData[key] || { name: 'نامشخص', translationKey: 'unknown', element: 'خاک', quality: 'ممتزج' };
};

// Function to generate a single random figure
const generateRandomFigure = (): RamalFigureShape => {
    return [
        Math.round(Math.random()),
        Math.round(Math.random()),
        Math.round(Math.random()),
        Math.round(Math.random()),
    ] as RamalFigureShape;
};

// XOR operation for combining figures
const combineFigures = (fig1: RamalFigureShape, fig2: RamalFigureShape): RamalFigureShape => {
    return [
        (fig1[0] + fig2[0]) % 2,
        (fig1[1] + fig2[1]) % 2,
        (fig1[2] + fig2[2]) % 2,
        (fig1[3] + fig2[3]) % 2,
    ] as RamalFigureShape;
};

export const generateRamalChart = (): RamalFigureShape[] => {
    const chart: RamalFigureShape[] = [];

    // 1-4: Mothers (امهات) - Randomly generated
    for (let i = 0; i < 4; i++) {
        chart.push(generateRandomFigure());
    }

    // 5-8: Daughters (بنات) - Transposed from Mothers
    for (let row = 0; row < 4; row++) {
        chart.push([chart[0][row], chart[1][row], chart[2][row], chart[3][row]] as RamalFigureShape);
    }

    // 9-12: Nieces/Nephews (حفيدات)
    chart.push(combineFigures(chart[0], chart[1])); // 9
    chart.push(combineFigures(chart[2], chart[3])); // 10
    chart.push(combineFigures(chart[4], chart[5])); // 11
    chart.push(combineFigures(chart[6], chart[7])); // 12

    // 13-14: Witnesses (شاهدین)
    chart.push(combineFigures(chart[8], chart[9]));   // 13
    chart.push(combineFigures(chart[10], chart[11])); // 14

    // 15: Judge (قاضی)
    chart.push(combineFigures(chart[12], chart[13])); // 15

    // 16: Outcome (عاقبت)
    chart.push(combineFigures(chart[14], chart[0]));  // 16
    
    return chart;
};
