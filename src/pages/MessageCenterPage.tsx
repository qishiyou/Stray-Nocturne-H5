import React, { useState } from 'react';
import { ArrowLeft, Bell, Star, Info, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MessageCenterPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'system' | 'activity'>('all');

  const messages = [
    { 
      id: 1, 
      type: 'system', 
      title: '系统更新通知', 
      content: 'Stray Nocturne v1.1.0 版本已上线，新增了宠物对话情感识别功能，快去体验吧！', 
      time: '10:30', 
      unread: true,
      icon: Bell,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    { 
      id: 2, 
      type: 'activity', 
      title: '积分到账提醒', 
      content: '恭喜！您完成“每日签到”任务，获得 10 创作积分。', 
      time: '昨天', 
      unread: false,
      icon: Star,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-500'
    },
    { 
      id: 3, 
      type: 'system', 
      title: '设备连接成功', 
      content: '您的新设备“智能音箱-客厅”已成功连接并同步数据。', 
      time: '02-08', 
      unread: false,
      icon: CheckCircle2,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-500'
    },
    { 
      id: 4, 
      type: 'activity', 
      title: '限时活动邀请', 
      content: '春节限定宠物皮肤创作大赛开启，丰厚奖金等你来拿！', 
      time: '02-05', 
      unread: false,
      icon: Info,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-500'
    },
  ];

  const filteredMessages = activeTab === 'all' 
    ? messages 
    : messages.filter(m => m.type === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="text-gray-500 mr-4 p-2 bg-white rounded-full shadow-sm">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold text-secondary">消息中心</h2>
        </div>
        <button className="text-xs text-primary font-medium hover:underline">全部已读</button>
      </div>

      {/* Tabs */}
      <div className="flex bg-white p-1 rounded-2xl shadow-sm mb-6 border border-gray-100">
        {[
          { id: 'all', label: '全部' },
          { id: 'system', label: '系统通知' },
          { id: 'activity', label: '活动提醒' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id 
                ? 'bg-primary text-white shadow-md shadow-primary/20' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Message List */}
      <div className="space-y-4">
        {filteredMessages.map((msg) => {
          const Icon = msg.icon;
          return (
            <div 
              key={msg.id} 
              className={`bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex space-x-4 relative transition-transform active:scale-[0.98] ${msg.unread ? 'ring-1 ring-primary/10' : ''}`}
            >
              <div className={`w-12 h-12 rounded-2xl ${msg.iconBg} flex items-center justify-center shrink-0`}>
                <Icon size={22} className={msg.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`font-bold text-sm truncate ${msg.unread ? 'text-secondary' : 'text-gray-500'}`}>
                    {msg.title}
                  </h4>
                  <span className="text-[10px] text-gray-400 shrink-0">{msg.time}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                  {msg.content}
                </p>
              </div>
              {msg.unread && (
                <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
              )}
            </div>
          );
        })}
      </div>

      {filteredMessages.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-4">
            <Bell size={32} />
          </div>
          <p className="text-gray-400 text-sm">暂无消息记录</p>
        </div>
      )}
    </div>
  );
};

export default MessageCenterPage;
