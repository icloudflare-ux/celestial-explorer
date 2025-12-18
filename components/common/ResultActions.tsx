
import React, { useState, useEffect } from 'react';

interface ResultActionsProps {
  textToCopy: string;
}

const ActionButton: React.FC<{ onClick: () => void; children: React.ReactNode; 'aria-label': string }> = ({ onClick, children, 'aria-label': ariaLabel }) => (
    <button
        onClick={onClick}
        aria-label={ariaLabel}
        className="p-2 rounded-full bg-slate-700/50 hover:bg-slate-600/70 text-gray-300 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
        {children}
    </button>
);

const ResultActions: React.FC<ResultActionsProps> = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    try {
        if (navigator.share) {
            setCanShare(true);
        }
    } catch (e) {
        // navigator.share might not exist or be blocked.
    }
  }, []);

  const handleCopy = () => {
    const cleanText = textToCopy.replace(/@@EPIC@@|@@FINAL@@|\*\*/g, '');
    navigator.clipboard.writeText(cleanText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  const handlePrint = () => {
    document.body.classList.add('printing-active');
    window.print();
  };

  useEffect(() => {
    const afterPrint = () => {
        document.body.classList.remove('printing-active');
    };
    window.addEventListener('afterprint', afterPrint);
    return () => {
      window.removeEventListener('afterprint', afterPrint);
    };
  }, []);

  const handleShare = async () => {
    const cleanText = textToCopy.replace(/@@EPIC@@|@@FINAL@@|\*\*/g, '');
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'تحلیل از کاوشگر کیهان',
          text: cleanText,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };
  
  return (
    <div className="mt-6 flex items-center justify-end gap-x-3 print-actions">
        <div className="relative">
            <ActionButton onClick={handleCopy} aria-label="کپی کردن متن">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </ActionButton>
            {isCopied && (
                <div className="absolute bottom-full mb-2 right-1/2 translate-x-1/2 px-2 py-1 bg-green-600 text-white text-xs rounded-md whitespace-nowrap">
                    کپی شد!
                </div>
            )}
        </div>
        <ActionButton onClick={handlePrint} aria-label="چاپ یا ذخیره به صورت PDF">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm7-8V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4" /></svg>
        </ActionButton>
        {canShare && (
            <ActionButton onClick={handleShare} aria-label="اشتراک گذاری">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.002l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367 2.684z" /></svg>
            </ActionButton>
        )}
    </div>
  );
};

export default ResultActions;
