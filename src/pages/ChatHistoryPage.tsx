import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Utensils, Heart, Search, Filter } from 'lucide-react';

interface ChatMessage {
  id: number;
  type: 'text' | 'action' | 'system';
  content: string;
  time: string;
  sender: 'pet' | 'user' | 'system';
  icon?: any;
}

const ChatHistoryPage: React.FC = () => {
  const navigate = useNavigate();

  const messages: ChatMessage[] = [
    {
      id: 1,
      type: 'text',
      content: '“今天天气真好，想出去玩！”',
      time: '10:30',
      sender: 'pet',
      icon: MessageSquare
    },
    {
      id: 2,
      type: 'action',
      content: '你给小蓝喂了一块美味的饼干',
      time: '09:45',
      sender: 'system',
      icon: Utensils
    },
    {
      id: 3,
      type: 'text',
      content: '刚刚吃饱了，感觉很满足。',
      time: '09:46',
      sender: 'pet',
      icon: MessageSquare
    },
    {
      id: 4,
      type: 'action',
      content: '你轻轻抚摸了小蓝的头',
      time: '08:20',
      sender: 'system',
      icon: Heart
    },
    {
      id: 5,
      type: 'text',
      content: '呜呜，好舒服呀~',
      time: '08:21',
      sender: 'pet',
      icon: MessageSquare
    },
    {
      id: 6,
      type: 'text',
      content: '早上好！主人，今天我们要做什么呢？',
      time: '07:30',
      sender: 'pet',
      icon: MessageSquare
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-secondary" />
          </button>
          <h1 className="text-xl font-bold text-secondary ml-2">对话记录</h1>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <Search size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Date Divider */}
      <div className="flex justify-center my-6">
        <span className="bg-gray-200 text-gray-500 text-[10px] px-3 py-1 rounded-full font-medium">今天 2026-02-10</span>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'system' ? (
              <div className="w-full flex justify-center">
                <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm flex items-center space-x-3 max-w-[90%]">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                    {msg.icon && <msg.icon size={16} className="text-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 font-medium">{msg.content}</p>
                    <span className="text-[9px] text-gray-400 mt-1 block">{msg.time}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start space-x-3 max-w-[85%]">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                  <img 
                    src="https://p5-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/76f27f317877473eac24b5066c733280~tplv-a9rns2rl98-image.image?lk3s=8e244e95&rcl=202602061253033289E0582724E00D6804&rrcfp=f06b921b&x-expires=1772945598&x-signature=VwXfENQAQ2a41aqRIaa3vbx39Xc%3D" 
                    alt="Pet" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-700 leading-relaxed">{msg.content}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1.5 ml-1 block">{msg.time}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Placeholder (Read Only) */}
      <div className="bg-white p-4 border-t border-gray-100 pb-8">
        <div className="bg-gray-50 rounded-2xl px-4 py-3 flex items-center justify-between text-gray-400">
          <span className="text-sm italic">查看过往对话记录...</span>
          <MessageSquare size={18} />
        </div>
      </div>
    </div>
  );
};

export default ChatHistoryPage;
