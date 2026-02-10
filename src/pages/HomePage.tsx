import React, { useState } from 'react';
import { Mic, Paintbrush, Book, Utensils, Heart, Signal, Wifi, Battery, MessageSquare, Star, X, Cookie, Apple, Cake, Pizza, Coffee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [activities, setActivities] = useState([
    { icon: MessageSquare, text: '“今天天气真好，想出去玩！”', time: '10分钟前' },
    { icon: Utensils, text: '刚刚吃饱了，感觉很满足。', time: '1小时前' },
  ]);

  const foodList = [
    { id: 'cookie', name: '美味饼干', icon: Cookie, color: 'bg-yellow-50 text-yellow-600', feedback: '这个小饼干真脆，谢谢主人！🍪' },
    { id: 'apple', name: '红苹果', icon: Apple, color: 'bg-red-50 text-red-600', feedback: '脆脆甜甜的苹果，我的最爱！🍎' },
    { id: 'cake', name: '奶油蛋糕', icon: Cake, color: 'bg-pink-50 text-pink-600', feedback: '哇！今天是我的生日吗？太好吃了！🍰' },
    { id: 'pizza', name: '芝士披萨', icon: Pizza, color: 'bg-orange-50 text-orange-600', feedback: '芝士拉丝的感觉太棒了！🍕' },
    { id: 'coffee', name: '宠物咖啡', icon: Coffee, color: 'bg-brown-50 text-amber-900', feedback: '喝完这一杯，我还能再跑十圈！☕' },
  ];

  const handleAction = (label: string) => {
    if (label === '喂食') {
      setShowFoodModal(true);
    } else if (label === '抚摸') {
      setActionMessage('好舒服呀，最喜欢主人了~ ❤️');
      setActivities([
        { icon: Heart, text: '你温柔地抚摸了小蓝的头', time: '刚刚' },
        ...activities
      ]);
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  const handleFeed = (food: typeof foodList[0]) => {
    setActionMessage(food.feedback);
    setActivities([
      { icon: Utensils, text: `你给小蓝喂了一份${food.name}`, time: '刚刚' },
      ...activities
    ]);
    setShowFoodModal(false);
    setTimeout(() => setActionMessage(null), 3000);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // 模拟语音识别
      setTimeout(() => setIsListening(false), 3000);
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Status Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm font-medium">12:30</div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Signal size={16} />
          <Wifi size={16} />
          <Battery size={16} />
        </div>
      </div>

      {/* Pet Display Area */}
      <div className="relative bg-white rounded-3xl p-6 shadow-sm mb-6">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl overflow-hidden"></div>
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-accent/5 rounded-full blur-3xl overflow-hidden"></div>

        <div className="flex flex-col items-center justify-center relative z-10">
          <div className="relative w-48 h-48 mb-4">
            <div className={`absolute inset-0 bg-primary/10 rounded-full blur-2xl transition-all duration-500 ${isListening || actionMessage ? 'scale-125 opacity-100' : 'scale-100 opacity-50'}`}></div>
            {actionMessage && (
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-primary/20 z-50 animate-in fade-in zoom-in slide-in-from-bottom-4 duration-300">
                <p className="text-sm font-bold text-primary whitespace-nowrap drop-shadow-sm">{actionMessage}</p>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/95 border-r border-b border-primary/20 rotate-45"></div>
              </div>
            )}
            <img 
              src="https://p5-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/76f27f317877473eac24b5066c733280~tplv-a9rns2rl98-image.image?lk3s=8e244e95&rcl=202602061253033289E0582724E00D6804&rrcfp=f06b921b&x-expires=1772945598&x-signature=VwXfENQAQ2a41aqRIaa3vbx39Xc%3D" 
              alt="全息宠物" 
              className={`w-full h-full object-contain relative z-10 transition-transform duration-500 ${isListening || actionMessage ? 'scale-110' : 'animate-pulse'}`}
            />
          </div>
          <div className="absolute top-6 right-6 flex items-center space-x-2 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/10 backdrop-blur-md">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-primary">在线</span>
          </div>
          <h3 className="text-2xl font-bold text-secondary">小蓝</h3>
          <div className="flex items-center space-x-3 mt-1">
            <div className="flex items-center space-x-1">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-gray-500">心情愉快 · LV.5</span>
            </div>
            <div className="h-3 w-[1px] bg-gray-200"></div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-gray-400">
                <Wifi size={14} className="text-primary" />
                <Battery size={14} className="text-green-500" />
                <span className="text-[10px] font-bold">85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interaction Area */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
        <div className="flex flex-col items-center justify-center">
          <button 
            onClick={toggleListening}
            className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 hover:scale-105 active:scale-95 relative ${
              isListening ? 'bg-accent shadow-accent/50' : 'bg-primary shadow-primary/50'
            }`}
          >
            {isListening ? (
              <div className="flex space-x-1">
                <div className="w-1.5 h-6 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-8 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-6 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            ) : (
              <Mic size={36} className="text-white" />
            )}
          </button>
          <p className="mt-4 text-sm font-medium text-gray-600">
            {isListening ? '正在倾听...' : '点击与宠物对话'}
          </p>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { icon: Paintbrush, label: '更换形象', path: '/create-pet', color: 'bg-orange-50 text-orange-500' },
          { icon: Book, label: '宠物日志', path: '/chat-history', color: 'bg-blue-50 text-blue-500' },
          { icon: Utensils, label: '喂食', color: 'bg-pink-50 text-pink-500' },
          { icon: Heart, label: '抚摸', color: 'bg-red-50 text-red-500' },
        ].map((action, index) => {
          const Icon = action.icon;
          return (
            <div 
              key={index} 
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => {
                if (action.path) {
                  navigate(action.path);
                } else {
                  handleAction(action.label);
                }
              }}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-all duration-300 ${action.color}`}>
                <Icon size={24} />
              </div>
              <span className="text-xs font-medium text-gray-600">{action.label}</span>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold text-secondary">最近动态</h4>
          <button 
            onClick={() => navigate('/chat-history')}
            className="text-xs text-primary font-bold hover:bg-primary/5 px-2 py-1 rounded-lg transition-colors"
          >
            全部
          </button>
        </div>
        <div className="space-y-4">
          {activities.slice(0, 3).map((item, i) => (
            <div 
              key={i} 
              className="flex items-start space-x-3 cursor-pointer group animate-in fade-in slide-in-from-left-2 duration-300"
              onClick={() => navigate('/chat-history')}
            >
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/5 transition-colors">
                <item.icon size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 leading-tight group-hover:text-primary transition-colors">{item.text}</p>
                <span className="text-[10px] text-gray-400 mt-1 block">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Food Selection Modal */}
      {showFoodModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowFoodModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-lg rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-secondary">选择食物</h3>
              <button 
                onClick={() => setShowFoodModal(false)}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-secondary transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {foodList.map((food) => {
                const FoodIcon = food.icon;
                return (
                  <button
                    key={food.id}
                    onClick={() => handleFeed(food)}
                    className="flex flex-col items-center p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 group active:scale-95"
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 ${food.color}`}>
                      <FoodIcon size={32} />
                    </div>
                    <span className="text-sm font-bold text-gray-700">{food.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 bg-primary/5 rounded-2xl p-4 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Star size={20} className="text-primary fill-primary" />
              </div>
              <p className="text-xs text-primary font-medium leading-relaxed">
                温馨提示：定时给小宠物喂食可以增加好感度并解锁更多有趣的动态哦！
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
