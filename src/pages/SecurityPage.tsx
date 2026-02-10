import React from 'react';
import { ArrowLeft, Shield, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SecurityPage: React.FC = () => {
  const navigate = useNavigate();

  const securityItems = [
    { label: '修改登录密码', value: '已设置' },
    { label: '绑定手机号', value: '138****8888' },
    { label: '绑定邮箱', value: 'example@mail.com' },
    { label: '实名认证', value: '已认证' },
    { label: '登录设备管理', value: '2台设备' },
    { label: '账号注销', value: '', color: 'text-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="text-gray-500 mr-4 p-2 bg-white rounded-full shadow-sm">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-secondary">账号与安全</h2>
      </div>

      <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100">
        {securityItems.map((item, index) => (
          <div 
            key={index}
            className={`flex items-center justify-between p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
              index !== securityItems.length - 1 ? 'border-b border-gray-50' : ''
            }`}
          >
            <span className={`font-medium ${item.color || 'text-secondary'}`}>{item.label}</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">{item.value}</span>
              <ChevronRight size={18} className="text-gray-300" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-primary/5 rounded-3xl border border-primary/10">
        <div className="flex items-start space-x-3">
          <Shield size={20} className="text-primary mt-1" />
          <div>
            <h4 className="font-bold text-primary mb-1">账号安全等级：高</h4>
            <p className="text-xs text-primary/70 leading-relaxed">
              您的账号已开启全方位保护。建议定期修改密码以确保账号安全。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
