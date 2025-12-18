/**
 * Generates a 3x3 magic square (وفق مثلث).
 * The magic constant will be the baseNumber.
 */
export function generateMusallas(baseNumber: number): number[][] | null {
    if ((baseNumber - 30) % 3 !== 0) {
        return null; // Not divisible, can't form this type of square
    }
    const kasr = (baseNumber - 30) / 3;
    const miftah = kasr + 1; // The starting number (key)
    
    const square: number[][] = Array(3).fill(0).map(() => Array(3).fill(0));

    // Standard filling order for a 3x3 magic square (Buduh pattern)
    square[0][0] = miftah + 7; // ח
    square[0][1] = miftah + 1; // ב
    square[0][2] = miftah + 3; // ד

    square[1][0] = miftah + 2; // ג
    square[1][1] = miftah + 5; // ו
    square[1][2] = miftah + 8; // ט
    
    square[2][0] = miftah + 6; // ז
    square[2][1] = miftah + 9; // י
    square[2][2] = miftah + 4; // ה

    return square;
}

/**
 * Generates a 4x4 magic square (وفق مربع).
 */
export function generateMurabba(baseNumber: number): number[][] | null {
    if ((baseNumber - 130) % 4 !== 0) {
        return null;
    }
    const miftah = ((baseNumber - 130) / 4) + 1;
    const s: number[][] = Array(4).fill(0).map(() => Array(4).fill(0));
    
    let i = 0;
    s[0][0] = miftah + i++; s[0][1] = miftah + i++; s[0][2] = miftah + i++; s[0][3] = miftah + i++;
    s[1][0] = miftah + i++; s[1][1] = miftah + i++; s[1][2] = miftah + i++; s[1][3] = miftah + i++;
    s[2][0] = miftah + i++; s[2][1] = miftah + i++; s[2][2] = miftah + i++; s[2][3] = miftah + i++;
    s[3][0] = miftah + i++; s[3][1] = miftah + i++; s[3][2] = miftah + i++; s[3][3] = miftah + i++;

    return [
        [s[3][0], s[2][3], s[1][3], s[0][0]],
        [s[1][2], s[0][1], s[3][1], s[2][2]],
        [s[0][3], s[1][0], s[2][0], s[3][3]],
        [s[2][1], s[3][2], s[0][2], s[1][1]],
    ];
}


/**
 * Generates a 5x5 magic square (وفق مخمس) using the Siamese method.
 */
export function generateMukhammas(baseNumber: number): number[][] | null {
    if ((baseNumber - 325) % 5 !== 0) {
        return null;
    }
    const miftah = ((baseNumber - 325) / 5) + 1;
    const n = 5;
    const square: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));

    let row = 0;
    let col = Math.floor(n / 2);

    for (let i = 0; i < n * n; i++) {
        square[row][col] = miftah + i;
        let nextRow = (row - 1 + n) % n;
        let nextCol = (col + 1) % n;
        if (square[nextRow][nextCol] !== 0) {
            row = (row + 1) % n;
        } else {
            row = nextRow;
            col = nextCol;
        }
    }
    return square;
}

export interface VerificationResult {
    isValid: boolean;
    magicConstant: number | null;
    mismatches: string[];
}

/**
 * Verifies if a 2D array is a magic square.
 */
export function verifyOfagh(square: (number | null)[][]): VerificationResult {
    const n = square.length;
    if (n === 0 || square.some(row => row.length !== n || row.some(cell => cell === null || isNaN(cell)))) {
        return { isValid: false, magicConstant: null, mismatches: ['جدول ناقص یا شامل مقادیر نامعتبر است.'] };
    }

    const numSquare = square as number[][];
    const mismatches: string[] = [];

    const magicConstant = numSquare[0].reduce((sum, val) => sum + val, 0);

    for (let i = 0; i < n; i++) {
        const rowSum = numSquare[i].reduce((sum, val) => sum + val, 0);
        if (rowSum !== magicConstant) {
            mismatches.push(`مجموع سطر ${i + 1} (${rowSum}) با مجموع هدف (${magicConstant}) برابر نیست.`);
        }
    }

    for (let j = 0; j < n; j++) {
        let colSum = 0;
        for (let i = 0; i < n; i++) {
            colSum += numSquare[i][j];
        }
        if (colSum !== magicConstant) {
            mismatches.push(`مجموع ستون ${j + 1} (${colSum}) با مجموع هدف (${magicConstant}) برابر نیست.`);
        }
    }

    let diag1Sum = 0;
    for (let i = 0; i < n; i++) {
        diag1Sum += numSquare[i][i];
    }
    if (diag1Sum !== magicConstant) {
        mismatches.push(`مجموع قطر اصلی (${diag1Sum}) با مجموع هدف (${magicConstant}) برابر نیست.`);
    }

    let diag2Sum = 0;
    for (let i = 0; i < n; i++) {
        diag2Sum += numSquare[i][n - 1 - i];
    }
    if (diag2Sum !== magicConstant) {
        mismatches.push(`مجموع قطر فرعی (${diag2Sum}) با مجموع هدف (${magicConstant}) برابر نیست.`);
    }

    return {
        isValid: mismatches.length === 0,
        magicConstant,
        mismatches,
    };
}