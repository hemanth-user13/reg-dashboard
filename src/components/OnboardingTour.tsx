import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface OnboardingTourProps {
  onComplete: () => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      setTimeout(() => setShow(true), 1000);
    }
  }, []);

  const steps = [
    {
      title: 'Welcome to Regulation Management! 👋',
      description: 'This tool helps you organize and track regulatory compliance documents efficiently. Let me show you around!',
      highlight: null,
    },
    {
      title: 'Three Categories',
      description: 'Regulations are organized into Personal (directly applicable), Relevant (indirectly applicable), and Irrelevant (archived/outdated) categories.',
      highlight: null,
    },
    {
      title: 'Drag and Drop',
      description: 'Simply drag any regulation card to move it between categories. You\'ll be asked to add a note explaining why you moved it.',
      highlight: null,
    },
    {
      title: 'Status Tracking',
      description: 'Each regulation has a status badge showing if it\'s In Effect, In Planning, Partially Applicable, or Out of Effect. Use the filter dropdown to view specific statuses.',
      highlight: null,
    },
    {
      title: 'Bulk Actions',
      description: 'Select multiple regulations by clicking their checkboxes, then use the bulk actions bar at the bottom to move them all at once.',
      highlight: null,
    },
    {
      title: 'Global Search',
      description: 'Press Cmd+K (or Ctrl+K) anytime to open the global search and quickly find any regulation by title, content, or tags.',
      highlight: null,
    },
    {
      title: 'Activity Log',
      description: 'Track all changes with the Activity Log. Every move, pin, or tag change is recorded with timestamps and your notes.',
      highlight: null,
    },
    {
      title: 'You\'re All Set! 🎉',
      description: 'Start organizing your regulations now. Press ? anytime to see keyboard shortcuts. Happy organizing!',
      highlight: null,
    },
  ];

  const handleComplete = () => {
    localStorage.setItem('hasSeenTour', 'true');
    setShow(false);
    onComplete();
  };

  const handleSkip = () => {
    localStorage.setItem('hasSeenTour', 'true');
    setShow(false);
    onComplete();
  };

  if (!show) return null;

  const isLastStep = currentStep === steps.length - 1;
  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-blue-500 dark:border-blue-400 w-full max-w-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="pt-8 px-6 pb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <button
              onClick={handleSkip}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {step.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {step.description}
            </p>
          </div>

          <div className="flex items-center gap-2 mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  index <= currentStep
                    ? 'bg-blue-600 dark:bg-blue-500'
                    : 'bg-gray-200 dark:bg-gray-800'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
            >
              Skip Tour
            </button>

            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={() => {
                  if (isLastStep) {
                    handleComplete();
                  } else {
                    setCurrentStep(currentStep + 1);
                  }
                }}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                {isLastStep ? (
                  <>
                    <Check className="w-5 h-5" />
                    Get Started
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
