'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Copy, Check, ExternalLink, AlertCircle, Lightbulb, Terminal } from 'lucide-react';
import { 
  type DNSProvider, 
  type RecordType, 
  type FixGuide,
  getFixGuide, 
  getAllProviders,
  generateFixValue,
} from '@/lib/fix-guides';

interface FixGuideCardProps {
  domain: string;
  recordType: RecordType;
  status: 'fail' | 'warning' | 'pass';
  currentRecord?: string;
}

export function FixGuideCard({ domain, recordType, status, currentRecord }: FixGuideCardProps) {
  const [selectedProvider, setSelectedProvider] = useState<DNSProvider | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const providers = getAllProviders();
  const guide = selectedProvider ? getFixGuide(selectedProvider, recordType) : null;

  const handleCopy = async (value: string, id: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedValue(id);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  const suggestedValue = generateFixValue(recordType, domain);

  if (status === 'pass') return null;

  return (
    <div className="mt-4 border-t pt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
      >
        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        View Fix Guide
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {/* DNS Provider Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select your DNS provider
            </label>
            <div className="flex flex-wrap gap-2">
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => setSelectedProvider(provider.id)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    selectedProvider === provider.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {provider.name}
                </button>
              ))}
            </div>
          </div>

          {/* Fix Guide Content */}
          {guide && (
            <div className="bg-gray-50 rounded-xl p-6 space-y-6">
              {/* Title */}
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-800">
                  {guide.providerName} - {guide.recordTypeName} Setup Guide
                </h4>
                <a
                  href={providers.find(p => p.id === selectedProvider)?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                >
                  Open Console <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Prerequisites */}
              {guide.prerequisites && guide.prerequisites.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800">Prerequisites</p>
                      <ul className="mt-1 text-sm text-yellow-700 list-disc list-inside">
                        {guide.prerequisites.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Step-by-step Guide */}
              <div className="space-y-4">
                {guide.steps.map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-800">{step.title}</h5>
                      <p className="text-gray-600 mt-1">{step.description}</p>
                      {step.tip && (
                        <div className="mt-2 flex items-start gap-2 text-sm text-blue-600 bg-blue-50 p-2 rounded">
                          <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{step.tip}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggested Value */}
              <div className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Suggested Value</span>
                  <button
                    onClick={() => handleCopy(suggestedValue, 'suggested')}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    {copiedValue === 'suggested' ? (
                      <>
                        <Check className="w-4 h-4" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy
                      </>
                    )}
                  </button>
                </div>
                <code className="block p-3 bg-gray-100 rounded text-sm text-gray-800 break-all">
                  {suggestedValue}
                </code>
                <p className="mt-2 text-xs text-gray-500">
                  * Adjust the include statements based on your actual email service provider
                </p>
              </div>

              {/* Example Value */}
              <div className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Full Example</span>
                  <button
                    onClick={() => handleCopy(guide.exampleValue, 'example')}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    {copiedValue === 'example' ? (
                      <>
                        <Check className="w-4 h-4" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy
                      </>
                    )}
                  </button>
                </div>
                <code className="block p-3 bg-gray-100 rounded text-sm text-gray-800 break-all">
                  {guide.exampleValue}
                </code>
              </div>

              {/* Verify Command */}
              {guide.verifyCommand && (
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Terminal className="w-4 h-4" /> Verify Command
                    </span>
                    <button
                      onClick={() => handleCopy(guide.verifyCommand!.replace('yourdomain.com', domain), 'verify')}
                      className="flex items-center gap-1 text-sm text-gray-400 hover:text-white"
                    >
                      {copiedValue === 'verify' ? (
                        <>
                          <Check className="w-4 h-4" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  <code className="block text-green-400 text-sm">
                    $ {guide.verifyCommand.replace(/yourdomain\.com/g, domain)}
                  </code>
                </div>
              )}

              {/* Common Mistakes */}
              {guide.commonMistakes && guide.commonMistakes.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="font-medium text-red-800 mb-2">⚠️ Common Mistakes</p>
                  <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
                    {guide.commonMistakes.map((mistake, i) => (
                      <li key={i}>{mistake}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Prompt when no provider selected */}
          {!selectedProvider && (
            <div className="text-center py-8 text-gray-500">
              👆 Please select your DNS provider above to see specific setup instructions
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Simplified version: Provider selector only
export function DNSProviderSelector({ 
  value, 
  onChange 
}: { 
  value: DNSProvider | null; 
  onChange: (provider: DNSProvider) => void;
}) {
  const providers = getAllProviders();
  
  return (
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value as DNSProvider)}
      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select DNS provider...</option>
      {providers.map((provider) => (
        <option key={provider.id} value={provider.id}>
          {provider.name}
        </option>
      ))}
    </select>
  );
}
