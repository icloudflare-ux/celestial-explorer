
import React from 'react';

interface FormattedReadingProps {
  text: string;
}

const renderBold = (line: string) => {
  const parts = line.split('**');
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-semibold text-cyan-400">
        {part}
      </strong>
    ) : (
      part
    )
  );
};

const FormattedReading: React.FC<FormattedReadingProps> = ({ text }) => {
  return (
    <div className="prose prose-lg prose-invert max-w-none font-tanha leading-loose space-y-4">
      {text.split('\n').filter(p => p.trim() !== '').map((p, i) => {
        if (p.startsWith('@@EPIC@@')) {
          const content = p.replace('@@EPIC@@', '');
          return (
            <p key={i} className="text-center !text-2xl !my-10 font-bold !text-indigo-300 tracking-wide !leading-loose">
              {renderBold(content)}
            </p>
          );
        }
        if (p.startsWith('@@FINAL@@')) {
          const content = p.replace('@@FINAL@@', '');
          return (
            <p key={i}>
              {renderBold(content)}
            </p>
          );
        }
        return (
          <p key={i}>
            {renderBold(p)}
          </p>
        );
      })}
    </div>
  );
};

export default FormattedReading;
