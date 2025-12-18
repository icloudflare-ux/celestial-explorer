
import React from 'react';
import Card from './common/Card';
import { traditionalTexts } from '../data/traditionalTexts';

const TraditionalSources: React.FC = () => {
  return (
    <section id="traditional-sources">
      <h3 className="text-4xl md:text-5xl font-bold text-center mb-12 font-lalezar tracking-wider bg-gradient-to-r from-yellow-400 to-amber-600 text-transparent bg-clip-text">
        {traditionalTexts.title}
      </h3>
      <Card>
        <div className="prose prose-lg prose-invert max-w-none text-gray-300 prose-p:my-4 prose-headings:text-amber-400 leading-relaxed font-tanha prose-headings:font-lalezar prose-headings:tracking-wider prose-headings:text-2xl">
          {traditionalTexts.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <h4 className="!text-amber-300 mt-8">{traditionalTexts.guidelines.title}</h4>
          <ul className="list-disc list-inside space-y-2">
            {traditionalTexts.guidelines.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          
          <h4 className="!text-amber-300 mt-8">{traditionalTexts.practicalTips.title}</h4>
          <ul className="space-y-4">
            {traditionalTexts.practicalTips.tips.map((tip, i) => (
              <li key={i} className="border-r-4 border-amber-500/50 pr-4 py-1">
                <strong className="font-semibold text-white">{tip.planet}:</strong> {tip.recommendation}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </section>
  );
};

export default TraditionalSources;
