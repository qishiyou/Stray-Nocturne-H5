import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Mail, Send, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HelpFeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');

  const faqs = [
    '如何连接新设备？',
    '唤醒词无法识别怎么办？',
    '如何修改 AI 角色的性格？',
    '我的积分可以用来做什么？',
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="text-gray-500 mr-4 p-2 bg-white rounded-full shadow-sm">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold text-secondary">帮助与反馈</h2>
        </div>
        <button className="text-sm text-primary font-medium">反馈记录</button>
      </div>

      <div className="space-y-6">
        {/* FAQs */}
        <section>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">常见问题</h3>
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            {faqs.map((q, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-5 hover:bg-gray-50 cursor-pointer transition-colors ${
                  index !== faqs.length - 1 ? 'border-b border-gray-50' : ''
                }`}
              >
                <span className="text-secondary font-medium">{q}</span>
                <ChevronRight size={18} className="text-gray-300" />
              </div>
            ))}
          </div>
        </section>

        {/* Feedback Form */}
        <section>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">意见反馈</h3>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <textarea 
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="请详细描述您遇到的问题或建议..." 
              rows={5}
              className="input-field bg-gray-50 border-transparent focus:bg-white resize-none mb-4"
            />
            <button 
              disabled={!feedback.trim()}
              className="w-full btn-primary disabled:opacity-50 disabled:scale-100 flex items-center justify-center space-x-2"
            >
              <Send size={18} />
              <span>提交反馈</span>
            </button>
          </div>
        </section>

        {/* Contact Info */}
        <div className="flex justify-center space-x-8 py-4">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-primary">
              <MessageSquare size={20} />
            </div>
            <span className="text-xs text-gray-500">在线客服</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-primary">
              <Mail size={20} />
            </div>
            <span className="text-xs text-gray-500">邮件联系</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpFeedbackPage;
