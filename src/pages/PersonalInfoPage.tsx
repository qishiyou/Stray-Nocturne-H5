import React, { useState } from 'react';
import { ArrowLeft, Camera, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PersonalInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    nickname: 'AI开发者',
    id: '88886666',
    gender: '男',
    bio: '热爱AI，探索未来宠物的无限可能。',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="text-gray-500 mr-4 p-2 bg-white rounded-full shadow-sm">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold text-secondary">个人信息</h2>
        </div>
        <button className="text-primary font-bold px-4 py-2 hover:bg-primary/5 rounded-full transition-colors">
          保存
        </button>
      </div>

      <div className="space-y-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center justify-center py-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-white p-1 shadow-lg overflow-hidden border-2 border-primary/20">
              <img 
                src={profile.avatar} 
                alt="Avatar" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white shadow-md">
              <Camera size={16} />
            </button>
          </div>
          <p className="mt-4 text-xs text-gray-400 text-center">点击更换头像</p>
        </div>

        {/* Info List */}
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors">
            <span className="text-gray-500 font-medium">昵称</span>
            <div className="flex items-center space-x-2">
              <span className="text-secondary font-bold">{profile.nickname}</span>
              <ChevronRight size={18} className="text-gray-300" />
            </div>
          </div>

          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <span className="text-gray-500 font-medium">账号ID</span>
            <span className="text-gray-400 font-mono">{profile.id}</span>
          </div>

          <div className="p-6 border-b border-gray-50 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors">
            <span className="text-gray-500 font-medium">性别</span>
            <div className="flex items-center space-x-2">
              <span className="text-secondary">{profile.gender}</span>
              <ChevronRight size={18} className="text-gray-300" />
            </div>
          </div>

          <div className="p-6 flex flex-col space-y-3 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium">个人简介</span>
              <ChevronRight size={18} className="text-gray-300" />
            </div>
            <p className="text-sm text-secondary leading-relaxed line-clamp-2">
              {profile.bio}
            </p>
          </div>
        </div>

        {/* Account Binding Hint */}
        <p className="px-6 text-xs text-gray-400 leading-relaxed">
          完善个人信息可以让 AI 更好地了解您，为您提供更个性化的服务。
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoPage;
