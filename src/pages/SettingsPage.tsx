import React, { useState } from 'react';
import { ArrowLeft, Globe, Moon, Info, ChevronRight, Bell, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [pushEnabled, setPushEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="text-gray-500 mr-4 p-2 bg-white rounded-full shadow-sm">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-secondary">通用设置</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-6 border-b border-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Globe size={20} className="text-blue-500" />
              </div>
              <span className="font-medium text-secondary">语言选择</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">简体中文</span>
              <ChevronRight size={18} className="text-gray-300" />
            </div>
          </div>

          <div className="flex items-center justify-between p-6 border-b border-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                <Moon size={20} className="text-indigo-500" />
              </div>
              <span className="font-medium text-secondary">深色模式</span>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                <Bell size={20} className="text-orange-500" />
              </div>
              <span className="font-medium text-secondary">消息推送</span>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={pushEnabled}
                onChange={(e) => setPushEnabled(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-6 border-t border-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <Shield size={20} className="text-green-500" />
              </div>
              <span className="font-medium text-secondary">隐私设置</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        </div>

        <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-6 border-b border-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                <Info size={20} className="text-gray-400" />
              </div>
              <span className="font-medium text-secondary">关于我们</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">v1.0.0</span>
              <ChevronRight size={18} className="text-gray-300" />
            </div>
          </div>
          <div className="flex items-center justify-between p-6 border-b border-gray-50">
            <span className="text-sm text-gray-500 font-medium">自动检查更新</span>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="flex items-center justify-between p-6">
            <span className="text-sm text-gray-500 font-medium">清除缓存</span>
            <span className="text-sm text-gray-400">24.5 MB</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
