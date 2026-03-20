'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Mail, Zap, CheckCircle, XCircle, AlertTriangle, Clock, 
  RefreshCw, ArrowLeft, Shield, Server, FileText, Copy, Check,
  Info, Lightbulb, AlertCircle
} from 'lucide-react';

interface TestResult {
  id: string;
  status: 'pending' | 'received' | 'expired';
  email: string;
  createdAt: string;
  expiresAt: string;
  receivedAt?: string;
  analysis?: {
    spf: { status: 'pass' | 'fail' | 'none'; details: string };
    dkim: { status: 'pass' | 'fail' | 'none'; details: string; selector?: string };
    dmarc: { status: 'pass' | 'fail' | 'none'; details: string };
    sendingIp?: string;
    reverseDns?: string;
    from?: string;
    subject?: string;
    spamScore?: number;
    spamDetails?: string[];
  };
  headers?: string;
}

interface PageProps {
  params: { testId: string };
}

// 认证协议的通俗解释
const authExplanations = {
  spf: {
    name: 'SPF (Sender Policy Framework)',
    whatIs: '验证发送邮件的服务器是否被授权代表你的域名发送邮件',
    pass: {
      impact: '✅ 收件服务器确认这封邮件来自授权的服务器，信任度高',
      action: '保持当前配置，定期检查确保SPF记录是最新的'
    },
    fail: {
      impact: '⚠️ 邮件可能被标记为垃圾邮件或直接被拒收，因为发送服务器未被授权',
      action: '在DNS中添加SPF记录，授权你的邮件服务器。例如使用Gmail发送，需添加: v=spf1 include:_spf.google.com ~all'
    },
    none: {
      impact: '⚠️ 没有SPF记录意味着任何人都可能冒充你的域名发送邮件，这会降低邮件可信度',
      action: '立即在DNS中添加SPF记录。这是最基础的邮件安全配置'
    }
  },
  dkim: {
    name: 'DKIM (DomainKeys Identified Mail)',
    whatIs: '给邮件添加数字签名，证明邮件内容没有被篡改，确实来自声称的发送者',
    pass: {
      impact: '✅ 邮件通过了真实性验证，内容完整可信，不太可能进入垃圾邮件',
      action: '保持当前配置，你的邮件具有良好的可信度'
    },
    fail: {
      impact: '🚨 邮件签名验证失败，可能被视为伪造邮件而被拒收',
      action: '检查DKIM签名配置是否正确，确保邮件服务器正确签署邮件'
    },
    none: {
      impact: '⚠️ 没有数字签名，收件方无法验证邮件真实性，可能影响邮件送达率',
      action: '在邮件服务提供商处启用DKIM签名，并在DNS中添加对应的公钥记录'
    }
  },
  dmarc: {
    name: 'DMARC (Domain-based Message Authentication)',
    whatIs: '告诉收件服务器当SPF或DKIM验证失败时应该如何处理邮件，并提供报告',
    pass: {
      impact: '✅ 邮件满足DMARC策略要求，具有最高的可信度',
      action: '保持当前配置，考虑定期查看DMARC报告了解邮件发送情况'
    },
    fail: {
      impact: '🚨 邮件不符合域名的DMARC策略，可能被隔离或拒收',
      action: '检查SPF和DKIM配置是否与DMARC策略一致'
    },
    none: {
      impact: '⚠️ 没有DMARC策略意味着域名容易被钓鱼攻击者冒用',
      action: '添加DMARC记录。建议从监控模式开始: v=DMARC1; p=none; rua=mailto:你的邮箱'
    }
  }
};

// 获取综合建议
const getOverallRecommendation = (analysis: TestResult['analysis']) => {
  if (!analysis) return null;
  
  const statuses = [analysis.spf.status, analysis.dkim.status, analysis.dmarc.status];
  const passCount = statuses.filter(s => s === 'pass').length;
  const failCount = statuses.filter(s => s === 'fail').length;
  const noneCount = statuses.filter(s => s === 'none').length;

  if (passCount === 3) {
    return {
      level: 'excellent',
      title: '🎉 邮件配置完美！',
      message: '你的域名邮件认证配置非常完善，邮件送达率应该很高。继续保持！',
      color: 'bg-green-50 border-green-200 text-green-800'
    };
  } else if (passCount >= 2 && failCount === 0) {
    return {
      level: 'good',
      title: '👍 配置良好，可以更好',
      message: '大部分认证已通过，但还有改进空间。完善所有认证可以进一步提高送达率。',
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    };
  } else if (failCount > 0) {
    return {
      level: 'warning',
      title: '⚠️ 需要立即修复',
      message: '有认证验证失败，这会严重影响邮件送达。请按照下方建议尽快修复。',
      color: 'bg-red-50 border-red-200 text-red-800'
    };
  } else {
    return {
      level: 'needs-setup',
      title: '📧 需要配置邮件认证',
      message: '你的域名缺少基本的邮件认证配置。这可能导致邮件进入垃圾箱或被冒用。建议尽快完善配置。',
      color: 'bg-amber-50 border-amber-200 text-amber-800'
    };
  }
};

export default function TestResultPage({ params }: PageProps) {
  const { testId } = params;
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [polling, setPolling] = useState(false);
  const [showHeaders, setShowHeaders] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchResult = async () => {
    try {
      const response = await fetch(`/api/test/${testId}`);
      const data = await response.json();

      if (data.success) {
        setResult(data.result);
        // Stop polling if email received or expired
        if (data.result.status !== 'pending') {
          setPolling(false);
        }
      } else {
        setError(data.error || 'Failed to fetch result');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResult();
  }, [testId]);

  // Polling for pending tests
  useEffect(() => {
    if (!result || result.status !== 'pending') return;

    setPolling(true);
    const interval = setInterval(() => {
      fetchResult();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [result?.status]);

  const handleCopyHeaders = async () => {
    if (!result?.headers) return;
    try {
      await navigator.clipboard.writeText(result.headers);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-600 bg-green-50 border-green-200';
      case 'fail': return 'text-red-600 bg-red-50 border-red-200';
      case 'none': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'fail': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading test result...</p>
        </div>
      </main>
    );
  }

  if (error || !result) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Test Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'This test may have expired or does not exist.'}</p>
          <Link 
            href="/test"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft className="w-4 h-4" /> Start New Test
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="py-6 px-4 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl rotate-3"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                  <Zap className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1" />
                </div>
              </div>
              <span className="text-xl font-bold text-gray-800">MailProbe</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/guides" className="hover:text-blue-600">Guides</Link>
            <Link href="/test" className="text-blue-600 font-medium">Email Test</Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link 
            href="/test"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Email Test
          </Link>

          {result.status === 'pending' ? (
            /* Waiting for email */
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Waiting for Your Email
              </h1>
              
              <div className="text-left mb-6">
                <p className="text-gray-600 mb-2 font-medium">1. Send an email to:</p>
                <div className="p-4 bg-gray-100 rounded-xl font-mono text-lg text-gray-800 break-all mb-4">
                  t@test.mailprobe.xyz
                </div>
                
                <p className="text-gray-600 mb-2 font-medium">2. Use this subject line:</p>
                <div className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl font-mono text-lg text-gray-800">
                  TEST-{result.id}
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-blue-600 mb-6">
                {polling && <RefreshCw className="w-5 h-5 animate-spin" />}
                <span>Checking for incoming email...</span>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  Test expires: {new Date(result.expiresAt).toLocaleString()}
                </p>
              </div>
            </div>
          ) : result.status === 'expired' ? (
            /* Expired */
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <XCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Test Expired</h1>
              <p className="text-gray-600 mb-6">No email was received within the time limit.</p>
              <Link 
                href="/test"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Start New Test <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          ) : (
            /* Email received - show analysis */
            <>
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">邮件已收到！</h1>
                    <p className="text-gray-500 text-sm">
                      接收时间: {result.receivedAt ? new Date(result.receivedAt).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>

                {result.analysis && (
                  <>
                    {/* Overall Recommendation */}
                    {(() => {
                      const recommendation = getOverallRecommendation(result.analysis);
                      return recommendation && (
                        <div className={`p-4 rounded-lg border mb-6 ${recommendation.color}`}>
                          <h3 className="font-bold text-lg mb-1">{recommendation.title}</h3>
                          <p>{recommendation.message}</p>
                        </div>
                      );
                    })()}

                    {/* Email Info */}
                    <div className="p-4 bg-gray-50 rounded-lg mb-6">
                      <h3 className="font-medium text-gray-700 mb-3">📧 邮件信息</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">发件人:</span>
                          <span className="ml-2 text-gray-800 font-medium">{result.analysis.from || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">主题:</span>
                          <span className="ml-2 text-gray-800 font-medium">{result.analysis.subject || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">发送IP:</span>
                          <span className="ml-2 text-gray-800 font-mono">{result.analysis.sendingIp || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">反向DNS:</span>
                          <span className="ml-2 text-gray-800 font-mono">{result.analysis.reverseDns || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Authentication Results with Explanations */}
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">🔐 认证检测结果</h2>
                    <div className="space-y-6 mb-6">
                      {/* SPF */}
                      <div className={`rounded-xl border-2 overflow-hidden ${
                        result.analysis.spf.status === 'pass' ? 'border-green-200' :
                        result.analysis.spf.status === 'fail' ? 'border-red-200' : 'border-amber-200'
                      }`}>
                        <div className={`p-4 ${getStatusColor(result.analysis.spf.status)}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Shield className="w-5 h-5" />
                              <span className="font-bold">{authExplanations.spf.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold uppercase px-3 py-1 rounded-full bg-white/50">
                                {result.analysis.spf.status === 'pass' ? '通过' : 
                                 result.analysis.spf.status === 'fail' ? '失败' : '未配置'}
                              </span>
                              {getStatusIcon(result.analysis.spf.status)}
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-white space-y-3">
                          <div className="flex gap-2">
                            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-700">这是什么？</p>
                              <p className="text-sm text-gray-600">{authExplanations.spf.whatIs}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-700">对你的影响</p>
                              <p className="text-sm text-gray-600">
                                {authExplanations.spf[result.analysis.spf.status].impact}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Lightbulb className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-700">建议操作</p>
                              <p className="text-sm text-gray-600">
                                {authExplanations.spf[result.analysis.spf.status].action}
                              </p>
                            </div>
                          </div>
                          {result.analysis.spf.details && (
                            <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-500 font-mono">
                              技术详情: {result.analysis.spf.details}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* DKIM */}
                      <div className={`rounded-xl border-2 overflow-hidden ${
                        result.analysis.dkim.status === 'pass' ? 'border-green-200' :
                        result.analysis.dkim.status === 'fail' ? 'border-red-200' : 'border-amber-200'
                      }`}>
                        <div className={`p-4 ${getStatusColor(result.analysis.dkim.status)}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Shield className="w-5 h-5" />
                              <span className="font-bold">{authExplanations.dkim.name}</span>
                              {result.analysis.dkim.selector && (
                                <span className="text-xs bg-white/50 px-2 py-0.5 rounded">
                                  selector: {result.analysis.dkim.selector}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold uppercase px-3 py-1 rounded-full bg-white/50">
                                {result.analysis.dkim.status === 'pass' ? '通过' : 
                                 result.analysis.dkim.status === 'fail' ? '失败' : '未配置'}
                              </span>
                              {getStatusIcon(result.analysis.dkim.status)}
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-white space-y-3">
                          <div className="flex gap-2">
                            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-700">这是什么？</p>
                              <p className="text-sm text-gray-600">{authExplanations.dkim.whatIs}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-700">对你的影响</p>
                              <p className="text-sm text-gray-600">
                                {authExplanations.dkim[result.analysis.dkim.status].impact}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Lightbulb className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-700">建议操作</p>
                              <p className="text-sm text-gray-600">
                                {authExplanations.dkim[result.analysis.dkim.status].action}
                              </p>
                            </div>
                          </div>
                          {result.analysis.dkim.details && (
                            <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-500 font-mono">
                              技术详情: {result.analysis.dkim.details}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* DMARC */}
                      <div className={`rounded-xl border-2 overflow-hidden ${
                        result.analysis.dmarc.status === 'pass' ? 'border-green-200' :
                        result.analysis.dmarc.status === 'fail' ? 'border-red-200' : 'border-amber-200'
                      }`}>
                        <div className={`p-4 ${getStatusColor(result.analysis.dmarc.status)}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Shield className="w-5 h-5" />
                              <span className="font-bold">{authExplanations.dmarc.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold uppercase px-3 py-1 rounded-full bg-white/50">
                                {result.analysis.dmarc.status === 'pass' ? '通过' : 
                                 result.analysis.dmarc.status === 'fail' ? '失败' : '未配置'}
                              </span>
                              {getStatusIcon(result.analysis.dmarc.status)}
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-white space-y-3">
                          <div className="flex gap-2">
                            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-700">这是什么？</p>
                              <p className="text-sm text-gray-600">{authExplanations.dmarc.whatIs}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-700">对你的影响</p>
                              <p className="text-sm text-gray-600">
                                {authExplanations.dmarc[result.analysis.dmarc.status].impact}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Lightbulb className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-700">建议操作</p>
                              <p className="text-sm text-gray-600">
                                {authExplanations.dmarc[result.analysis.dmarc.status].action}
                              </p>
                            </div>
                          </div>
                          {result.analysis.dmarc.details && (
                            <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-500 font-mono">
                              技术详情: {result.analysis.dmarc.details}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Spam Score */}
                    {result.analysis.spamScore !== undefined && (
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">📊 垃圾邮件评分</h2>
                        <div className={`p-4 rounded-lg border ${
                          result.analysis.spamScore <= 3 ? 'bg-green-50 border-green-200' :
                          result.analysis.spamScore <= 6 ? 'bg-yellow-50 border-yellow-200' :
                          'bg-red-50 border-red-200'
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">SpamAssassin 评分</span>
                            <span className={`text-2xl font-bold ${
                              result.analysis.spamScore <= 3 ? 'text-green-600' :
                              result.analysis.spamScore <= 6 ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {result.analysis.spamScore}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            {result.analysis.spamScore <= 3 ? '✅ 优秀 - 垃圾邮件风险很低，邮件应该能正常送达' :
                             result.analysis.spamScore <= 6 ? '⚠️ 一般 - 检测到一些垃圾邮件特征，可能会被过滤' :
                             '🚨 较差 - 高垃圾邮件风险，邮件很可能进入垃圾箱'}
                          </p>
                          {result.analysis.spamDetails && result.analysis.spamDetails.length > 0 && (
                            <div className="mt-3 p-3 bg-white/50 rounded">
                              <p className="text-sm font-medium text-gray-700 mb-2">检测到的问题:</p>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {result.analysis.spamDetails.map((detail, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-gray-400">•</span>
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Quick Fix Guide Link */}
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-6 h-6 text-blue-500 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-blue-800">需要帮助配置？</p>
                          <p className="text-sm text-blue-700 mt-1">
                            查看我们的 <Link href="/guides" className="underline font-medium">DNS配置指南</Link>，
                            包含主流域名服务商（Cloudflare、GoDaddy、阿里云等）的详细设置步骤。
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Raw Headers */}
                {result.headers && (
                  <div>
                    <button
                      onClick={() => setShowHeaders(!showHeaders)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <FileText className="w-4 h-4" />
                      {showHeaders ? 'Hide' : 'Show'} Raw Headers
                    </button>
                    {showHeaders && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-500">Email Headers</span>
                          <button
                            onClick={handleCopyHeaders}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                          >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg text-xs overflow-x-auto max-h-96 overflow-y-auto">
                          {result.headers}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/test"
                  className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-center"
                >
                  Run Another Test
                </Link>
                {result.analysis?.from && (
                  <Link
                    href={`/report/${result.analysis.from.split('@')[1]}`}
                    className="flex-1 py-3 px-6 bg-white border border-gray-300 hover:border-blue-500 text-gray-700 font-medium rounded-lg text-center"
                  >
                    Check Domain Configuration
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-gray-50 mt-8">
        <div className="max-w-5xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2026 MailProbe. Free email deliverability checker.</p>
        </div>
      </footer>
    </main>
  );
}
