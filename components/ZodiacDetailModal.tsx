
import React, { useEffect, useState } from 'react';
import Card from './common/Card';
import Spinner from './common/Spinner';
import { generateZodiacSignDetails } from '../services/geminiService';

// Define types for sign data and details
interface ZodiacSign {
  traditional: string;
  modern: string;
  planet: string;
  element: string;
  color: string;
  svgPath: string;
  iconColor: string;
}

interface ZodiacDetails {
  generalAnalysis: string;
  strengths: { title: string; description: string; }[];
  weaknesses: { title: string; description: string; }[];
  career: string;
  relationships: string;
  recommendations: {
    men: string;
    women: string;
  };
}

interface ZodiacDetailModalProps {
  sign: ZodiacSign;
  onClose: () => void;
}

const ZodiacDetailModal: React.FC<ZodiacDetailModalProps> = ({ sign, onClose }) => {
  const [details, setDetails] = useState<ZodiacDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    const fetchDetails = async () => {
      setIsLoading(true);
      const result = await generateZodiacSignDetails(sign);
      setDetails(result);
      setIsLoading(false);
    };

    fetchDetails();

    // Cleanup function to re-enable scroll
    return () => {
        document.body.style.overflow = 'auto';
    };
  }, [sign]);

  // Handle click on backdrop to close modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
      style={{ animationDuration: '300ms' }}
    >
      <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto relative !border-indigo-500/50">
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors z-10"
          aria-label="بستن"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
                <Spinner />
                <p className="mt-4 text-lg text-gray-300">در حال دریافت تحلیل آسمانی...</p>
            </div>
          </div>
        ) : !details ? (
          <div className="text-center text-red-400 min-h-[400px] flex items-center justify-center p-8">
            <p className="text-lg">متاسفانه دریافت اطلاعات با خطا مواجه شد. لطفاً پنجره را بسته و دوباره تلاش کنید.</p>
          </div>
        ) : (
          <div className="text-right">
            {/* Header */}
            <div className="flex items-center mb-8 border-b border-slate-700/50 pb-6">
                <svg className={`w-20 h-20 ml-6 flex-shrink-0 ${sign.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 12 12" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={sign.svgPath} />
                </svg>
                <div>
                    <h3 className={`text-5xl font-lalezar ${sign.iconColor}`}>{sign.traditional}</h3>
                    <p className="text-2xl text-gray-400 font-tanha">({sign.modern})</p>
                </div>
            </div>
            
            {/* Details sections */}
            <div className="space-y-8 font-tanha">
              <section>
                <h4 className="text-2xl font-lalezar text-indigo-300 mb-3 border-b-2 border-indigo-500/30 pb-2 inline-block">🔭 تحلیل شخصیت کلی</h4>
                <p className="text-gray-300 leading-loose text-lg">{details.generalAnalysis}</p>
              </section>

              <div className="grid md:grid-cols-2 gap-8">
                <section>
                  <h4 className="text-2xl font-lalezar text-green-400 mb-4 border-b-2 border-green-500/30 pb-2 inline-block">✨ نقاط قوت</h4>
                  <ul className="space-y-4">
                    {details.strengths.map(item => (
                      <li key={item.title}>
                        <strong className="block text-xl text-gray-100 font-semibold">{item.title}</strong>
                        <p className="text-gray-400 text-base">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h4 className="text-2xl font-lalezar text-red-400 mb-4 border-b-2 border-red-500/30 pb-2 inline-block">🌪️ نقاط ضعف و چالش‌ها</h4>
                  <ul className="space-y-4">
                    {details.weaknesses.map(item => (
                      <li key={item.title}>
                        <strong className="block text-xl text-gray-100 font-semibold">{item.title}</strong>
                        <p className="text-gray-400 text-base">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <section>
                <h4 className="text-2xl font-lalezar text-cyan-300 mb-3 border-b-2 border-cyan-500/30 pb-2 inline-block">💼 شغل و حرفه</h4>
                <p className="text-gray-300 leading-loose text-lg">{details.career}</p>
              </section>
              
              <section>
                <h4 className="text-2xl font-lalezar text-rose-300 mb-3 border-b-2 border-rose-500/30 pb-2 inline-block">❤️ روابط عاطفی و اجتماعی</h4>
                <p className="text-gray-300 leading-loose text-lg">{details.relationships}</p>
              </section>

              <section className="bg-slate-800/40 p-6 rounded-lg">
                <h4 className="text-2xl font-lalezar text-amber-300 mb-4 border-b-2 border-amber-500/30 pb-2 inline-block">💡 توصیه‌ها</h4>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-xl font-lalezar text-gray-200 mt-2 mb-2">برای مردان</h5>
                      <p className="text-gray-300 leading-loose">{details.recommendations.men}</p>
                    </div>
                    <div className="border-t md:border-t-0 md:border-r border-slate-700/50 pt-4 md:pt-0 md:pr-6">
                      <h5 className="text-xl font-lalezar text-gray-200 mt-2 mb-2">برای زنان</h5>
                      <p className="text-gray-300 leading-loose">{details.recommendations.women}</p>
                    </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
export default ZodiacDetailModal;
