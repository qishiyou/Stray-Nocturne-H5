import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wifi, Smartphone, CheckCircle2, Signal } from 'lucide-react';

const AddDevicePage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [, setSelectedType] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const startSetup = () => {
    setStep(4);
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setStep(5), 500);
      }
    }, 150);
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="text-gray-500 mr-4">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-secondary">添加设备</h2>
      </div>

      {/* Step Indicators */}
      {step < 5 && (
        <div className="flex justify-between items-center mb-10 px-4">
          {[1, 2, 3, 4].map((s) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {s}
                </div>
              </div>
              {s < 4 && (
                <div className="flex-1 h-1 bg-gray-200 mx-2">
                  <div className={`h-full bg-primary transition-all duration-300 ${step > s ? 'w-full' : 'w-0'}`}></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Step Content */}
      <div className="mt-8">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h3 className="text-lg font-semibold mb-6">请选择设备类型</h3>
            <div className="space-y-4">
              <div 
                onClick={() => { setSelectedType('Pro'); setStep(2); }}
                className="p-6 border-2 border-gray-100 rounded-2xl flex items-center hover:border-primary cursor-pointer transition-all"
              >
                <div className="w-16 h-16 bg-light rounded-xl flex items-center justify-center mr-4">
                  <Signal className="text-primary" size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">全息盒子 Pro</h4>
                  <p className="text-sm text-gray-500">旗舰版全息互动终端</p>
                </div>
              </div>
              <div 
                onClick={() => { setSelectedType('Mini'); setStep(2); }}
                className="p-6 border-2 border-gray-100 rounded-2xl flex items-center hover:border-primary cursor-pointer transition-all"
              >
                <div className="w-16 h-16 bg-light rounded-xl flex items-center justify-center mr-4">
                  <Signal className="text-primary opacity-60" size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">全息盒子 Mini</h4>
                  <p className="text-sm text-gray-500">便携版全息互动终端</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-lg font-semibold mb-2">连接设备热点</h3>
            <p className="text-sm text-gray-500 mb-8">请前往手机设置，连接名为 "PetBox-XXXX" 的热点</p>
            <div className="bg-light rounded-2xl p-8 flex flex-col items-center mb-8">
              <Smartphone className="text-primary mb-4 animate-bounce" size={64} />
              <div className="text-center">
                <p className="font-medium">正在等待连接...</p>
                <p className="text-xs text-gray-400 mt-1">连接成功后将自动跳转</p>
              </div>
            </div>
            <button onClick={() => setStep(3)} className="btn-primary w-full">
              我已连接
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-lg font-semibold mb-2">配置 WiFi</h3>
            <p className="text-sm text-gray-500 mb-6">请选择设备需要连接的 WiFi</p>
            <div className="space-y-3 mb-8">
              {['Home_WiFi_5G', 'Office_Net', 'TP-Link_9982'].map((wifi) => (
                <div key={wifi} className="p-4 border border-gray-100 rounded-xl flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center">
                    <Wifi size={20} className="mr-3 text-gray-400" />
                    <span>{wifi}</span>
                  </div>
                  <Signal size={16} className="text-primary" />
                </div>
              ))}
            </div>
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-600 mb-2">WiFi 密码</label>
              <input type="password" placeholder="请输入密码" className="input-field" />
            </div>
            <button onClick={startSetup} className="btn-primary w-full">
              开始配网
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative w-40 h-40 mb-8">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                <circle 
                  cx="50" cy="50" r="45" fill="none" stroke="#00BC7D" strokeWidth="8" 
                  strokeDasharray={`${progress * 2.82} 282`} 
                  className="transition-all duration-300"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">{progress}%</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">正在配网中</h3>
            <p className="text-gray-500 text-center px-8">请保持手机与设备在有效范围内，不要关闭电源</p>
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center justify-center py-12 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={64} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">配网成功</h3>
            <p className="text-gray-500 mb-12">您的设备已准备就绪</p>
            <button onClick={() => navigate('/devices')} className="btn-primary w-full">
              进入我的设备
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddDevicePage;
