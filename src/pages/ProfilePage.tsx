import React from 'react';
import { User, Settings, Shield, Bell, HelpCircle, ChevronRight, LogOut, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: User, label: '个人信息', path: '/profile/edit' },
    { icon: Package, label: '我的素材', path: '/profile/assets' },
    { icon: Bell, label: '消息中心', path: '/profile/notifications' },
    { icon: Shield, label: '账号安全', path: '/profile/security' },
    { icon: HelpCircle, label: '帮助与反馈', path: '/profile/help' },
    { icon: Settings, label: '通用设置', path: '/profile/settings' },
  ];

  const handleLogout = () => {
    // 模拟退出登录
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* User Header */}
      <div className="bg-white p-6 pt-12 rounded-b-3xl shadow-sm mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-secondary">AI开发者</h2>
            <p className="text-sm text-gray-500">ID: 88886666</p>
          </div>
          <button className="p-2 text-gray-400 hover:text-primary transition-colors">
            <Settings size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="text-center">
            <div className="text-xl font-bold text-secondary">12</div>
            <div className="text-xs text-gray-500">我的宠物</div>
          </div>
          <div className="text-center border-x border-gray-100">
            <div className="text-xl font-bold text-secondary">5</div>
            <div className="text-xs text-gray-500">连接设备</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-secondary">128</div>
            <div className="text-xs text-gray-500">创作积分</div>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="px-4 space-y-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className={`flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  index !== menuItems.length - 1 ? 'border-b border-gray-50' : ''
                }`}
                onClick={() => navigate(item.path)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-light flex items-center justify-center">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <span className="font-medium text-secondary">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </div>
            );
          })}
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full bg-white text-red-500 font-bold py-4 rounded-2xl shadow-sm border border-gray-100 hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
        >
          <LogOut size={20} />
          <span>退出登录</span>
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-400">Stray Nocturne v1.0.0</p>
      </div>
    </div>
  );
};

export default ProfilePage;
