export const getJalaliInfo = (date: Date) => {
    try {
        const monthYear = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
            year: 'numeric',
            month: 'long',
        }).format(date);
        const day = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
            day: 'numeric',
        }).format(date);
        return { monthYear, day };
    } catch (e) {
        console.error("Jalali conversion failed", e);
        return { monthYear: "Error", day: "!" };
    }
};

export const getGregorianInfo = (date: Date) => {
    try {
        const monthYear = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
        }).format(date);
        const day = new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
        }).format(date);
        return { monthYear, day };
    } catch (e) {
        console.error("Gregorian conversion failed", e);
        return { monthYear: "Error", day: "!" };
    }
};

export const getIslamicInfo = (date: Date) => {
    try {
        // Using fa-IR locale to get Persian script for month names
        const monthYear = new Intl.DateTimeFormat('fa-IR-u-ca-islamic', {
            year: 'numeric',
            month: 'long',
        }).format(date);
        const day = new Intl.DateTimeFormat('fa-IR-u-ca-islamic', {
            day: 'numeric',
        }).format(date);
        return { monthYear, day };
    } catch (e) {
        // Fallback for environments that might not support islamic calendar
        console.error("Islamic conversion failed, falling back.", e);
         try {
            const fallback = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
            const parts = fallback.split(' ');
            return { monthYear: `${parts[1]} ${parts[2]}`, day: parts[0] };
         } catch (e2) {
            console.error("Islamic conversion fallback failed", e2);
            return { monthYear: "Error", day: "!" };
         }
    }
};

export const parseFlexibleDate = (dateStr: string): { day: string; month: string; year: string } | null => {
    if (!dateStr) return null;
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;

    const [p1, p2, p3] = parts.map(p => p.trim());

    const isYear = (s: string) => /^(13|14)\d{2}$/.test(s);

    if (isYear(p1)) { // YYYY/MM/DD
        return { year: p1, month: p2, day: p3 };
    }
    if (isYear(p3)) { // DD/MM/YYYY
        return { year: p3, month: p2, day: p1 };
    }
    
    return null; // Could not determine format
};
