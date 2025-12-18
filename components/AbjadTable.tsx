
import React from 'react';

const abjadData = [
    { char: 'ا', value: 1 }, { char: 'ب', value: 2 }, { char: 'ج', value: 3 }, { char: 'د', value: 4 },
    { char: 'ه', value: 5 }, { char: 'و', value: 6 }, { char: 'ز', value: 7 }, { char: 'ح', value: 8 },
    { char: 'ط', value: 9 }, { char: 'ی', value: 10 }, { char: 'ک', value: 20 }, { char: 'ل', value: 30 },
    { char: 'م', value: 40 }, { char: 'ن', value: 50 }, { char: 'س', value: 60 }, { char: 'ع', value: 70 },
    { char: 'ف', value: 80 }, { char: 'ص', value: 90 }, { char: 'ق', value: 100 }, { char: 'ر', value: 200 },
    { char: 'ش', value: 300 }, { char: 'ت', value: 400 }, { char: 'ث', value: 500 }, { char: 'خ', value: 600 },
    { char: 'ذ', value: 700 }, { char: 'ض', value: 800 }, { char: 'ظ', value: 900 }, { char: 'غ', value: 1000 }
];

const persianEquivalents = [
    { char: 'پ', value: 2, equivalent: 'ب' },
    { char: 'چ', value: 3, equivalent: 'ج' },
    { char: 'ژ', value: 7, equivalent: 'ز' },
    { char: 'گ', value: 20, equivalent: 'ک' },
];

const AbjadTable: React.FC = () => {
  return (
    <div className="mt-6 p-6 bg-black/40 rounded-lg border border-slate-800">
      <h5 className="text-xl font-bold text-center mb-4 text-white font-lalezar tracking-wide">جدول ابجد کبیر</h5>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 text-center">
        {abjadData.map(item => (
          <div key={item.char} className="p-2 bg-slate-900/60 rounded-md">
            <div className="text-2xl font-semibold text-indigo-300">{item.char}</div>
            <div className="text-sm text-gray-300">{item.value}</div>
          </div>
        ))}
      </div>
      <h6 className="text-lg font-bold text-center mt-8 mb-4 text-white font-lalezar tracking-wide">معادل حروف فارسی</h6>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center max-w-md mx-auto">
        {persianEquivalents.map(item => (
          <div key={item.char} className="p-2 bg-slate-900/60 rounded-md">
            <div className="text-2xl font-semibold text-teal-300">{item.char}</div>
            <div className="text-sm text-gray-300">({item.equivalent}) {item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AbjadTable;
